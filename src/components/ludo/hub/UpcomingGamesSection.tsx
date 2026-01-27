"use client";

import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_UPCOMING_GAMES } from '../../../graphql/game/queries';
import UpcomingGamesSkeleton from './UpcomingGamesSkeleton';
import { useRouter } from 'next/navigation';
import { Game } from '@/src/hooks/useGameSession';
import GameCard from './GameCard';
import HorizontalScroll from '../../common/horizontal-scroll';

interface UpcomingGamesSectionProps {
    layout?: 'grid' | 'horizontal';
    limit?: number;
    showViewAll?: boolean;
    enableInfiniteScroll?: boolean;
}

const UpcomingGamesSection = ({
    layout = 'grid',
    limit = 4,
    showViewAll = true,
    enableInfiniteScroll = false
}: UpcomingGamesSectionProps) => {
    const { data, loading, error, fetchMore } = useQuery(GET_UPCOMING_GAMES, {
        variables: { page: 1, limit },
        notifyOnNetworkStatusChange: true,
    });
    const [isFetchingMore, setIsFetchingMore] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);
    const [page, setPage] = React.useState(1);

    const router = useRouter();

    const handleFetchMore = async () => {
        if (!enableInfiniteScroll || isFetchingMore || !hasMore || loading) return;

        setIsFetchingMore(true);
        try {
            const nextPage = page + 1;
            const { data: newData } = await fetchMore({
                variables: {
                    page: nextPage,
                    limit,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    const prevGames = prev.getUpcomingGames?.data?.games || [];
                    const newGames = fetchMoreResult.getUpcomingGames?.data?.games || [];

                    if (newGames.length < limit) {
                        setHasMore(false);
                    }

                    return {
                        ...prev,
                        getUpcomingGames: {
                            ...prev.getUpcomingGames,
                            data: {
                                ...prev.getUpcomingGames.data,
                                games: [...prevGames, ...newGames],
                            },
                        },
                    };
                },
            });

            if (newData?.getUpcomingGames?.data?.games?.length > 0) {
                setPage(nextPage);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error fetching more games:", err);
        } finally {
            setIsFetchingMore(false);
        }
    };

    const title = (
        <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                Upcoming Games
            </h3>
            {showViewAll && data?.getUpcomingGames?.data?.games?.length > 2 && (
                <button
                    onClick={() => router.push('/arena')}
                    className="text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors flex items-center gap-1"
                >
                    View All <ArrowRight size={14} />
                </button>
            )}
        </div>
    );

    if (loading && !isFetchingMore) {
        return (
            <div className="w-full space-y-4">
                {title}
                <UpcomingGamesSkeleton />
            </div>
        );
    }

    const gameList = data?.getUpcomingGames?.data;
    const games = gameList && 'games' in gameList ? gameList.games : [];

    if ((error || !games || games.length === 0) && !isFetchingMore) {
        return (
            <div className="w-full space-y-4">
                {title}

                {/* Nice Default State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#24283b] border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-2 opacity-60">
                        <Calendar size={24} className="text-slate-500" />
                        <span className="text-sm font-medium text-slate-400">No scheduled games</span>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'horizontal') {
        return (
            <div className="w-full space-y-4">
                {title}
                <HorizontalScroll onReachEnd={handleFetchMore}>
                    {games.map((game: Game) => (
                        <GameCard
                            key={game._id}
                            game={game}
                            onClick={() => router.push(`/ludo-lobby/${game._id}`)}
                            className="w-[280px]"
                        />
                    ))}
                    {isFetchingMore && (
                        <div className="flex items-center justify-center w-[280px] h-full bg-white/5 rounded-xl animate-pulse">
                            <span className="text-slate-400 text-sm">Loading more...</span>
                        </div>
                    )}
                </HorizontalScroll>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            {title}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {games.map((game: Game) => (
                    <GameCard
                        key={game._id}
                        game={game}
                        onClick={() => router.push(`/ludo-lobby/${game._id}`)}
                    />
                ))}
                {isFetchingMore && (
                    <div className="col-span-full py-4 flex justify-center">
                        <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpcomingGamesSection;

