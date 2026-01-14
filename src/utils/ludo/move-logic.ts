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
    setGameState,
    setLastMovedToken,
    setLastMoveWasActivation,
}: ProcessMoveParams) => {
    // ---------------------------------------------------------
    // 1. GATHER CONTEXT
    // ---------------------------------------------------------
    const { diceValue, usedDiceValues, activeDiceConfig, players } = gameState;
    const tokenColor = moveData?.token?.color;
    const currentTokenPosition = moveData?.token?.position || 0;
    const isTokenActive = moveData?.token?.active;

    // Check if the move is valid for the current player
    const player = players?.find((p) => p.id === moveData?.playerId);
    const hasToken = player?.tokens?.includes(tokenColor);

    if (!hasToken) {
        toast.error("Can't move this token!");
        return;
    }

    // ---------------------------------------------------------
    // 2. DETERMINE AVAILABLE DICE
    // ---------------------------------------------------------
    // We filter out dice that have already been used in this turn
    const availableDiceValues = [...diceValue];
    usedDiceValues.forEach(usedVal => {
        const index = availableDiceValues.indexOf(usedVal);
        if (index !== -1) availableDiceValues.splice(index, 1);
    });

    if (availableDiceValues.length === 0) {
        toast.error("Roll dice first / No dice left!");
        return;
    }

    // ---------------------------------------------------------
    // 3. DECIDE WHICH DICE TO USE
    // ---------------------------------------------------------
    let diceToUse: number[] | null = null;

    // SCENARIO A: User explicitly selected dice in the UI (e.g. clicked on '6')
    if (activeDiceConfig && activeDiceConfig.length > 0) {
        diceToUse = activeDiceConfig;
    }
    // SCENARIO B: Only one dice left, so use it automatically
    else if (availableDiceValues.length === 1) {
        diceToUse = [availableDiceValues[0]];
    }
    // SCENARIO C: Multiple dice available but none selected
    // Note: We might want to prompt user, but for now we error or handle special cases below

    // ---------------------------------------------------------
    // 4. HANDLE "ACTIVATION" (Getting out of Home)
    // ---------------------------------------------------------
    const startPaths: { [key: string]: number } = { blue: 41, green: 15, yellow: 28, red: 2 };
    const startPath = startPaths[tokenColor];

    if (!isTokenActive) {
        // To activate, we NEED a 6.
        // If we selected a 6 (or combined 6+X), or if we have a 6 available to auto-pick...
        const hasSix = diceToUse?.includes(6) || (!diceToUse && availableDiceValues.includes(6));

        if (hasSix) {
            // If we didn't have specific dice selected, we default to just [6] for basic activation
            // But if user selected [6, 3], we use both (Immediate move after activation)
            const finalDiceToConsme = diceToUse || [6];

            // Calculate where it lands. 
            // If just [6], it lands on StartPath. 
            // If [6, 3], it lands on StartPath + 3.
            const totalMoveAmount = finalDiceToConsme.reduce((sum, val) => sum + val, 0);
            const extraSteps = totalMoveAmount - 6; // The '3' in [6, 3]
            const newPosition = startPath + extraSteps;

            // Perform the State Update
            updateGameState(
                // gameState,
                tokenColor,
                moveData.token.sn,
                newPosition,
                finalDiceToConsme,
                availableDiceValues,
                setGameState,
                // true // isActivation
            );

            setLastMovedToken({ color: tokenColor, sn: moveData.token.sn });
            setLastMoveWasActivation(true);
            return;
        } else {
            toast.error("You need a 6 to move out!");
            return;
        }
    }

    // ---------------------------------------------------------
    // 5. HANDLE "NORMAL MOVE" (Moving on the board)
    // ---------------------------------------------------------
    if (!diceToUse) {
        toast.error("Please select a dice value!");
        return;
    }

    const moveAmount = diceToUse.reduce((sum, val) => sum + val, 0);
    const nextLinearPos = currentTokenPosition + moveAmount;

    // Handle wrapping around the board (Max 52 cells)
    // Logic: If Red, it just goes up. Others wrap around 52 -> 1.
    // NOTE: This wrap logic might need specific tuning based on your board config
    let finalPosition = nextLinearPos;
    if (tokenColor !== 'red') {
        if (finalPosition > 52) finalPosition -= 52;
    }

    // Perform the State Update
    updateGameState(
        // gameState,
        tokenColor,
        moveData.token.sn,
        finalPosition,
        diceToUse,
        availableDiceValues,
        setGameState,
        // false // Not activation
    );
};


// ---------------------------------------------------------
// HELPER: CENTRALIZED STATE UPDATE
// ---------------------------------------------------------
// This function handles the "Atomic Update" of the game state.
// It updates the token, marks dice as used, and rotates the turn if needed.
const updateGameState = (
    // prevState: GameSessionData,
    color: string,
    tokenSn: number,
    newPos: number,
    diceConsumed: number[],
    allAvailableDice: number[],
    setGameState: ProcessMoveParams['setGameState'],
    // isActivation: boolean
) => {
    setGameState(prev => {
        const currentTokens = prev.tokens[color] || [];
        const existingToken = currentTokens.find((t: Token) => t.sn === tokenSn);

        // Create the updated token object
        const updatedToken = {
            ...(existingToken!), // Asserting existence as we checked earlier
            position: newPos,
            active: true,
            // Calculate safety (example logic)
            isSafePath: color === 'red' ? newPos > 52 : false,
        };

        // Determine if Turn is Over
        // Turn is over if we have consumed ALL available dice
        const remainingDiceCount = allAvailableDice.length - diceConsumed.length;
        const isTurnOver = remainingDiceCount === 0;

        return {
            ...prev,
            // 1. Update Token Array
            tokens: {
                ...prev.tokens,
                [color]: [
                    ...currentTokens.filter((t: Token) => t.sn !== tokenSn),
                    updatedToken
                ]
            },
            // 2. Mark Dice as Used
            usedDiceValues: [...(prev.usedDiceValues || []), ...diceConsumed],
            // 3. Clear Active Selection
            activeDiceConfig: null,
            // 4. Update Status & Turn
            status: isTurnOver ? "playingDice" : "playingToken",
            currentTurn: isTurnOver ? getNextPlayerId(prev.players, prev.currentTurn) : prev.currentTurn,
        };
    });
};
