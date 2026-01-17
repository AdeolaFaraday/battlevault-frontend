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

export const getNextPlayerId = (players: LudoPlayer[], currentTurnId: string) => {
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
                false // isActivation default safe status
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

    // Calculate Next Position Logic
    const isAlreadySafe = moveData?.token?.isSafePath || false;

    // HOME POSITIONS (Safe Path Entry + 5)
    // Green: 14+5=19, Yellow: 27+5=32, Blue: 40+5=45, Red: 53+5=58
    const HOME_POSITIONS: { [key: string]: number } = { green: 19, yellow: 32, blue: 45, red: 58 };
    const homePos = HOME_POSITIONS[tokenColor];

    if (isAlreadySafe) {
        if (currentTokenPosition + moveAmount > homePos) {
            toast.error(`You need exactly ${homePos - currentTokenPosition} to finish!`);
            return;
        }
    }

    let finalPosition = currentTokenPosition + moveAmount;
    let willBeSafe = isAlreadySafe;

    if (isAlreadySafe) {
        // Just moving within safe path
        // (Optional: Add logic to prevent moving beyond home end)
        finalPosition = currentTokenPosition + moveAmount;
    } else {
        // Safe Path Entry Check
        // Green(14), Yellow(27), Blue(40), Red(53)
        // Logic: specific "gate" check based on color and current position
        if (tokenColor === 'red' && finalPosition >= 53) {
            willBeSafe = true;
        } else if (tokenColor === 'green' && currentTokenPosition <= 13 && finalPosition >= 14) {
            willBeSafe = true;
        } else if (tokenColor === 'yellow' && currentTokenPosition <= 26 && finalPosition >= 27) {
            willBeSafe = true;
        } else if (tokenColor === 'blue' && currentTokenPosition <= 39 && finalPosition >= 40) {
            willBeSafe = true;
        }

        // Apply Main Path Wrapping (1-52) if NOT entering safe path
        // Since Red doesn't wrap 52->1 (enters safe at 53), this logic works for Red too 
        // (Red main path is linear 1..52 then Safe 53)
        if (!willBeSafe) {
            if (finalPosition > 52) finalPosition -= 52;
        }
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
        willBeSafe, // Pass calculations
        // gameState.tokens // Pass all tokens for collision check
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
    isSafePath: boolean,
    // allTokens: { [key: string]: Token[] } = {}
) => {
    setGameState(prev => {
        const currentTokens = prev.tokens[color] || [];
        const existingToken = currentTokens.find((t: Token) => t.sn === tokenSn);
        const players = prev.players || [];
        const currentPlayerIndex = players.findIndex(p => p.tokens.includes(color));

        // HOME POSITIONS (Safe Path Entry + 5)
        // Green: 14+5=19, Yellow: 27+5=32, Blue: 40+5=45, Red: 53+5=58
        const HOME_POSITIONS: { [key: string]: number } = { green: 19, yellow: 32, blue: 45, red: 58 };
        const isFinished = isSafePath && newPos === HOME_POSITIONS[color];

        // Create the updated token object
        const updatedToken = {
            ...(existingToken!), // Asserting existence
            position: newPos,
            active: true,
            isSafePath: isSafePath,
            isFinished: isFinished,
        };

        // COLLISION CHECK
        let killedOpponent: { color: string, sn: number } | null = null;
        const updatedTokensMap = { ...prev.tokens };

        // We track if the current token gets promoted due to a kill
        let killerPromoted = false;

        if (!isSafePath) {
            // Check for opponents at newPos (Main Path only)
            // Note: Safe Spots (Stars) logic can be added here (e.g. if newPos is not a safe spot)
            Object.keys(updatedTokensMap).forEach(key => {
                if (key !== color) {
                    const opponentTokens = updatedTokensMap[key];
                    const victimIndex = opponentTokens.findIndex(t => t.active && !t.isSafePath && t.position === newPos);
                    if (victimIndex !== -1) {
                        const victim = opponentTokens[victimIndex];
                        killedOpponent = { color: key, sn: victim.sn };

                        // Reset Victim
                        const resetVictim = { ...victim, active: false, position: -1, isSafePath: false };
                        const newOpponentTokens = [...opponentTokens];
                        newOpponentTokens[victimIndex] = resetVictim;
                        updatedTokensMap[key] = newOpponentTokens;

                        // KILL = FINISH RULE
                        // Promote the current token (killer) to Home directly
                        killerPromoted = true;

                        toast.success(`Captured ${key} token! Promoted to Home!`);
                    }
                }
            });
        }

        // Apply Promotion if Kill Happened
        if (killerPromoted) {
            updatedToken.position = HOME_POSITIONS[color];
            updatedToken.isSafePath = true;
            updatedToken.isFinished = true;
        }

        // UPDATE CURRENT PLAYER STATS
        const updatedPlayers = [...players];
        if (currentPlayerIndex !== -1) {
            const player = { ...updatedPlayers[currentPlayerIndex] };
            let statsChanged = false;

            if (killedOpponent) {
                player.capturedCount = (player.capturedCount || 0) + 1;
                // If we promoted due to kill, we also increment finished count
                if (killerPromoted) {
                    player.finishedCount = (player.finishedCount || 0) + 1;
                }
                statsChanged = true;
            }

            // If it wasn't a kill promotion, but we normally finished
            if (!killerPromoted && isFinished) {
                player.finishedCount = (player.finishedCount || 0) + 1;
                statsChanged = true;
                toast.success("Token Finished!");
            }

            if (statsChanged) {
                updatedPlayers[currentPlayerIndex] = player;
            }
        }

        // Update Current Player Tokens in Map
        updatedTokensMap[color] = [
            ...currentTokens.filter((t: Token) => t.sn !== tokenSn),
            updatedToken
        ];


        // Determine if Turn is Over
        // Turn is over if we have consumed ALL available dice
        // UNLESS we rolled a 6 (bonus functionality often in Ludo, but maybe not here yet)
        // OR we killed someone (bonus turn?) 
        // OR we finished (bonus turn?)
        // For now, sticking to dice consumption logic
        const remainingDiceCount = allAvailableDice.length - diceConsumed.length;
        const isTurnOver = remainingDiceCount === 0;

        return {
            ...prev,
            players: updatedPlayers,
            tokens: updatedTokensMap,
            usedDiceValues: [...(prev.usedDiceValues || []), ...diceConsumed],
            activeDiceConfig: null,
            status: isTurnOver ? "playingDice" : "playingToken",
            currentTurn: isTurnOver ? getNextPlayerId(prev.players, prev.currentTurn) : prev.currentTurn,
        };
    });
};
