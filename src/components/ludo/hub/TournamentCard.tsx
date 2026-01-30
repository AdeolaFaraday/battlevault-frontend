"use client";

import React from 'react';
import { Trophy, Clock, Users } from 'lucide-react';
import { safeFormat } from '../../../utils/date-utils';
import { Tournament } from '@/src/constants/game';
import { cn } from '../../../lib/utils';
import { useRegisterForTournament } from '@/src/hooks/ludo/useRegisterForTournament';
import { useTournamentRegistration } from '@/src/hooks/ludo/useTournamentRegistration';
import { useAppSelector } from '@/src/lib/redux/hooks';
import { RootState } from '@/src/lib/redux/store';
import { Loader2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface TournamentCardProps {
    tournament: Tournament;
    variant?: 'full' | 'compact';
    className?: string;
}

const TournamentCard = ({ tournament, variant = 'compact', className }: TournamentCardProps) => {
    const { register, loading: registering } = useRegisterForTournament();
    const { isRegistered: isRegisteredFromAPI, loading: checkingRegistration, refetch } = useTournamentRegistration(tournament._id);
    const currentUser = useAppSelector((state: RootState) => state.auth.loggedInUserDetails);

    // Prefer API status if available, fallback to local registeredUsers list
    const isRegistered = React.useMemo(() => {
        if (isRegisteredFromAPI) return true;
        if (!currentUser || !tournament.registeredUsers) return false;
        return tournament.registeredUsers.some(user => user._id === currentUser._id);
    }, [currentUser, tournament.registeredUsers, isRegisteredFromAPI]);

    // Prize pool formatting
    const formattedPrize = typeof tournament.prize === 'number'
        ? `₦${tournament.prize.toLocaleString()}`
        : tournament.prize;

    const handleRegister = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isRegistered || registering) return;
        await register(tournament._id);
        // Refetch registration status after successful registration
        if (refetch) await refetch();
    };

    if (variant === 'full') {
        const isLive = tournament.status?.toUpperCase() === 'LIVE';

        return (
            <div className={cn("w-full bg-gradient-to-r from-amber-900/40 to-orange-900/40 border border-amber-500/20 rounded-2xl p-5 md:p-6 relative overflow-hidden group shrink-0", className)}>
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Trophy size={120} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                                isLive ? "bg-emerald-500 text-white animate-pulse" : "bg-amber-500 text-black"
                            )}>
                                {isLive ? 'LIVE NOW' : tournament.status || 'Upcoming'}
                            </span>
                            {tournament.frequency && (
                                <span className="text-amber-200/60 text-xs font-medium">{tournament.frequency}</span>
                            )}
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-amber-100 leading-none mb-1">
                                {tournament.title}
                            </h4>
                            <p className="text-amber-200/60 text-sm line-clamp-2 max-w-[500px]">
                                {tournament.description || "Compete for the ultimate glory!"}
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-amber-500/20">
                            <span className="text-amber-400 text-sm font-bold">Prize Pool:</span>
                            <span className="text-white font-black">{formattedPrize}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[200px]">
                        <div className="flex items-center justify-center bg-black/20 rounded-lg p-3 border border-white/5">
                            <div className="flex flex-col items-center">
                                <span className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <Clock size={16} className="text-amber-400" />
                                    {safeFormat(+tournament.startDate, 'MMM d, h:mm a')}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={handleRegister}
                                disabled={registering || isRegistered || checkingRegistration}
                                className={cn(
                                    "py-3 text-white font-bold rounded-xl shadow-lg transition-all text-[10px] uppercase tracking-widest active:scale-95 flex items-center justify-center gap-2",
                                    isRegistered
                                        ? "bg-emerald-600 cursor-default"
                                        : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-orange-500/20",
                                    (registering || checkingRegistration) && "opacity-80 cursor-not-allowed"
                                )}
                            >
                                {registering && <Loader2 size={14} className="animate-spin" />}
                                {isRegistered ? 'Registered' : registering ? 'Joining...' : 'Register'}
                            </button>

                            <Link
                                href={`/ludo-hub/tournament/${tournament._id}/bracket`}
                                className="py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all text-[10px] uppercase tracking-widest active:scale-95 flex items-center justify-center gap-2"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={14} />
                                Bracket
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("bg-[#24283b] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-colors shrink-0", className)}>
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
            <div className="flex items-center gap-2">
                <Link
                    href={`/ludo-hub/tournament/${tournament._id}/bracket`}
                    className="p-2 border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    title="View Bracket"
                    onClick={(e) => e.stopPropagation()}
                >
                    <ExternalLink size={16} />
                </Link>
                <button
                    onClick={handleRegister}
                    disabled={registering || isRegistered || checkingRegistration}
                    className={cn(
                        "px-4 py-2 border rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2",
                        isRegistered
                            ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10 cursor-default"
                            : "border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white",
                        (registering || checkingRegistration) && "opacity-80 cursor-not-allowed"
                    )}
                >
                    {(registering || checkingRegistration) && <Loader2 size={12} className="animate-spin" />}
                    {isRegistered ? 'Registered' : registering ? 'Joining...' : 'Register'}
                </button>
            </div>
        </div>
    );
};

export default TournamentCard;
