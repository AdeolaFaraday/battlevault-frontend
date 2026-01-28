"use client";

import React from 'react';
import NextImage from 'next/image';
import { Search, Award, Crown, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../components/ludo/hub/Header';
import BottomNav from '../components/common/bottom-nav';
import LeaderboardCard from '../components/leaderboard/LeaderboardCard';
import LeaderboardSkeleton from '../components/leaderboard/LeaderboardSkeleton';
import { cn } from '../lib/utils';
import { LeaderboardPlayer } from '../types/leaderboard.d';
import { useAppSelector } from '../lib/redux/hooks';
import { RootState } from '../lib/redux/store';
import { useLeaderboard } from '../hooks/leaderboard/useLeaderboard';

const LeaderboardScreen = () => {
    const router = useRouter();
    const currentUser = useAppSelector((state: RootState) => state.auth.loggedInUserDetails);

    const {
        players,
        totalPlayers,
        loading,
        error,
        hasMore,
        isFetchingMore,
        searchQuery,
        debouncedSearch,
        setSearchQuery,
        fetchNextPage
    } = useLeaderboard();


    const topThree = players.slice(0, 3);

    return (
        <div className="min-h-screen bg-[#1a1d2e] font-sans pb-32">
            <Header />

            <BottomNav />

            <main className="max-w-xl mx-auto px-4 py-8 space-y-8">
                {/* Header Section */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/')}
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Champions</h1>
                    </div>
                    <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20">
                        <Crown size={24} className="text-amber-500" />
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative group">
                    <div
                        className="absolute flex items-center pointer-events-none z-20"
                        style={{
                            left: '1.25rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            marginTop: '1px'
                        }}
                    >
                        <Search size={22} className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search champions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ paddingLeft: '3.5rem' }}
                        className="block w-full pr-4 py-4 bg-[#24283b]/60 border border-white/5 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-[#24283b] transition-all backdrop-blur-md"
                    />
                </div>

                {/* Loading State */}
                {loading && players.length === 0 && (
                    <LeaderboardSkeleton count={5} />
                )}

                {/* Error State */}
                {error && !loading && players.length === 0 && (
                    <div className="text-center py-20">
                        <Award size={48} className="mx-auto text-red-500/50 mb-4" />
                        <p className="text-slate-500 font-bold">Failed to load leaderboard</p>
                        <p className="text-slate-600 text-sm mt-2">{error.message}</p>
                    </div>
                )}

                {/* Empty State - No players yet */}
                {!loading && !error && players.length === 0 && !debouncedSearch && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Crown size={40} className="text-indigo-400" />
                        </div>
                        <p className="text-white font-bold text-lg mb-2">No Champions Yet</p>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto">
                            Be the first to climb the ranks and claim your spot on the leaderboard!
                        </p>
                    </motion.div>
                )}

                {/* Podium Layout for Top 3 (Only show if search is empty and enough results) */}
                {!loading && !debouncedSearch && players.length >= 3 && (
                    <div className="flex items-end justify-center gap-2 pt-8 pb-4">
                        {/* Rank 2 */}
                        <PodiumItem
                            player={topThree[1]}
                            rank={2}
                            height="h-32"
                            color="text-slate-400"
                            glow="shadow-slate-500/10"
                            animationDelay={0.1}
                        />
                        {/* Rank 1 */}
                        <PodiumItem
                            player={topThree[0]}
                            rank={1}
                            height="h-40"
                            color="text-amber-500"
                            glow="shadow-amber-500/20"
                            animationDelay={0}
                        />
                        {/* Rank 3 */}
                        <PodiumItem
                            player={topThree[2]}
                            rank={3}
                            height="h-28"
                            color="text-orange-500"
                            glow="shadow-orange-500/10"
                            animationDelay={0.2}
                        />
                    </div>
                )}

                {/* List Section */}
                {players.length > 0 && (
                    <div className="space-y-1">
                        <div className="flex items-center justify-between px-4 mb-4">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Ranking</span>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                {totalPlayers} Players
                            </span>
                        </div>

                        <InfiniteScroll
                            dataLength={players.length}
                            next={fetchNextPage}
                            hasMore={hasMore}
                            loader={
                                <div className="flex justify-center py-4">
                                    <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                                </div>
                            }
                            endMessage={
                                <div className="text-center py-4">
                                    <span className="text-slate-600 text-sm">You&apos;ve reached the end</span>
                                </div>
                            }
                            scrollThreshold={0.9}
                        >
                            <div className="relative">
                                <AnimatePresence mode="popLayout">
                                    {players.map((player, index) => (
                                        // Skip top 3 in list if they are in podium and search is empty
                                        (!debouncedSearch && index < 3) ? null : (
                                            <LeaderboardCard
                                                key={player._id}
                                                player={player}
                                                rank={index + 1}
                                                isCurrentUser={player._id === currentUser?._id}
                                            />
                                        )
                                    ))}
                                </AnimatePresence>

                                {/* Empty State for Search */}
                                {!loading && players.length === 0 && debouncedSearch && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-20"
                                    >
                                        <Award size={48} className="mx-auto text-slate-700 mb-4" />
                                        <p className="text-slate-500 font-bold">No champions found with &quot;{debouncedSearch}&quot;</p>
                                    </motion.div>
                                )}
                            </div>
                        </InfiniteScroll>
                    </div>
                )}

                {/* Empty State for Search (when no players at all) */}
                {!loading && players.length === 0 && debouncedSearch && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <Award size={48} className="mx-auto text-slate-700 mb-4 text-amber-500" />
                        <p className="text-slate-500 font-bold">No champions found with &quot;{debouncedSearch}&quot;</p>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

interface PodiumItemProps {
    player: LeaderboardPlayer;
    rank: number;
    height: string;
    color: string;
    glow: string;
    animationDelay: number;
}

const PodiumItem = ({ player, rank, height, color, glow, animationDelay }: PodiumItemProps) => {
    const displayName = player.userName ||
        (player.firstName && player.lastName
            ? `${player.firstName} ${player.lastName}`
            : player.firstName || 'Anonymous');

    const avatarUrl = player.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
    const winPercentage = player.winPercentage !== undefined ? player.winPercentage.toFixed(1) : '0';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: animationDelay, type: "spring", stiffness: 100 }}
            className="flex flex-col items-center flex-1"
        >
            {/* Avatar Container */}
            <div className="relative mb-4 group">
                <div className={cn(
                    "rounded-full p-1 bg-gradient-to-b shadow-2xl transition-transform duration-500 group-hover:scale-110",
                    rank === 1 ? "from-amber-400 to-yellow-600 w-20 h-20" : "from-slate-700 to-slate-900 w-16 h-16",
                    glow
                )}>
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-900 relative">
                        <NextImage
                            src={avatarUrl}
                            alt={displayName}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Crown for Rank 1 */}
                {rank === 1 && (
                    <motion.div
                        animate={{ rotate: [12, 15, 12] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-6 -right-2"
                    >
                        <Crown className="w-8 h-8 text-amber-500 fill-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                    </motion.div>
                )}
            </div>

            {/* Podium Block */}
            <div className={cn(
                "w-full rounded-t-3xl flex flex-col items-center justify-between p-4 bg-gradient-to-b from-white/10 to-transparent border-t border-x border-white/5",
                height,
                rank === 1 && "from-white/20"
            )}>
                <div className="flex flex-col items-center">
                    <span className={cn("text-2xl font-black italic", color)}>{rank}</span>
                    <span className="text-[10px] font-black text-slate-300 uppercase truncate w-full text-center px-2">{displayName.split(' ')[0]}</span>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-white font-black text-xs italic">{winPercentage}%</span>
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Win Rate</span>
                </div>
            </div>
        </motion.div>
    );
};

export default LeaderboardScreen;
