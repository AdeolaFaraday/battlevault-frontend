"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { cellColors } from "@/src/constants";
import { GameService, GameSessionData } from "@/src/services/ludo/game.service";
import { RootState } from "@/src/lib/redux/store";
import { useMutation } from "@apollo/client";
import { ROLL_DICE_MUTATION, PROCESS_MOVE_MUTATION, SELECT_DICE_MUTATION } from "@/src/graphql/game/mutations";

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

    const [rollDiceMutation] = useMutation(ROLL_DICE_MUTATION);
    const [processMoveMutation] = useMutation(PROCESS_MOVE_MUTATION);
    const [selectDiceMutation] = useMutation(SELECT_DICE_MUTATION);

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

            console.log({ backendSyncData: data });

            if (data) setGameState(data);
        });

        return () => unsubscribe();
    }, [gameId]);

    const syncToFirestore = (updates: object) => {
        if (!gameId) return;
        isInternalUpdate.current = true;
        GameService.updateGame(gameId, updates);
    };

    const handleDiceRoll = async (results?: number[]) => {
        console.log({ results });
        if (gameState.currentTurn !== currentUser?._id) {
            toast.error("It's not your turn!");
            return;
        }

        try {
            await rollDiceMutation({
                variables: { gameId }
            });
            // State update will come via Firestore subscription
        } catch (error: Error | unknown) {
            toast.error((error as Error).message || "Failed to roll dice");
        }
    };

    const handleTokenMove = async (moveData: { token: Token, position: number, playerId: string }) => {
        if (gameState.currentTurn !== currentUser?._id) {
            toast.error("It's not your turn!");
            return;
        }

        try {
            await processMoveMutation({
                variables: {
                    gameId,
                    input: {
                        tokenId: moveData.token.sn,
                        color: moveData.token.color
                    }
                }
            });
            // State update will come via Firestore subscription
        } catch (error: Error | unknown) {
            toast.error((error as Error).message || "Failed to process move");
        }
    };

    const handleSelectDice = async (val: number[] | null | ((prev: number[] | null) => number[] | null)) => {
        if (gameState.currentTurn !== currentUser?._id) {
            toast.error("It's not your turn!");
            return;
        }

        const updated = typeof val === 'function' ? val(gameState.activeDiceConfig) : val;

        try {
            await selectDiceMutation({
                variables: {
                    gameId,
                    diceValues: updated || []
                }
            });
        } catch (error: Error | unknown) {
            console.error("Dice selection failed:", error);
            toast.error((error as Error).message || "Failed to select dice");
        }
    };

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
        setActiveDiceConfig: handleSelectDice,
        syncToFirestore,
        findActiveTokens,
        findBgColor: cellColors.find(c => c.color === color)
    };
};

export default useBackendLudoAction;
