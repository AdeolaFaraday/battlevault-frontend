import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { cellColors } from "@/src/constants";
import { GameService, GameSessionData } from "@/src/services/ludo/game.service";
import { RootState } from "@/src/lib/redux/store";
import { useMutation } from "@apollo/client";
import { ROLL_DICE_MUTATION, PROCESS_MOVE_MUTATION, SELECT_DICE_MUTATION } from "@/src/graphql/game/mutations";
import { useSound } from "../useSound";
import { Token } from "@/src/types/ludo";

const useBackendLudoAction = ({ color }: { color?: string }) => {
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
        tokens: {
            blue: generateDefaultTokenStates("blue") as unknown as Token[],
            yellow: generateDefaultTokenStates("yellow") as unknown as Token[],
            green: generateDefaultTokenStates("green") as unknown as Token[],
            red: generateDefaultTokenStates("red") as unknown as Token[]
        },
    });

    // Local rolling state for UI feedback between button click and API response
    const [isRolling, setIsRolling] = useState(false);
    const { playRoll, playMove } = useSound();

    const [rollDiceMutation] = useMutation(ROLL_DICE_MUTATION);
    const [processMoveMutation] = useMutation(PROCESS_MOVE_MUTATION);
    const [selectDiceMutation] = useMutation(SELECT_DICE_MUTATION);

    const isInternalUpdate = useRef(false);
    const findActiveTokens = React.useMemo(() =>
        Object.values(gameState.tokens).flat().filter(t => t.active),
        [gameState.tokens]
    );

    // 1. Subscribe to Firestore (SOURCE OF TRUTH)
    useEffect(() => {
        if (!gameId) return;

        const unsubscribe = GameService.subscribeToGame(gameId, (data) => {
            console.log({ gameData: data });
            if (isInternalUpdate.current) {
                isInternalUpdate.current = false;
                return;
            }

            console.log({ backendSyncData: data });

            if (data) {
                // Stop local rolling animation when dice values are received
                if (isRolling && data.diceValue && data.diceValue.length > 0) {
                    setIsRolling(false);
                }
                setGameState(data);
            }
        });

        return () => unsubscribe();
    }, [gameId, isRolling]);

    const syncToFirestore = (updates: object) => {
        if (!gameId) return;
        isInternalUpdate.current = true;
        GameService.updateGame(gameId, updates);
    };

    const playerName = currentUser
        ? `${currentUser.firstName} ${currentUser.lastName}`.trim()
        : undefined;

    const handleDiceRoll = React.useCallback(async (results?: number[]) => {
        console.log({ results, currentTurn: gameState.currentTurn, userId: currentUser?._id });
        if (gameState.currentTurn !== currentUser?._id) {
            toast.error("It's not your turn!");
            return;
        }

        // Start local rolling animation immediately
        setIsRolling(true);
        playRoll();

        try {
            await rollDiceMutation({
                variables: {
                    gameId,
                    name: playerName
                }
            });
            // State update will come via Firestore subscription
        } catch (error: Error | unknown) {
            // Stop rolling on error
            setIsRolling(false);
            toast.error((error as Error).message || "Failed to roll dice");
        }
    }, [gameState.currentTurn, currentUser?._id, playRoll, rollDiceMutation, gameId, playerName]);

    const handleTokenMove = React.useCallback(async (moveData: { token: Token, position: number, playerId: string }) => {
        console.log({ currentUser, gameState })
        if (gameState.currentTurn !== currentUser?._id) {
            toast.error("It's not your turn!");
            return;
        }

        try {
            playMove();
            await processMoveMutation({
                variables: {
                    gameId,
                    input: {
                        tokenId: moveData.token.sn,
                        color: moveData.token.color
                    },
                    name: playerName
                }
            });
            // State update will come via Firestore subscription
        } catch (error: Error | unknown) {
            toast.error((error as Error).message || "Failed to process move");
        }
    }, [gameState.currentTurn, currentUser?._id, playMove, processMoveMutation, gameId, playerName, gameState]);

    const handleSelectDice = React.useCallback(async (val: number[] | null | ((prev: number[] | null) => number[] | null)) => {
        if (gameState.currentTurn !== currentUser?._id) {
            toast.error("It's not your turn!");
            return;
        }

        const updated = typeof val === 'function' ? val(gameState.activeDiceConfig) : val;

        try {
            await selectDiceMutation({
                variables: {
                    gameId,
                    diceValues: updated || [],
                    name: playerName
                }
            });
        } catch (error: Error | unknown) {
            console.error("Dice selection failed:", error);
            toast.error((error as Error).message || "Failed to select dice");
        }
    }, [gameState.currentTurn, currentUser?._id, gameState.activeDiceConfig, selectDiceMutation, gameId, playerName]);

    // Track finished tokens for animation
    const [recentlyFinishedToken, setRecentlyFinishedToken] = useState<string | null>(null);
    const prevPlayersRef = useRef<any[]>([]);

    useEffect(() => {
        if (!gameState.players) return;

        // Skip first run
        if (prevPlayersRef.current.length === 0 && gameState.players.length > 0) {
            prevPlayersRef.current = gameState.players;
            return;
        }

        gameState.players.forEach(player => {
            const prevPlayer = prevPlayersRef.current.find(p => p.id === player.id);
            if (prevPlayer) {
                const diff = (player.finishedCount || 0) - (prevPlayer.finishedCount || 0);
                if (diff > 0) {
                    // A token finished for this player!
                    // Find color for this player
                    const playerColor = Object.keys(gameState.tokens).find(key => player.tokens?.includes(key));

                    if (playerColor) {
                        setRecentlyFinishedToken(playerColor);
                        // Reset after animation time (approx)
                        setTimeout(() => setRecentlyFinishedToken(null), 2000);
                    }
                }
            }
        });

        prevPlayersRef.current = gameState.players;
    }, [gameState.players, gameState.tokens]);

    return {
        gameState,
        tokens: gameState.tokens,
        status: gameState.status,
        isCurrentTurn: gameState.currentTurn === currentUser?._id,
        currentUserId: currentUser?._id,
        isRolling,
        recentlyFinishedToken,
        handleDiceRoll,
        handleTokenClick: React.useCallback((token: Token, pos?: number) => handleTokenMove({
            token,
            position: pos || 0,
            playerId: currentUser?._id || ""
        }), [handleTokenMove, currentUser?._id]),
        usedDiceValues: gameState.usedDiceValues,
        activeDiceConfig: gameState.activeDiceConfig,
        setActiveDiceConfig: handleSelectDice,
        syncToFirestore,
        findActiveTokens,
        findBgColor: cellColors.find(c => c.color === color)
    };
};

export default useBackendLudoAction;
