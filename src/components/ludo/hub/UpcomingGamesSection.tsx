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
}

const UpcomingGamesSection = ({
    layout = 'grid',
    limit = 4,
    showViewAll = true
}: UpcomingGamesSectionProps) => {
    const { data, loading, error } = useQuery(GET_UPCOMING_GAMES);
    const router = useRouter();

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

    if (loading) {
        return (
            <div className="w-full space-y-4">
                {title}
                <UpcomingGamesSkeleton />
            </div>
        );
    }

    const gameList = data?.getUpcomingGames?.data;
    const games = gameList && 'games' in gameList ? gameList.games : [];

    if (error || !games || games.length === 0) {
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

    const displayedGames = games.slice(0, limit);

    if (layout === 'horizontal') {
        return (
            <div className="w-full space-y-4">
                {title}
                <HorizontalScroll>
                    {displayedGames.map((game: Game) => (
                        <GameCard
                            key={game._id}
                            game={game}
                            onClick={() => router.push(`/ludo-lobby/${game._id}`)}
                            className="w-[280px]"
                        />
                    ))}
                </HorizontalScroll>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            {title}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedGames.map((game: Game) => (
                    <GameCard
                        key={game._id}
                        game={game}
                        onClick={() => router.push(`/ludo-lobby/${game._id}`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default UpcomingGamesSection;

