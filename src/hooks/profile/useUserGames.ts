import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_GAMES } from '@/src/graphql/game/queries';

const ITEMS_PER_PAGE = 10;

export interface UserGame {
	_id: string;
	name: string;
	type: string;
	status: string;
	startDate?: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface UserGamesResult {
	games: UserGame[];
	total: number;
	page: number;
	limit: number;
	pages: number;
}

interface GetUserGamesResponse {
	getUserGames: {
		statusCode: number;
		success: boolean;
		message: string;
		data:
		| ({
			__typename: string;
		} & Partial<UserGamesResult>)
		| null;
	};
}

export interface UseUserGamesReturn {
	games: UserGame[];
	totalGames: number;
	loading: boolean;
	error: Error | undefined;
	hasMore: boolean;
	isFetchingMore: boolean;
	searchQuery: string;
	debouncedSearch: string;
	setSearchQuery: (query: string) => void;
	fetchNextPage: () => Promise<void>;
}

export const useUserGames = (): UseUserGamesReturn => {
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');
	const [page, setPage] = useState(1);
	const [allGames, setAllGames] = useState<UserGame[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [totalGames, setTotalGames] = useState(0);

	// Debounce search input
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchQuery);
			setPage(1);
			setAllGames([]);
			setHasMore(true);
		}, 300);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	const { loading, error, data, fetchMore } = useQuery<GetUserGamesResponse>(GET_USER_GAMES, {
		variables: {
			page: 1,
			limit: ITEMS_PER_PAGE,
			search: debouncedSearch || null,
		},
		notifyOnNetworkStatusChange: true,
	});

	// Handle initial data load in useEffect to avoid state updates before mount
	useEffect(() => {
		if (loading) return;

		const result = data?.getUserGames?.data as UserGamesResult | null;

		if (result && Array.isArray(result.games)) {
			setAllGames(result.games);
			setTotalGames(result.total ?? result.games.length);
			setPage(result.page ?? 1);
			const totalPages = result.pages ?? 1;
			setHasMore(result.page < totalPages);
		} else {
			setAllGames([]);
			setTotalGames(0);
			setHasMore(false);
		}
	}, [data, loading]);

	const fetchNextPage = useCallback(async () => {
		if (isFetchingMore || !hasMore || loading) return;

		setIsFetchingMore(true);
		try {
			const nextPage = page + 1;
			const { data: newData } = await fetchMore({
				variables: {
					page: nextPage,
					limit: ITEMS_PER_PAGE,
					search: debouncedSearch || null,
				},
			});

			const result = newData?.getUserGames?.data as UserGamesResult | null;

			if (result && Array.isArray(result.games) && result.games.length > 0) {
				setAllGames((prev) => [...prev, ...result.games]);
				setPage(nextPage);
				const totalPages = result.pages ?? nextPage;
				setHasMore(nextPage < totalPages);
			} else {
				setHasMore(false);
			}
		} catch (err) {
			console.error('Error fetching more user games:', err);
		} finally {
			setIsFetchingMore(false);
		}
	}, [fetchMore, page, hasMore, isFetchingMore, loading, debouncedSearch]);

	return {
		games: allGames,
		totalGames: totalGames || allGames.length,
		loading,
		error: error as Error | undefined,
		hasMore,
		isFetchingMore,
		searchQuery,
		debouncedSearch,
		setSearchQuery,
		fetchNextPage,
	};
};

export default useUserGames;

