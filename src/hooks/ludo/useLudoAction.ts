import { useState } from "react";
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
        diceValue: [
            {
                sides: "pip",
                dieType: "pip",
                groupId: 0,
                rollId: 0,
                theme: "smooth-pip",
                themeColor: "#ffffff",
                value: 1
            },
            {
                sides: "pip",
                dieType: "pip",
                groupId: 0,
                rollId: 1,
                theme: "smooth-pip",
                themeColor: "#ffffff",
                value: 4
            }
        ],
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

    const handleDiceRoll = (results: DiceValue[], playerId?: string) => {
        // You can use these results to update game state
        console.log('Dice roll results:', results);
        setGameState(prev => {
            return {
                ...prev,
                diceValue: results,
                currentTurn: playerId || ""
            }
        })
    };

    const handleTokenClick = (token: Token, position?: number, playerId?: string) => {
        const findPlayer = gameState?.players?.find((player) => player?.id === playerId)
        const findToken = findPlayer?.tokens?.includes(token?.color)
        if (!findToken) {
            toast.error("Can't move this token!")
            return
        }
        const findSetter = tokenMapper?.find((data) => data?.color == token?.color)

        findSetter?.setter((prev: Token[]) => {
            const newItem = {
                ...token,
                position,
                active: true,
            }
            const exists = prev.some((item) => item.sn === token.sn);
            if (exists) {
                return [...prev.filter((item) => item.sn !== token.sn), newItem];
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