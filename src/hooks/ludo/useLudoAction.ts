import { useState } from "react";

const useLudoAction = () => {
    const [gameState, setGameState] = useState<LudoGameState>({
        players: [],
        currentTurn: "",
        diceValue: 0,
        isRolling: false,
        status: "waiting",
    });

    return {
        gameState
    }
}

export default useLudoAction;