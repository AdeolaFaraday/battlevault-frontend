import { useQuery } from '@apollo/client';
import { GET_USER_STATS } from '@/src/graphql/game/queries';

export interface UserStats {
	totalGamesPlayed: number;
	totalWins: number;
	totalLosses: number;
	winPercentage: number;
}

interface GetUserStatsResponse {
	getUserStats: {
		statusCode: number;
		success: boolean;
		message: string;
		data:
			| ({
				__typename: string;
			} & Partial<UserStats>)
			| null;
	};
}

export interface UseUserStatsReturn {
	stats: UserStats | null;
	loading: boolean;
	error: Error | undefined;
}

export const useUserStats = (): UseUserStatsReturn => {
	const { data, loading, error } = useQuery<GetUserStatsResponse>(GET_USER_STATS);

	const raw = data?.getUserStats?.data;

	const stats: UserStats | null = raw
		? {
			totalGamesPlayed: raw.totalGamesPlayed ?? 0,
			totalWins: raw.totalWins ?? 0,
			totalLosses: raw.totalLosses ?? 0,
			winPercentage: raw.winPercentage ?? 0,
		}
		: null;

	return {
		stats,
		loading,
		error: error as Error | undefined,
	};
};

export default useUserStats;

