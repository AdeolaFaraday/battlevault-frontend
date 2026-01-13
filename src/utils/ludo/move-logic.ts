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
    findActiveTokens: Token[];
    tokens: { [key: string]: Token[] };
    setTokens: (val: { [key: string]: Token[] } | ((prev: { [key: string]: Token[] }) => { [key: string]: Token[] })) => void;
    setUsedDiceValues: (val: number[] | ((prev: number[]) => number[])) => void;
    setGameState: (val: LudoGameState | ((prev: LudoGameState) => LudoGameState)) => void;
    setLastMovedToken: (val: { color: string, sn: number } | null) => void;
    setLastMoveWasActivation: (val: boolean) => void;
}

export const processTokenMove = ({
    moveData,
    gameState,
    usedDiceValues,
    findActiveTokens,
    tokens,
    setTokens,
    setUsedDiceValues,
    setGameState,
    setLastMovedToken,
    setLastMoveWasActivation
}: ProcessMoveParams) => {
    const diceValue = gameState?.diceValue;
    const findPlayer = gameState?.players?.find((player) => player?.id === "1"); // TODO: use actual current player
    const findToken = findPlayer?.tokens?.includes(moveData?.token?.color);

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
    if (!targetPosition) {
        if (availableDiceValues.length === 0) {
            toast.error("Roll dice first!");
            return;
        }

        if (moveData.token.active) {
            // Default to first available dice value for clicks
            targetPosition = (moveData.token.position || 0) + availableDiceValues[0];
        } else {
            // For inactive tokens, click means "move to start"
            targetPosition = startPath;
        }
    }

    // Handle activating token (Inactive Token Logic)
    if (!moveData?.token?.active) {


        // Case 1: Drag/Click to Start Position
        if (targetPosition === startPath) {
            if (availableDiceValues.includes(6)) {
                setTokens((prev) => {
                    const currentTokens = prev[tokenColor] || [];
                    const newItem = {
                        ...moveData?.token,
                        position: startPath,
                        active: true,
                    };
                    return {
                        ...prev,
                        [tokenColor]: [...currentTokens.filter((item) => item.sn !== moveData?.token?.sn), newItem]
                    };
                });

                // Mark one 6 as used
                setUsedDiceValues(prev => [...prev, 6]);
                setLastMovedToken({ color: moveData?.token?.color, sn: moveData?.token?.sn });
                setLastMoveWasActivation(true);

                const remainingCount = availableDiceValues.length - 1;
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
            const hasSix = availableDiceValues.includes(6);

            if (!hasSix) {
                toast.error("You need a 6 to start!");
                return;
            }

            const tempDice = [...availableDiceValues];
            const sixIndex = tempDice.indexOf(6);
            if (sixIndex !== -1) tempDice.splice(sixIndex, 1);

            const hasDiff = tempDice.includes(moveDiff);

            if (hasDiff) {
                setTokens((prev) => {
                    const currentTokens = prev[tokenColor] || [];
                    const newItem = {
                        ...moveData?.token,
                        position: targetPosition,
                        active: true,
                    };
                    return {
                        ...prev,
                        [tokenColor]: [...currentTokens.filter((item) => item.sn !== moveData?.token?.sn), newItem]
                    };
                });

                setUsedDiceValues(prev => [...prev, 6, moveDiff]);
                setLastMovedToken({ color: moveData?.token?.color, sn: moveData?.token?.sn });
                setLastMoveWasActivation(false);

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
    const matchingDiceValue = availableDiceValues.find(val => val === moveDistance);

    if (!matchingDiceValue) {
        toast.error(`Invalid move! You can only move ${availableDiceValues.join(' or ')} steps.`);
        return;
    }

    const sumOfAvailableDice = availableDiceValues?.reduce((acc, curr) => acc + curr, 0);

    if (gameState?.status === "playingToken" && moveDistance > sumOfAvailableDice) {
        toast.error("Can't move this token!");
        return;
    }

    setTokens((prev) => {
        const currentTokens = prev[tokenColor] || [];
        const newItem = {
            ...moveData?.token,
            position: targetPosition,
            active: true,
        };
        const exists = currentTokens.some((item) => item.sn === moveData?.token?.sn);
        if (exists) {
            return {
                ...prev,
                [tokenColor]: [...currentTokens.filter((item) => item.sn !== moveData?.token?.sn), newItem]
            };
        }
        return prev;
    });

    setUsedDiceValues(prev => [...prev, matchingDiceValue]);

    const remainingDiceValuesCount = availableDiceValues.length - 1;

    setGameState(prev => {
        return {
            ...prev,
            status: remainingDiceValuesCount > 0 ? "playingToken" : "playingDice",
        };
    });
};
