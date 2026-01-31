import { useEffect, useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '@/src/lib/firebase';
import { JOIN_GAME_MUTATION } from '@/src/graphql/game/mutations';
import { LudoPlayer } from '../types/ludo';
import { useAppDispatch } from '@/src/lib/redux/hooks';
import { setSessionId } from '@/src/lib/redux/slices/gameSlice';

export interface Game {
    _id: string;
    id?: string;
    name: string;
    type: string;
    tournamentId?: string;
    matchStage?: string;
    players: LudoPlayer[];
    currentTurn: string;
    diceValue: number[];
    isRolling: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface UseGameSessionProps {
    gameId: string;
    player: {
        id?: string;
        name: string;
        color: string;
        tokens?: string[];
    };
}

export const useGameSession = ({ gameId, player }: UseGameSessionProps) => {
    const [gameState, setGameState] = useState<Game | null>(null);
    const dispatch = useAppDispatch();

    const [joinGame, { loading: joining, error: joinError }] = useMutation(JOIN_GAME_MUTATION, {
        onCompleted: (data) => {
            if (data?.joinGame?.success && data.joinGame.data) {
                const gameData = data.joinGame.data;
                // Store session token if available
                if (gameData.sessionToken) {
                    dispatch(setSessionId(gameData.sessionToken));
                    // Also store in localStorage for Apollo Link access
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('game_session_id', gameData.sessionToken);
                    }
                }
                setGameState(gameData);
            }
        }
    });

    // Use a ref to track if we've attempted to join to prevent double calling in React 18 strict mode
    const hasJoinedRef = useRef(false);

    useEffect(() => {
        if (!gameId || !player?.name || hasJoinedRef.current) return;

        const initGame = async () => {
            try {
                hasJoinedRef.current = true;
                const { data } = await joinGame({
                    variables: {
                        gameId,
                        name: player.name,
                        userId: player.id // Pass the ID (UUID for guest, Auth ID for user)
                    }
                });

                if (data?.joinGame) {
                    // setGameState(data.joinGame);
                }
            } catch (e) {
                console.error("Failed to join game:", e);
                hasJoinedRef.current = false; // Allow retry on error? Or keep it blocked.
            }
        };

        initGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameId, player?.name]);

    useEffect(() => {
        if (!gameId) return;

        const gameRef = doc(firestore, 'games', gameId);
        const unsubscribe = onSnapshot(gameRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                // Merge with existing state or set new
                setGameState(prev => {
                    // Start with backend response, then overlay firestore data
                    // Firestore data structure must match Game interface
                    return { ...prev, ...data } as Game;
                });
                console.log({ firesbaseData: data })
            }
        }, (error) => {
            console.error("Firestore snapshot error:", error);
        });

        return () => unsubscribe();
    }, [gameId]);


    return {
        gameState,
        loading: joining,
        error: joinError
    };
};
