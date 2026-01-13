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
    const [activeDiceConfig, setActiveDiceConfig] = useState<number[] | null>(null);
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

    const handleDiceRoll = (results: number[], playerId?: string) => {
        // You can use these results to update game state
        console.log('Dice roll results:', results);
        // Reset used dice values for new roll
        setUsedDiceValues([]);
        setActiveDiceConfig(null);
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
            activeDiceConfig,
            findActiveTokens,
            tokens,
            setTokens,
            setUsedDiceValues,
            setGameState,
            setLastMovedToken,
            setLastMoveWasActivation,
            setActiveDiceConfig
        });
    }

    const handleTokenClick = (token: Token, position?: number, playerId?: string) => {
        // Get available dice
        const availableDice = [...gameState.diceValue];
        usedDiceValues.forEach(val => {
            const index = availableDice.indexOf(val);
            if (index !== -1) availableDice.splice(index, 1);
        });

        // If multiple dice available but none selected, alert user
        if (availableDice.length > 1 && !activeDiceConfig) {
            toast.info("Please select a dice value first!");
            return;
        }

        handleTokenMove({
            token,
            position: position || 0,
            playerId: playerId || ""
        })
    }

    console.log({ gameState, tokens });


    return {
        findActiveTokens,
        tokens,
        findBgColor,
        gameState,
        activeDiceConfig,
        setActiveDiceConfig,
        usedDiceValues,
        handleTokenClick,
        handleDiceRoll
    }
}

export default useLudoAction;