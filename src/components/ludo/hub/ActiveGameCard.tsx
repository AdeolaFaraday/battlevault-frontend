"use client";

import React from 'react';
import { Play, Clock, Dices, Gamepad2, Trophy, Ghost } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { GET_ACTIVE_GAMES } from '../../../graphql/game/queries';
import ActiveGameCardSkeleton from './ActiveGameCardSkeleton';
import ActiveGameCardEmptyState from './ActiveGameCardEmptyState';
import { useAppSelector } from '@/src/lib/redux/hooks';
import { RootState } from '@/src/lib/redux/store';
import { useRouter } from 'next/navigation';
import { safeFormat } from '../../../utils/date-utils';
import { LudoPlayer } from '@/src/types/ludo';

const ActiveGameCard = () => {
    const { data, loading } = useQuery(GET_ACTIVE_GAMES);
    const { loggedInUserDetails: currentUser, isUserLoggedIn } = useAppSelector((state: RootState) => state.auth);
    const router = useRouter();
    const isAuthenticated = isUserLoggedIn === true;

    if (loading) {
        return <ActiveGameCardSkeleton />;
    }

    const activeGame = data?.getActiveGames?.[0];

    // Empty state - No active games
    if (!activeGame) {
        return <ActiveGameCardEmptyState isAuthenticated={isAuthenticated} />;
    }

    // Active game exists - show game card
    const opponent = activeGame.players.find((p: LudoPlayer) => p.id !== currentUser?._id);
    const isMyTurn = activeGame.currentTurn === currentUser?._id;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl bg-[#0f111a] border border-white/10 shadow-2xl group/card"
        >
            {/* Slick Background Icons */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
                <Dices className="absolute top-4 left-6 rotate-12 text-white blur-[1px]" size={90} />
                <Gamepad2 className="absolute -bottom-10 right-14 -rotate-12 text-white" size={140} />
                <Trophy className="absolute top-1/2 left-1/3 -translate-y-1/2 rotate-[35deg] text-indigo-400" size={70} />
                <Ghost className="absolute top-4 right-1/4 -rotate-45 text-white/50" size={50} />
            </div>

            {/* Subtle Gradient Glow */}
            <div className="absolute -top-[20%] -right-[10%] w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none group-hover/card:bg-indigo-500/25 transition-colors duration-700" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 p-5 md:p-8 flex flex-col md:flex-row items-center gap-6">

                {/* Left: Board Preview */}
                <div className="relative shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-xl border border-white/20 shadow-2xl backdrop-blur-sm flex items-center justify-center relative overflow-hidden group">
                        {/* Simplified Board Art */}
                        <div className="absolute inset-2 grid grid-cols-2 gap-2 opacity-80">
                            <div className="bg-red-500/80 rounded-lg" />
                            <div className="bg-green-500/80 rounded-lg" />
                            <div className="bg-blue-500/80 rounded-lg" />
                            <div className="bg-yellow-500/80 rounded-lg" />
                        </div>
                        {/* Dice Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-slate-800 rounded-full" />
                                    <span className="w-2 h-2 bg-slate-800 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle: Info */}
                <div className="flex-1 text-center md:text-left space-y-3">
                    <div className="space-y-1">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/10">
                                {activeGame.status === 'playingDice' || activeGame.status === 'playingToken' ? 'In Progress' : 'Waiting'}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-medium text-indigo-200">
                                <Clock size={12} /> {safeFormat(activeGame.updatedAt, 'MMM d, h:mm a', 'Recently')}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                            vs. {opponent?.name || 'Opponent'}
                        </h2>
                        <p className="text-indigo-200 font-medium">
                            {isMyTurn ? "It's your turn!" : "Waiting for opponent..."}
                        </p>
                    </div>

                    {/* Avatars tiny row */}
                    <div className="flex items-center justify-center md:justify-start -space-x-2">
                        {activeGame.players.slice(0, 4).map((player: LudoPlayer, idx: number) => (
                            <div
                                key={player.id}
                                className={`w-8 h-8 rounded-full border-2 border-indigo-600 flex items-center justify-center text-xs font-bold text-white`}
                                style={{
                                    backgroundColor: player.color || '#6366f1',
                                    zIndex: 20 - idx
                                }}
                            >
                                {player.name?.charAt(0).toUpperCase()}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Action */}
                <div className="w-full md:w-auto mt-2 md:mt-0">
                    <button
                        onClick={() => router.push(`/ludo/${activeGame.id}`)}
                        className="w-full md:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all group"
                    >
                        <span>Resume Game</span>
                        <Play size={20} className="fill-current group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ActiveGameCard;
