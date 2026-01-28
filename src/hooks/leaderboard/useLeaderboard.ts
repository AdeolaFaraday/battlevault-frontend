import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LEADERBOARD } from '../../graphql/game/queries';
import { LeaderboardPlayer, GetLeaderboardResponse } from '../../types/leaderboard.d';

const ITEMS_PER_PAGE = 10;

export interface UseLeaderboardOptions {
    initialSearch?: string;
}

export interface UseLeaderboardReturn {
    players: LeaderboardPlayer[];
    totalPlayers: number;
    loading: boolean;
    error: Error | undefined;
    hasMore: boolean;
    isFetchingMore: boolean;
    searchQuery: string;
    debouncedSearch: string;
    setSearchQuery: (query: string) => void;
    fetchNextPage: () => Promise<void>;
}

export const useLeaderboard = (options: UseLeaderboardOptions = {}): UseLeaderboardReturn => {
    const { initialSearch = '' } = options;

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
    const [page, setPage] = useState(1);
    const [allPlayers, setAllPlayers] = useState<LeaderboardPlayer[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [totalPlayers, setTotalPlayers] = useState(0);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(1);
            setAllPlayers([]);
            setHasMore(true);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { loading, error, fetchMore } = useQuery<GetLeaderboardResponse>(GET_LEADERBOARD, {
        variables: {
            page: 1,
            limit: ITEMS_PER_PAGE,
            search: debouncedSearch || null
        },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            const result = data?.getLeaderboard?.data;
            if (result && 'players' in result) {
                setAllPlayers(result.players);
                setHasMore(result.hasMore);
                setPage(result.page);
                if ('total' in result) {
                    setTotalPlayers(result.total);
                }
            }
        }
    });

    // Fetch more handler
    const fetchNextPage = useCallback(async () => {
        if (isFetchingMore || !hasMore || loading) return;

        setIsFetchingMore(true);
        try {
            const nextPage = page + 1;
            const { data: newData } = await fetchMore({
                variables: {
                    page: nextPage,
                    limit: ITEMS_PER_PAGE,
                    search: debouncedSearch || null
                }
            });

            const result = newData?.getLeaderboard?.data;
            if (result && 'players' in result) {
                setAllPlayers(prev => [...prev, ...result.players]);
                setHasMore(result.hasMore);
                setPage(nextPage);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error fetching more leaderboard data:", err);
        } finally {
            setIsFetchingMore(false);
        }
    }, [fetchMore, page, hasMore, isFetchingMore, loading, debouncedSearch]);

    return {
        players: allPlayers,
        totalPlayers: totalPlayers || allPlayers.length,
        loading,
        error: error as Error | undefined,
        hasMore,
        isFetchingMore,
        searchQuery,
        debouncedSearch,
        setSearchQuery,
        fetchNextPage
    };
};

export default useLeaderboard;
