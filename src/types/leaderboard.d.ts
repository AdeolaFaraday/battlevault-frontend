export interface LeaderboardPlayer {
    _id: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    totalGamesPlayed?: number;
    totalWins?: number;
    totalLosses?: number;
    currentStreak?: number;
    bestStreak?: number;
    winPercentage?: number;
}

export interface LeaderboardResult {
    players: LeaderboardPlayer[];
    total: number;
    page: number;
    limit?: number;
    totalPages: number;
    hasMore: boolean;
}

export interface GetLeaderboardResponse {
    getLeaderboard: {
        statusCode: number;
        success: boolean;
        message: string;
        data: LeaderboardResult | null;
    };
}
