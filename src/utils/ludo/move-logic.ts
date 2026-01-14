import { toast } from "sonner";
import { GameSessionData } from "../../services/ludo/game.service";

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

const getNextPlayerId = (players: LudoPlayer[], currentTurnId: string) => {
    const currentIndex = players.findIndex(p => p.id === currentTurnId);
    if (currentIndex === -1) return currentTurnId;
    const nextIndex = (currentIndex + 1) % players.length;
    return players[nextIndex].id;
};

interface ProcessMoveParams {
    moveData: MoveData;
    gameState: GameSessionData;
    findActiveTokens: Token[];
    setGameState: (val: GameSessionData | ((prev: GameSessionData) => GameSessionData)) => void;
    setLastMovedToken: (val: { color: string, sn: number } | null) => void;
    setLastMoveWasActivation: (val: boolean) => void;
}

export const processTokenMove = ({
    moveData,
    gameState,
    // findActiveTokens,
    setGameState,
    setLastMovedToken,
    setLastMoveWasActivation,
}: ProcessMoveParams) => {
    const { diceValue, usedDiceValues, activeDiceConfig, players } = gameState;
    const findPlayer = players?.find((player) => player?.id === moveData?.playerId); // TODO: use actual current player
    const findToken = findPlayer?.tokens?.includes(moveData?.token?.color);

    console.log({ moveData, activeDiceConfig, findPlayer, findToken });

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
                const nextPos = (moveData.token.position || 0) + totalMove;

                if (tokenColor === 'red') {
                    targetPosition = nextPos;
                } else {
                    targetPosition = nextPos > 52 ? nextPos - 52 : nextPos;
                }
            }
            // Priority 2: Auto-select if only one dice exists
            else if (availableDiceValues.length === 1) {
                const nextPos = (moveData.token.position || 0) + availableDiceValues[0];
                if (tokenColor === 'red') {
                    targetPosition = nextPos;
                } else {
                    targetPosition = nextPos > 52 ? nextPos - 52 : nextPos;
                }
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
                setGameState(prev => {
                    const currentTokens = prev.tokens[tokenColor] || [];
                    const existingToken = currentTokens.find((item: Token) => item.sn === moveData?.token?.sn);
                    const newItem = {
                        ...(existingToken || moveData?.token),
                        position: startPath,
                        active: true,
                        isSafePath: false,
                    };

                    console.log('Activating token:', { sn: moveData.token.sn, from: existingToken?.position, to: startPath });

                    const remainingCount = (availableDiceValues.length) - (diceToUse?.length || 0);
                    const isTurnOver = remainingCount === 0;

                    return {
                        ...prev,
                        tokens: {
                            ...prev.tokens,
                            [tokenColor]: [...currentTokens.filter((item: Token) => item.sn !== moveData?.token?.sn), newItem]
                        },
                        usedDiceValues: [...(prev.usedDiceValues || []), ...diceToUse!],
                        activeDiceConfig: null,
                        status: isTurnOver ? "playingDice" : "playingToken",
                        currentTurn: isTurnOver ? getNextPlayerId(prev.players, prev.currentTurn) : prev.currentTurn,
                    };
                });

                setLastMovedToken({ color: moveData?.token?.color, sn: moveData?.token?.sn });
                setLastMoveWasActivation(true);
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
                setGameState(prev => {
                    const currentTokens = prev.tokens[tokenColor] || [];
                    const existingToken = currentTokens.find((item: Token) => item.sn === moveData?.token?.sn);
                    const newItem = {
                        ...(existingToken || moveData?.token),
                        position: targetPosition,
                        active: true,
                        isSafePath: tokenColor === 'red' ? targetPosition > 52 : false,
                    };

                    console.log('Activating and moving token:', { sn: moveData.token.sn, from: existingToken?.position, to: targetPosition });

                    const remainingCount = (availableDiceValues.length) - (diceToUse?.length || 0);
                    const isTurnOver = remainingCount === 0;

                    return {
                        ...prev,
                        tokens: {
                            ...prev.tokens,
                            [tokenColor]: [...currentTokens.filter((item: Token) => item.sn !== moveData?.token?.sn), newItem]
                        },
                        usedDiceValues: [...(prev.usedDiceValues || []), ...diceToUse],
                        activeDiceConfig: null,
                        status: isTurnOver ? "playingDice" : "playingToken",
                        currentTurn: isTurnOver ? getNextPlayerId(prev.players, prev.currentTurn) : prev.currentTurn,
                    };
                });

                setLastMovedToken({ color: moveData?.token?.color, sn: moveData?.token?.sn });
                setLastMoveWasActivation(false);
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

    let moveDistance = targetPosition - (moveData?.token?.position as number);
    if (tokenColor !== 'red' && moveDistance < 0) {
        moveDistance += 52;
    }

    const diceToConsume = activeDiceConfig || [moveDistance];

    // CRITICAL: Update the token position
    setGameState(prev => {
        const currentTokens = prev.tokens[tokenColor] || [];
        const existingToken = currentTokens.find((item: Token) => item.sn === moveData?.token?.sn);

        if (!existingToken && !moveData?.token) return prev;

        const newItem = {
            ...(existingToken || moveData?.token),
            position: targetPosition,
            active: true,
            isSafePath: tokenColor === 'red' ? targetPosition > 52 : (existingToken?.isSafePath || false),
        };

        console.log('Moving active token:', { sn: moveData.token.sn, from: existingToken?.position, to: targetPosition, isSafePath: newItem.isSafePath });

        const remainingDiceValuesCount = availableDiceValues.length - diceToConsume.length;
        const isTurnOver = remainingDiceValuesCount === 0;

        return {
            ...prev,
            tokens: {
                ...prev.tokens,
                [tokenColor]: [...currentTokens.filter((item: Token) => item.sn !== moveData?.token?.sn), newItem]
            },
            usedDiceValues: [...(prev.usedDiceValues || []), ...diceToConsume],
            activeDiceConfig: null,
            status: isTurnOver ? "playingDice" : "playingToken",
            currentTurn: isTurnOver ? getNextPlayerId(prev.players, prev.currentTurn) : prev.currentTurn,
        };
    });
};
