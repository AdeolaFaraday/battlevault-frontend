import { doc, onSnapshot, setDoc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../lib/firebase";

export interface GameSessionData {
    tokens: { [key: string]: Token[] };
    players: LudoPlayer[];
    usedDiceValues: number[];
    currentTurn: string;
    diceValue: number[];
    status: "waiting" | "playingDice" | "playingToken" | "finished";
    isRolling: boolean;
    activeDiceConfig: number[] | null;
    lastUpdated?: object | null;
}

export const GameService = {
    subscribeToGame: (gameId: string, callback: (data: GameSessionData) => void) => {
        const gameRef = doc(firestore, "games", gameId);
        return onSnapshot(gameRef, (snapshot) => {
            if (snapshot.exists()) {
                callback(snapshot.data() as GameSessionData);
            }
        });
    },

    updateGame: async (gameId: string, data: Partial<GameSessionData>) => {
        const gameRef = doc(firestore, "games", gameId);
        await updateDoc(gameRef, {
            ...data,
            lastUpdated: serverTimestamp()
        });
    },

    initializeGame: async (gameId: string, initialState: GameSessionData) => {
        const gameRef = doc(firestore, "games", gameId);
        const snapshot = await getDoc(gameRef);
        if (!snapshot.exists()) {
            await setDoc(gameRef, {
                ...initialState,
                lastUpdated: serverTimestamp()
            });
        }
    }
};
