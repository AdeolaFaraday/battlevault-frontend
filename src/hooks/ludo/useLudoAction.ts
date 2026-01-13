import { useState } from "react";
import { toast } from "sonner";
import { cellColors } from "@/src/constants";
import { processTokenMove } from "@/src/utils/ludo/move-logic";

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
    const [tokens, setTokens] = useState<{ [key: string]: Token[] }>({
        blue: generateDefaultTokenStates("blue") as unknown as Token[],
        yellow: generateDefaultTokenStates("yellow") as unknown as Token[],
        green: generateDefaultTokenStates("green") as unknown as Token[],
        red: generateDefaultTokenStates("red") as unknown as Token[]
    })

    const findActiveTokens = Object.values(tokens).flat().filter((token) => token.active)
    const findBgColor = cellColors?.find((data) => data?.color === color)

    const tokenMapper = [
        {
            color: "blue",
            value: tokens.blue,
            startPath: 41,
        },
        {
            color: "green",
            value: tokens.green,
            startPath: 15,
        },
        {
            color: "yellow",
            value: tokens.yellow,
            startPath: 28,
        },
        {
            color: "red",
            value: tokens.red,
            startPath: 2,
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

    const handleTokenMove = (moveData: { token: Token, position: number, playerId: string }) => {
        processTokenMove({
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
        });
    }

    const handleTokenClick = (token: Token, position?: number, playerId?: string) => {
        console.log({ token, position, playerId })
        handleTokenMove({
            token,
            position: position || 0,
            playerId: playerId || ""
        })
    }

    console.log({ gameState });


    return {
        findActiveTokens,
        tokens,
        findBgColor,
        gameState,
        handleTokenClick,
        handleDiceRoll
    }
}

export default useLudoAction;