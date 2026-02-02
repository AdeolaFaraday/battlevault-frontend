import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useAlert } from "../common/useAlert";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { cellColors } from "@/src/constants";
import { GameService, GameSessionData } from "@/src/services/ludo/game.service";
import { RootState } from "@/src/lib/redux/store";
import { useMutation } from "@apollo/client";
import { ROLL_DICE_MUTATION, PROCESS_MOVE_MUTATION, SELECT_DICE_MUTATION } from "@/src/graphql/game/mutations";
import { useSound } from "../useSound";
import { Token, LudoPlayer } from "@/src/types/ludo";

const useBackendLudoAction = ({ color }: { color?: string }) => {
    const { id: gameId } = useParams<{ id: string }>();
    const currentUser = useAppSelector((state: RootState) => state.auth.loggedInUserDetails);
    const alerts = useAlert();

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

    const [isRolling, setIsRolling] = useState(false);
    const { playRoll, playMove, playYourTurn } = useSound();

    const [rollDiceMutation] = useMutation(ROLL_DICE_MUTATION, {
        onCompleted: (data) => {
            if (data?.rollDice && !data.rollDice.success) {
                setIsRolling(false);
                alerts.error("Roll Rejected", data.rollDice.message || "The dice could not be rolled.");
            }
        },
        onError: (err) => {
            setIsRolling(false);
            alerts.error("Roll Failed", err.message || "Failed to roll dice");
        }
    });

    const [processMoveMutation] = useMutation(PROCESS_MOVE_MUTATION, {
        onCompleted: (data) => {
            if (data?.processMove && !data.processMove.success) {
                alerts.error("Invalid Move", data.processMove.message || "That move is not allowed.");
            }
        },
        onError: (err) => {
            alerts.error("Move Failed", err.message || "Failed to process move");
        }
    });

    const [selectDiceMutation] = useMutation(SELECT_DICE_MUTATION, {
        onCompleted: (data) => {
            if (data?.selectDice && !data.selectDice.success) {
                alerts.error("Selection Denied", data.selectDice.message || "Could not select those dice values.");
            }
        },
        onError: (err) => {
            console.error("Dice selection failed:", err);
            alerts.error("Selection Error", err.message || "Failed to select dice");
        }
    });

    const isInternalUpdate = useRef(false);
    const findActiveTokens = React.useMemo(() =>
        Object.values(gameState.tokens).flat().filter(t => t.active),
        [gameState.tokens]
    );

    useEffect(() => {
        if (!gameId) return;

        const unsubscribe = GameService.subscribeToGame(gameId, (data) => {
            if (isInternalUpdate.current) {
                isInternalUpdate.current = false;
                return;
            }

            if (data) {
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

    const handleDiceRoll = React.useCallback(async () => {
        if (gameState.currentTurn !== currentUser?._id) {
            alerts.warning("Not Your Turn", "Wait for the opponent to finish their move.");
            return;
        }

        setIsRolling(true);
        playRoll();

        await rollDiceMutation({
            variables: {
                gameId,
                name: playerName
            }
        });
    }, [gameState.currentTurn, currentUser?._id, playRoll, rollDiceMutation, gameId, playerName, alerts]);

    const handleTokenMove = React.useCallback(async (moveData: { token: Token, position: number, playerId: string }) => {
        if (gameState.currentTurn !== currentUser?._id) {
            alerts.warning("Action Denied", "You cannot move tokens right now.");
            return;
        }

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
    }, [gameState.currentTurn, currentUser?._id, playMove, processMoveMutation, gameId, playerName, alerts]);

    const handleSelectDice = React.useCallback(async (val: number[] | null | ((prev: number[] | null) => number[] | null)) => {
        if (gameState.currentTurn !== currentUser?._id) {
            alerts.warning("Action Denied", "Wait for your turn to select dice.");
            return;
        }

        const updated = typeof val === 'function' ? val(gameState.activeDiceConfig) : val;

        await selectDiceMutation({
            variables: {
                gameId,
                diceValues: updated || [],
                name: playerName
            }
        });
    }, [gameState.currentTurn, currentUser?._id, gameState.activeDiceConfig, selectDiceMutation, gameId, playerName, alerts]);

    const [recentlyFinishedToken, setRecentlyFinishedToken] = useState<string | null>(null);
    const prevPlayersRef = useRef<LudoPlayer[]>([]);
    const prevTurnRef = useRef<string>("");

    useEffect(() => {
        if (gameState.currentTurn && gameState.currentTurn === currentUser?._id && prevTurnRef.current !== currentUser?._id) {
            playYourTurn();
        }
        prevTurnRef.current = gameState.currentTurn || "";
    }, [gameState.currentTurn, currentUser?._id, playYourTurn]);

    useEffect(() => {
        if (!gameState.players) return;

        if (prevPlayersRef.current.length === 0 && gameState.players.length > 0) {
            prevPlayersRef.current = gameState.players;
            return;
        }

        gameState.players.forEach(player => {
            const prevPlayer = prevPlayersRef.current.find(p => p.id === player.id);
            if (prevPlayer) {
                const diff = (player.finishedCount || 0) - (prevPlayer.finishedCount || 0);
                if (diff > 0) {
                    const playerColor = Object.keys(gameState.tokens).find(key => player.tokens?.includes(key));
                    if (playerColor) {
                        setRecentlyFinishedToken(playerColor);
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
        findBgColor: cellColors.find(c => c.color === color),
        userColors: gameState.players?.find(p => p.id === currentUser?._id)?.tokens || []
    };
};

export default useBackendLudoAction;
