import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_LAST_SEEN_MUTATION } from '@/src/graphql/game/mutations';

/**
 * Hook to periodically update the user's online status in a game.
 * @param gameId The ID of the game to update presence for.
 * @param intervalMs The interval in milliseconds between updates (default: 20 seconds)
 */
export const usePresenceTracking = (gameId?: string, intervalMs: number = 20000) => {
    const [updateLastSeen] = useMutation(UPDATE_LAST_SEEN_MUTATION);

    useEffect(() => {
        if (!gameId) return;

        // Initial update
        updateLastSeen({ variables: { gameId } }).catch(err => {
            console.error("Failed to update last seen initially:", err);
        });

        const interval = setInterval(() => {
            updateLastSeen({ variables: { gameId } }).catch(err => {
                console.error("Failed to update last seen periodically:", err);
            });
        }, intervalMs);

        return () => clearInterval(interval);
    }, [gameId, intervalMs, updateLastSeen]);
};
