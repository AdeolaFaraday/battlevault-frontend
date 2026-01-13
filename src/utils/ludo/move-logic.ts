import { toast } from "sonner";

// interface TokenMapperItem {
//     color: string;
//     value: Token[];
//     startPath: number;
//     setter: (val: any) => void;
// }

interface MoveData {
    token: Token;
    position: number;
    playerId: string;
}

interface ProcessMoveParams {
    moveData: MoveData;
    gameState: LudoGameState;
    usedDiceValues: number[];
    activeDiceConfig: number[] | null;
    findActiveTokens: Token[];
    tokens: { [key: string]: Token[] };
    setTokens: (val: { [key: string]: Token[] } | ((prev: { [key: string]: Token[] }) => { [key: string]: Token[] })) => void;
    setUsedDiceValues: (val: number[] | ((prev: number[]) => number[])) => void;
    setGameState: (val: LudoGameState | ((prev: LudoGameState) => LudoGameState)) => void;
    setLastMovedToken: (val: { color: string, sn: number } | null) => void;
    setLastMoveWasActivation: (val: boolean) => void;
    setActiveDiceConfig: (val: number[] | null) => void;
}

export const processTokenMove = ({
    moveData,
    gameState,
    usedDiceValues,
    activeDiceConfig,
    // findActiveTokens,
    // tokens,
    setTokens,
    setUsedDiceValues,
    setGameState,
    setLastMovedToken,
    setLastMoveWasActivation,
    setActiveDiceConfig
}: ProcessMoveParams) => {
    const diceValue = gameState?.diceValue;
    const findPlayer = gameState?.players?.find((player) => player?.id === "1"); // TODO: use actual current player
    const findToken = findPlayer?.tokens?.includes(moveData?.token?.color);

    console.log({ moveData, activeDiceConfig, findToken });

    if (!findToken) {
        toast.error("Can't move this token!");
        return;
    }

    const startPaths: { [key: string]: number } = {
        blue: 41,
        green: 15,
        yellow: 28,
        red: 2
    };

    const startPath = startPaths[moveData?.token?.color];
    const tokenColor = moveData?.token?.color;

    // Get available dice values (correctly handling duplicates)
    const availableDiceValues = [...diceValue];
    usedDiceValues.forEach(usedVal => {
        const index = availableDiceValues.indexOf(usedVal);
        if (index !== -1) {
            availableDiceValues.splice(index, 1);
        }
    });

    // Determine target position for click-based moves
    let targetPosition = moveData?.position;
    console.log({ activeDiceConfigHere: activeDiceConfig, moveData, targetPosition, availableDiceValues })

    // If no position provided OR position is same as current (click event), calculate target
    if (!targetPosition || targetPosition === moveData.token.position) {
        if (availableDiceValues.length === 0) {
            toast.error("Roll dice first!");
            return;
        }
        if (moveData.token.active) {
            // Priority 1: Use active selection from UI
            if (activeDiceConfig && activeDiceConfig.length > 0) {
                const totalMove = activeDiceConfig.reduce((a, b) => a + b, 0);
                targetPosition = (moveData.token.position || 0) + totalMove;
            }
            // Priority 2: Auto-select if only one dice exists
            else if (availableDiceValues.length === 1) {
                targetPosition = (moveData.token.position || 0) + availableDiceValues[0];
            } else {
                toast.error("Please select a dice value!");
                return;
            }
        } else {
            // For inactive tokens, click with 6 means "move to start"
            // If combined selection exists (e.g. 6 + 3), move to start + 3
            if (activeDiceConfig && activeDiceConfig.includes(6)) {
                const totalMove = activeDiceConfig.reduce((a, b) => a + b, 0);
                targetPosition = startPath + (totalMove - 6);
            } else if (availableDiceValues.includes(6)) {
                targetPosition = startPath;
            } else {
                toast.error("You need a 6 to start!");
                return;
            }
        }
    }

    // Handle activating token (Inactive Token Logic)
    if (!moveData?.token?.active) {


        // Case 1: Drag/Click to Start Position
        if (targetPosition === startPath) {
            const diceToUse = activeDiceConfig?.includes(6) ? activeDiceConfig : [6];

            if (availableDiceValues.includes(6)) {
                setTokens((prev) => {
                    const currentTokens = prev[tokenColor] || [];
                    const existingToken = currentTokens.find((item) => item.sn === moveData?.token?.sn);
                    const newItem = {
                        ...(existingToken || moveData?.token),
                        position: startPath,
                        active: true,
                    };
                    console.log('Activating token:', { sn: moveData.token.sn, from: existingToken?.position, to: startPath });
                    return {
                        ...prev,
                        [tokenColor]: [...currentTokens.filter((item) => item.sn !== moveData?.token?.sn), newItem]
                    };
                });

                setUsedDiceValues(prev => [...prev, ...diceToUse!]);
                setLastMovedToken({ color: moveData?.token?.color, sn: moveData?.token?.sn });
                setLastMoveWasActivation(true);
                setActiveDiceConfig(null);

                const remainingCount = availableDiceValues.length - diceToUse!.length;
                setGameState(prev => {
                    return {
                        ...prev,
                        status: remainingCount > 0 ? "playingToken" : "playingDice",
                    };
                });
                return;
            } else {
                toast.error("You need a 6 to move out!");
                return;
            }
        }

        // Case 2: Drag to Start + X (Combined Activation)
        else if (targetPosition > startPath!) {
            const moveDiff = targetPosition - startPath!;
            const diceToUse = activeDiceConfig?.length === 2 ? activeDiceConfig : [6, moveDiff];

            if (diceToUse.includes(6) && diceToUse.includes(moveDiff)) {
                setTokens((prev) => {
                    const currentTokens = prev[tokenColor] || [];
                    const existingToken = currentTokens.find((item) => item.sn === moveData?.token?.sn);
                    const newItem = {
                        ...(existingToken || moveData?.token),
                        position: targetPosition,
                        active: true,
                    };
                    console.log('Activating and moving token:', { sn: moveData.token.sn, from: existingToken?.position, to: targetPosition });
                    return {
                        ...prev,
                        [tokenColor]: [...currentTokens.filter((item) => item.sn !== moveData?.token?.sn), newItem]
                    };
                });

                setUsedDiceValues(prev => [...prev, ...diceToUse]);
                setLastMovedToken({ color: moveData?.token?.color, sn: moveData?.token?.sn });
                setLastMoveWasActivation(false);
                setActiveDiceConfig(null);

                setGameState(prev => {
                    return {
                        ...prev,
                        status: "playingDice",
                    };
                });
                return;
            } else {
                toast.error(`You need a 6 and a ${moveDiff} to move there!`);
                return;
            }
        } else {
            toast.error("Invalid move for starting token!");
            return;
        }
    }

    // Calculate the move distance
    const moveDistance = targetPosition - (moveData?.token?.position as number);
    const diceToConsume = activeDiceConfig || [moveDistance];

    // CRITICAL: Update the token position
    setTokens((prev) => {
        const currentTokens = prev[tokenColor] || [];
        const existingToken = currentTokens.find((item) => item.sn === moveData?.token?.sn);

        if (!existingToken && !moveData?.token) return prev;

        const newItem = {
            ...(existingToken || moveData?.token),
            position: targetPosition,
            active: true,
        };

        console.log('Moving active token:', { sn: moveData.token.sn, from: existingToken?.position, to: targetPosition });

        return {
            ...prev,
            [tokenColor]: [...currentTokens.filter((item) => item.sn !== moveData?.token?.sn), newItem]
        };
    });

    // Mark these as used
    setUsedDiceValues(prev => [...prev, ...diceToConsume]);
    setActiveDiceConfig(null);

    const remainingDiceValuesCount = availableDiceValues.length - diceToConsume.length;

    setGameState(prev => {
        return {
            ...prev,
            status: remainingDiceValuesCount > 0 ? "playingToken" : "playingDice",
        };
    });
};
