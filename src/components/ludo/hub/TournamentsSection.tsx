"use client";

import React from 'react';
import { Trophy, Clock, Users, ArrowRight } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_TOURNAMENTS } from '../../../graphql/game/queries';
import { TournamentFeaturedSkeleton, TournamentItemSkeleton } from './TournamentCardSkeleton';
import { safeFormat } from '../../../utils/date-utils';
import { Tournament } from '@/src/constants/game';

const TournamentsSection = () => {
    const { data, loading, error } = useQuery(GET_TOURNAMENTS);

    if (loading) {
        return (
            <div className="w-full space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 px-1">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    Live Tournaments
                </h3>
                <TournamentFeaturedSkeleton />
                <TournamentItemSkeleton />
            </div>
        );
    }

    if (error || !data?.getTournaments || data.getTournaments.length === 0) {
        return (
            <div className="w-full space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 px-1">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    Live Tournaments
                </h3>

                {/* Nice Default State */}
                <div className="w-full bg-[#24283b] border border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-500">
                        <Trophy size={32} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-slate-300">No Active Tournaments</h4>
                        <p className="text-sm text-slate-500 max-w-[250px]">
                            Check back later for new events or create your own game to start playing!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const featuredTournament = data.getTournaments[0];
    const otherTournaments = data.getTournaments.slice(1);

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    Live Tournaments
                </h3>
                {data.getTournaments.length > 1 && (
                    <button className="text-sm text-amber-400 font-medium hover:text-amber-300 transition-colors flex items-center gap-1">
                        View All <ArrowRight size={14} />
                    </button>
                )}
            </div>

            {/* Featured Tournament Card */}
            <div className="w-full bg-gradient-to-r from-amber-900/40 to-orange-900/40 border border-amber-500/20 rounded-2xl p-5 md:p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Trophy size={120} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-black">
                                {featuredTournament.status === 'LIVE' ? 'LIVE NOW' : 'Upcoming Event'}
                            </span>
                            <span className="text-amber-200/60 text-xs font-medium">{featuredTournament.frequency}</span>
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-amber-100 leading-none mb-1">
                                {featuredTournament.title}
                            </h4>
                            <p className="text-amber-200/60 text-sm">
                                {featuredTournament.description || "Compete for the ultimate glory!"}
                            </p>
                        </div>

                        {/* Prize Pool */}
                        <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-amber-500/20">
                            <span className="text-amber-400 text-sm font-bold">Prize Pool:</span>
                            <span className="text-white font-black">{featuredTournament.prize}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[200px]">
                        {/* Status/Clock */}
                        <div className="flex items-center justify-center bg-black/20 rounded-lg p-3 border border-white/5">
                            <div className="flex flex-col items-center">
                                <span className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <Clock size={16} className="text-amber-400" />
                                    {safeFormat(featuredTournament.startDate, 'MMM d, h:mm a')}
                                </span>
                            </div>
                        </div>

                        <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all text-sm uppercase tracking-wide">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Smaller Items */}
            {otherTournaments.map((tournament: Tournament) => (
                <div key={tournament._id} className="bg-[#24283b] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                            <Trophy size={20} />
                        </div>
                        <div>
                            <h5 className="font-bold text-slate-200">{tournament.title}</h5>
                            <div className="flex items-center gap-3 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                    <Clock size={12} /> {safeFormat(tournament.startDate, 'h:mm a')}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users size={12} /> {tournament.registeredUsers?.length || 0}/{tournament.maxUsers}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="px-4 py-2 border border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg text-sm font-bold transition-all">
                        View
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TournamentsSection;

