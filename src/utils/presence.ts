/**
 * Checks if a user is online based on their last seen timestamp.
 * @param lastSeen The last seen timestamp (ISO string or milliseconds)
 * @param thresholdMs The threshold in milliseconds to consider a user offline (default: 30 seconds)
 * @returns boolean
 */
export const isOnline = (lastSeen?: string | number, thresholdMs: number = 30000): boolean => {
    if (!lastSeen) return false;

    const lastSeenMs = typeof lastSeen === 'string' ? new Date(lastSeen).getTime() : lastSeen;
    const now = Date.now();

    return now - lastSeenMs < thresholdMs;
};
