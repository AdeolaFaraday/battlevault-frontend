import { doc, onSnapshot, setDoc, updateDoc, getDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { LudoPlayer, Token } from "@/src/types/ludo";

export interface GameSessionData {
    id?: string;
    tokens: { [key: string]: Token[] };
    players: LudoPlayer[];
    usedDiceValues: number[];
    currentTurn: string;
    diceValue: number[];
    status: "waiting" | "playingDice" | "playingToken" | "finished";
    isRolling: boolean;
    activeDiceConfig: number[] | null;
    winner?: string;
    lastMoverId?: string;
    lastUpdated?: Timestamp;
    createdAt?: string;
    updatedAt?: string;
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
