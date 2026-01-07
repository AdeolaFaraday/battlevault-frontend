import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cellColors } from "@/src/constants";

const useLudoAction = ({ color }: { color?: string }) => {
    const generateDefaultTokenStates = (color: string) => {
        return Array(4).fill(0).map((_, i) => {
            return {
                sn: i + 1,
                color,
                active: null,
                position: null
            }
        })
    }
    const [gameState, setGameState] = useState<LudoGameState>({
        players: [
            {
                id: "1",
                name: "Player 1",
                color: "blue",
                tokens: ["blue", "yellow",]
            },
            {
                id: "2",
                name: "Player 2",
                color: "yellow",
                tokens: ["green", "red"]
            }
        ],
        currentTurn: "1",
        diceValue: [],
        isRolling: false,
        status: "playingDice",
    });
    const [usedDiceValues, setUsedDiceValues] = useState<number[]>([]);
    const [, setLastMoveWasActivation] = useState<boolean>(false);
    const [, setLastMovedToken] = useState<{ color: string, sn: number } | null>(null);
    // const [tokenState, setTokenState] = useState({
    //     blueTokens: generateDefaultTokenStates("blue") as any,
    //     yellowTokens: generateDefaultTokenStates("yellow") as any,
    //     greenTokens: generateDefaultTokenStates("green") as any,
    //     redTokens: generateDefaultTokenStates("red") as any
    // })
    const [blueTokens, setBlueTokens] = useState<Token[]>(generateDefaultTokenStates("blue") as unknown as Token[])
    const [yellowTokens, setYellowTokens] = useState<Token[]>(generateDefaultTokenStates("yellow") as unknown as Token[])
    const [greenTokens, setGreenTokens] = useState<Token[]>(generateDefaultTokenStates("green") as unknown as Token[])
    const [redTokens, setRedTokens] = useState<Token[]>(generateDefaultTokenStates("red") as unknown as Token[])
    const [moveData, setMoveData] = useState<{
        token: Token
        position: number
        playerId: string
    }>({
        token: {} as Token,
        position: 0,
        playerId: ""
    })
    const findActiveTokens = [
        ...blueTokens,
        ...yellowTokens,
        ...redTokens,
        ...greenTokens
    ]?.filter((token) => token.active)
    const findBgColor = cellColors?.find((data) => data?.color === color)


    const tokenMapper = [
        {
            color: "blue",
            value: blueTokens,
            startPath: 41,
            setter: setBlueTokens,
        },
        {
            color: "green",
            value: greenTokens,
            startPath: 15,
            setter: setGreenTokens
        },
        {
            color: "yellow",
            value: yellowTokens,
            startPath: 28,
            setter: setYellowTokens
        },
        {
            color: "red",
            value: redTokens,
            startPath: 2,
            setter: setRedTokens
        }
    ]

    const handleDiceRoll = (results: number[], playerId?: string) => {
        // You can use these results to update game state
        console.log('Dice roll results:', results);
        // Reset used dice values for new roll
        setUsedDiceValues([]);
        setGameState(prev => {
            return {
                ...prev,
                diceValue: results,
                status: "playingToken",
                currentTurn: playerId || "1"
            }
        })
    };

    useEffect(() => {
        if (moveData?.token?.sn) {
            handleTokenMove()
        }
    }, [moveData])

    const handleTokenMove = () => {
        const diceValue = gameState?.diceValue
        const findPlayer = gameState?.players?.find((player) => player?.id === "1")
        const findToken = findPlayer?.tokens?.includes(moveData?.token?.color)

        if (!findToken) {
            toast.error("Can't move this token!")
            return
        }
        const findSetter = tokenMapper?.find((data) => data?.color == moveData?.token?.color)

        // Get available dice values (correctly handling duplicates)
        const availableDiceValues = [...diceValue];
        usedDiceValues.forEach(usedVal => {
            const index = availableDiceValues.indexOf(usedVal);
            if (index !== -1) {
                availableDiceValues.splice(index, 1);
            }
        });

        // Handle activating token (Inactive Token Logic)
        console.log({ moveData, findActiveTokens })
        if (!moveData?.token?.active) {
            const startPath = findSetter?.startPath;
            const targetPosition = moveData?.position as number;

            // Case 1: Drag/Click to Start Position
            if (targetPosition === startPath) {
                if (availableDiceValues.includes(6)) {
                    findSetter?.setter((prev: Token[]) => {
                        const newItem = {
                            ...moveData?.token,
                            position: startPath,
                            active: true,
                        }
                        return [...prev.filter((item) => item.sn !== moveData?.token?.sn), newItem];
                    })

                    // Mark one 6 as used
                    setUsedDiceValues(prev => [...prev, 6]);
                    setLastMovedToken({ color: moveData?.token?.color, sn: moveData?.token?.sn });
                    setLastMoveWasActivation(true);

                    const remainingCount = availableDiceValues.length - 1;
                    setGameState(prev => {
                        return {
                            ...prev,
                            status: remainingCount > 0 ? "playingToken" : "playingDice",
                        }
                    })
                    return;
                } else {
                    toast.error("You need a 6 to move out!");
                    return;
                }
            }

            // Case 2: Drag to Start + X (Combined Activation)
            // User drags from Home to (Start + X)
            else if (targetPosition > startPath!) {
                const moveDiff = targetPosition - startPath!;

                // We need a 6 AND the difference value
                // Check if we have a 6
                const hasSix = availableDiceValues.includes(6);

                if (!hasSix) {
                    toast.error("You need a 6 to start!");
                    return;
                }

                // Check if we have the difference value (handling separate dice instances)
                // We temporarily remove one 6 to see if the other value exists
                const tempDice = [...availableDiceValues];
                const sixIndex = tempDice.indexOf(6);
                if (sixIndex !== -1) tempDice.splice(sixIndex, 1);

                const hasDiff = tempDice.includes(moveDiff);

                if (hasDiff) {
                    findSetter?.setter((prev: Token[]) => {
                        const newItem = {
                            ...moveData?.token,
                            position: targetPosition,
                            active: true,
                        }
                        return [...prev.filter((item) => item.sn !== moveData?.token?.sn), newItem];
                    })

                    // Mark BOTH 6 and diff as used
                    setUsedDiceValues(prev => [...prev, 6, moveDiff]);
                    setLastMovedToken({ color: moveData?.token?.color, sn: moveData?.token?.sn });
                    setLastMoveWasActivation(false); // Combined move complete, no "activation" state needed as turn ends or consumes dice

                    // Calculate remaining dice count (removed 2 dice)
                    // const remainingCount = availableDiceValues.length - 2;

                    // Force End of Turn logic if we want to be strict, or just let natural dice depletion work
                    // The requirement was "there should be no more moves"
                    // If we used 2 dice and had 2, remaining is 0 -> playingDice
                    setGameState(prev => {
                        return {
                            ...prev,
                            // If we strictly want to end turn even if 3 dice exists (unlikely in standard Ludo but good for safety):
                            status: "playingDice",
                        }
                    })
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
        const moveDistance = (moveData?.position as number) - (moveData?.token?.position as number);

        // Check if the move distance matches any available dice value
        const matchingDiceValue = availableDiceValues.find(val => val === moveDistance);

        if (!matchingDiceValue) {
            toast.error(`Invalid move! You can only move ${availableDiceValues.join(' or ')} steps.`)
            return
        }

        // Validate move doesn't exceed sum of available dice (general safety check)
        const sumOfAvailableDice = availableDiceValues?.reduce((acc, curr) => acc + curr, 0)

        if (gameState?.status === "playingToken" && moveDistance > sumOfAvailableDice) {
            toast.error("Can't move this token!")
            return
        }

        findSetter?.setter((prev: Token[]) => {
            const newItem = {
                ...moveData?.token,
                position: moveData?.position,
                active: true,
            }
            const exists = prev.some((item) => item.sn === moveData?.token?.sn);
            if (exists) {
                return [...prev.filter((item) => item.sn !== moveData?.token?.sn), newItem];
            }
            return prev
        })

        // Mark this dice value as used
        setUsedDiceValues(prev => [...prev, matchingDiceValue]);

        // Calculate remaining details for status update
        const remainingDiceValuesCount = availableDiceValues.length - 1;

        setGameState(prev => {
            return {
                ...prev,
                status: remainingDiceValuesCount > 0 ? "playingToken" : "playingDice",
            }
        })
    }

    const handleTokenClick = (token: Token, position?: number, playerId?: string) => {
        console.log({ token, position, playerId })
        setMoveData({
            token,
            position: position || 0,
            playerId: playerId || ""
        })
    }

    console.log({ gameState });


    return {
        findActiveTokens,
        blueTokens,
        yellowTokens,
        greenTokens,
        redTokens,
        findBgColor,
        gameState,
        handleTokenClick,
        handleDiceRoll
    }
}

export default useLudoAction;