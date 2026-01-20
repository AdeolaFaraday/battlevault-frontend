"use client";

import React from 'react';
import { Calendar, ChevronRight, ArrowRight } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_UPCOMING_GAMES } from '../../../graphql/game/queries';
import UpcomingGamesSkeleton from './UpcomingGamesSkeleton';
import { safeFormat } from '../../../utils/date-utils';
import { useRouter } from 'next/navigation';
import { Game } from '@/src/hooks/useGameSession';

const UpcomingGamesSection = () => {
    const { data, loading, error } = useQuery(GET_UPCOMING_GAMES);
    const router = useRouter();

    if (loading) {
        return (
            <div className="w-full space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-indigo-400" />
                        Upcoming Games
                    </h3>
                </div>
                <UpcomingGamesSkeleton />
            </div>
        );
    }

    if (error || !data?.getUpcomingGames || data.getUpcomingGames.length === 0) {
        return (
            <div className="w-full space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-indigo-400" />
                        Upcoming Games
                    </h3>
                </div>

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

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-400" />
                    Upcoming Games
                </h3>
                {data.getUpcomingGames.length > 2 && (
                    <button className="text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors flex items-center gap-1">
                        View All <ArrowRight size={14} />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.getUpcomingGames.slice(0, 4).map((game: Game) => (
                    <div
                        key={game.id}
                        className="bg-[#24283b] hover:bg-[#2a2e42] border border-white/5 rounded-xl p-4 transition-colors cursor-pointer group"
                        onClick={() => router.push(`/ludo-lobby/${game.id}`)}
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">
                                    Ludo Challenge
                                </h4>
                                <div className="flex items-center gap-3 text-xs text-slate-400">
                                    <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded">
                                        {safeFormat(game.createdAt, 'EEE')}
                                    </span>
                                    <span>{safeFormat(game.createdAt, 'h:mm a')}</span>
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all text-slate-500">
                                <ChevronRight size={16} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                            <span>4-Player Classic</span>
                            <span>{game.players.length}/4 Registered</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingGamesSection;

