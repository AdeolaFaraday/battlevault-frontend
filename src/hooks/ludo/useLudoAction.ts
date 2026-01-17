import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { cellColors } from "@/src/constants";
import { processTokenMove, getNextPlayerId } from "@/src/utils/ludo/move-logic";
import { GameService, GameSessionData } from "@/src/services/ludo/game.service";
import { RootState } from "@/src/lib/redux/store";

const useLudoAction = ({ color }: { color?: string }) => {
    const { id: gameId } = useParams<{ id: string }>();
    const currentUser = useAppSelector((state: RootState) => state.auth.loggedInUserDetails);

    const generateDefaultTokenStates = (color: string) => {
        return Array(4).fill(0).map((_, i) => ({
            sn: i + 1,
            color,
            active: false,
            position: null,
            isSafePath: false,
        }));
    };

    const [gameState, setGameState] = useState<GameSessionData>({
        players: [],
        currentTurn: "",
        diceValue: [],
        isRolling: false,
        status: "waiting",
        usedDiceValues: [],
        activeDiceConfig: null,
        lastUpdated: null,
        tokens: {
            blue: generateDefaultTokenStates("blue") as unknown as Token[],
            yellow: generateDefaultTokenStates("yellow") as unknown as Token[],
            green: generateDefaultTokenStates("green") as unknown as Token[],
            red: generateDefaultTokenStates("red") as unknown as Token[]
        },
    });

    const [, setLastMoveWasActivation] = useState<boolean>(false);
    const [, setLastMovedToken] = useState<{ color: string, sn: number } | null>(null);

    const isInternalUpdate = useRef(false);
    const findActiveTokens = Object.values(gameState.tokens).flat().filter(t => t.active);

    // 1. Subscribe to Firestore (SOURCE OF TRUTH)
    useEffect(() => {
        if (!gameId) return;

        const unsubscribe = GameService.subscribeToGame(gameId, (data) => {
            if (isInternalUpdate.current) {
                isInternalUpdate.current = false;
                return;
            }

            console.log({ firestoreData: data });

            if (data) setGameState(data);
        });

        return () => unsubscribe();
    }, [gameId]);

    // 2. Joining Logic
    useEffect(() => {
        if (!gameId || !currentUser || (gameState.players && gameState.players.length >= 4)) return;

        const existingPlayer = gameState.players?.find(p => p.id === currentUser._id);
        if (existingPlayer) return;

        const assignedColors = gameState.players?.map(p => p.color) || [];
        const availableColors: LudoPlayer["color"][] = ["blue", "yellow", "green", "red"];
        const nextColor = availableColors.find(c => !assignedColors.includes(c));

        if (nextColor) {
            const newPlayer: LudoPlayer = {
                id: currentUser._id,
                name: currentUser.firstName,
                color: nextColor,
                tokens: [nextColor]
            };

            const updates: { currentTurn?: string, status?: string, players: LudoPlayer[] } = {
                players: [...(gameState.players || []), newPlayer]
            };

            if (!gameState.players || gameState.players.length === 0) {
                updates.currentTurn = currentUser._id;
                updates.status = "playingDice";
            }

            // GameService.updateGame(gameId, {
            //     gameState: { ...gameState, ...updates }
            // });
        }
    }, [gameId, currentUser, gameState.players]);

    const syncToFirestore = (updates: object) => {
        if (!gameId) return;
        isInternalUpdate.current = true;
        GameService.updateGame(gameId, updates);
    };

    const handleDiceRoll = (results: number[]) => {
        if (gameState.currentTurn !== currentUser?._id) {
            toast.error("It's not your turn!");
            return;
        }

        // AUTO-SKIP CHECK
        const hasSix = results.includes(6);

        const player = gameState.players.find(p => p.id === currentUser._id);
        const playerColors = player?.tokens || []; // Array of colors like ['red'] or ['red', 'green']

        // Aggregate all tokens controlled by this player
        const myTokens = playerColors.flatMap(color => gameState.tokens[color] || []);

        const hasMovableTokens = myTokens.some(t => t.active && !t.isFinished);
        if (!hasSix && !hasMovableTokens) {
            toast.error("No valid moves! Skipping turn...");

            // Immediate Pass
            const nextPlayerId = getNextPlayerId(gameState.players, gameState.currentTurn);

            syncToFirestore({
                ...gameState,
                diceValue: [], // Clear dice so selector doesn't show
                status: "playingDice",
                currentTurn: nextPlayerId,
                usedDiceValues: [],
                activeDiceConfig: null,
                lastMoverId: currentUser._id
            });
            return;
        }

        const newGameState = {
            ...gameState,
            diceValue: results,
            status: "playingToken" as const,
            lastMoverId: currentUser._id
        };

        syncToFirestore({
            ...newGameState,
            usedDiceValues: [],
            activeDiceConfig: null
        });
    };

    const handleTokenMove = (moveData: { token: Token, position: number, playerId: string }) => {
        processTokenMove({
            moveData,
            gameState,
            findActiveTokens,
            setGameState: (val: GameSessionData | ((prev: GameSessionData) => GameSessionData)) => {
                let updated = typeof val === 'function' ? val(gameState) : val;
                updated = { ...updated, lastMoverId: currentUser?._id };
                syncToFirestore(updated);
            },
            setLastMovedToken,
            setLastMoveWasActivation,
        });
    };

    console.log({ currentUser })

    return {
        gameState,
        tokens: gameState.tokens,
        status: gameState.status,
        isCurrentTurn: gameState.currentTurn === currentUser?._id,
        handleDiceRoll,
        handleTokenClick: (token: Token, pos?: number) => handleTokenMove({
            token,
            position: pos || 0,
            playerId: currentUser?._id || ""
        }),
        usedDiceValues: gameState.usedDiceValues,
        activeDiceConfig: gameState.activeDiceConfig,
        setActiveDiceConfig: (val: number[] | null | ((prev: number[] | null) => number[] | null)) => {
            const updated = typeof val === 'function' ? val(gameState.activeDiceConfig) : val;
            syncToFirestore({ activeDiceConfig: updated });
        },
        syncToFirestore,
        findActiveTokens,
        findBgColor: cellColors.find(c => c.color === color)
    };
};

export default useLudoAction;