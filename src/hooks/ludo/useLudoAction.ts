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
    // const [tokenState, setTokenState] = useState({
    //     blueTokens: generateDefaultTokenStates("blue") as any,
    //     yellowTokens: generateDefaultTokenStates("yellow") as any,
    //     greenTokens: generateDefaultTokenStates("green") as any,
    //     redTokens: generateDefaultTokenStates("red") as any
    // })
    const [blueTokens, setBlueTokens] = useState<Token[]>(generateDefaultTokenStates("blue") as any)
    const [yellowTokens, setYellowTokens] = useState<Token[]>(generateDefaultTokenStates("yellow") as any)
    const [greenTokens, setGreenTokens] = useState<Token[]>(generateDefaultTokenStates("green") as any)
    const [redTokens, setRedTokens] = useState<Token[]>(generateDefaultTokenStates("red") as any)
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
        // console.log({ findToken, playerId, token });
        if (!findToken) {
            toast.error("Can't move this token!")
            return
        }
        const findSetter = tokenMapper?.find((data) => data?.color == moveData?.token?.color)

        console.log({ isDiceValue: diceValue.includes(6), diceValue });

        if (diceValue.includes(6) && !moveData?.token?.active) {
            findSetter?.setter((prev: Token[]) => {
                const newItem = {
                    ...moveData?.token,
                    position: moveData?.position,
                    active: true,
                }
                return [...prev.filter((item) => item.sn !== moveData?.token?.sn), newItem];
            })
            setGameState(prev => {
                return {
                    ...prev,
                    status: "playingDice",
                    diceValue: prev?.diceValue?.filter((item) => item !== 6)
                }
            })
            return
        }

        const sumOfDiceValue = diceValue?.reduce((acc, curr) => acc + curr, 0)
        console.log({ moveData, gameState, sumOfDiceValue });
        if (gameState?.status === "playingToken" && ((moveData?.position as number) - (moveData?.token?.position as number)) > sumOfDiceValue) {
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
        setGameState(prev => {
            return {
                ...prev,
                status: "playingDice",
            }
        })
    }

    const handleTokenClick = (token: Token, position?: number, playerId?: string) => {
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