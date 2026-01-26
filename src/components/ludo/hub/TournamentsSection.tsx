"use client";

import React from 'react';
import { Trophy, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_TOURNAMENTS } from '../../../graphql/game/queries';
import { TournamentFeaturedSkeleton, TournamentItemSkeleton } from './TournamentCardSkeleton';
import { Tournament } from '@/src/constants/game';
import TournamentCard from './TournamentCard';
import HorizontalScroll from '../../common/horizontal-scroll';

interface TournamentsSectionProps {
    layout?: 'list' | 'horizontal';
    limit?: number;
    showViewAll?: boolean;
}

const TournamentsSection = ({
    layout = 'list',
    limit = 5,
    showViewAll = true
}: TournamentsSectionProps) => {
    const { data, loading, error } = useQuery(GET_TOURNAMENTS);
    const router = useRouter();

    const title = (
        <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Live Tournaments
            </h3>
            {showViewAll && data?.getTournaments?.length > 1 && (
                <button
                    onClick={() => router.push('/arena')}
                    className="text-sm text-amber-400 font-medium hover:text-amber-300 transition-colors flex items-center gap-1"
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
                <TournamentFeaturedSkeleton />
                <TournamentItemSkeleton />
            </div>
        );
    }

    if (error || !data?.getTournaments || data.getTournaments.length === 0) {
        return (
            <div className="w-full space-y-4">
                {title}

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

    const tournaments = data.getTournaments.slice(0, limit);

    if (layout === 'horizontal') {
        return (
            <div className="w-full space-y-4">
                {title}
                <HorizontalScroll>
                    {tournaments.map((tournament: Tournament) => (
                        <TournamentCard
                            key={tournament._id}
                            tournament={tournament}
                            variant={tournament === data.getTournaments[0] ? 'full' : 'compact'}
                            className={tournament === data.getTournaments[0] ? 'w-[400px]' : 'w-[300px]'}
                        />
                    ))}
                </HorizontalScroll>
            </div>
        );
    }

    const featuredTournament = data.getTournaments[0];
    const otherTournaments = data.getTournaments.slice(1, limit);

    return (
        <div className="w-full space-y-4">
            {title}

            {/* Featured Tournament Card */}
            <TournamentCard tournament={featuredTournament} variant="full" />

            {/* Smaller Items */}
            {otherTournaments.map((tournament: Tournament) => (
                <TournamentCard key={tournament._id} tournament={tournament} variant="compact" />
            ))}
        </div>
    );
};

export default TournamentsSection;

