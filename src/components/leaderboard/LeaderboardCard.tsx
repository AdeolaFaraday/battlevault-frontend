"use client";

import React from 'react';
import NextImage from 'next/image';
import { motion } from 'framer-motion';
import { Trophy, Crown, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { LeaderboardPlayer } from '../../types/leaderboard.d';

interface LeaderboardCardProps {
    player: LeaderboardPlayer;
    rank: number;
    isCurrentUser?: boolean;
}

const LeaderboardCard = ({
    player,
    rank,
    isCurrentUser
}: LeaderboardCardProps) => {
    const isTopThree = rank <= 3;

    // Generate display name from available fields
    const displayName = player.userName ||
        (player.firstName && player.lastName
            ? `${player.firstName} ${player.lastName}`
            : player.firstName || 'Anonymous');

    // Generate avatar fallback
    const avatarUrl = player.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;

    // Format win percentage
    const winPercentage = player.winPercentage !== undefined
        ? `${player.winPercentage.toFixed(1)}%`
        : '0%';

    // Generate subtitle from streak info
    const subtitle = player.currentStreak && player.currentStreak > 0
        ? `🔥 ${player.currentStreak} streak`
        : player.totalWins !== undefined
            ? `${player.totalWins} wins`
            : 'No games yet';

    // Determine ring color based on rank
    const getRingColor = () => {
        if (rank === 1) return '#FACC15'; // Gold
        if (rank === 2) return '#94A3B8'; // Silver
        if (rank === 3) return '#F97316'; // Bronze
        return '#6366F1'; // Default indigo
    };

    const ringColor = getRingColor();

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(rank * 0.03, 0.3) }}
            whileHover={{ scale: 1.02, x: 5 }}
            className={cn(
                "relative flex items-center justify-between p-4 sm:py-4 sm:px-2 mb-3 rounded-2xl transition-all duration-300",
                "bg-[#24283b]/60 backdrop-blur-md border border-white/5",
                isCurrentUser && "border-indigo-500/50 bg-indigo-500/10 shadow-lg shadow-indigo-500/10",
                "hover:border-white/20 hover:bg-[#2a2e42]/80"
            )}
        >
            <div className="flex items-center gap-2">
                {/* Rank Number */}
                <div className={cn(
                    "w-8 font-black text-sm text-center",
                    isTopThree ? "text-white" : "text-slate-500"
                )}>
                    {rank}
                </div>

                {/* Profile Image with Ring */}
                <div className="relative">
                    <div
                        className="w-12 h-12 rounded-full p-0.5"
                        style={{ background: isTopThree ? `linear-gradient(to bottom, ${ringColor}, #000)` : ringColor }}
                    >
                        <div className="w-full h-full rounded-full overflow-hidden bg-[#1a1d2e] relative">
                            <NextImage
                                src={avatarUrl}
                                alt={displayName}
                                width={48}
                                height={48}
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Top Rank Icons */}
                    {rank === 1 && <Crown className="absolute -top-3 -right-2 w-5 h-5 text-amber-500 fill-amber-500 rotate-12 drop-shadow-lg" />}
                    {isTopThree && rank !== 1 && <Trophy className={cn(
                        "absolute -top-2 -right-1 w-4 h-4 drop-shadow-lg",
                        rank === 2 ? "text-slate-300 fill-slate-300" : "text-orange-500 fill-orange-500"
                    )} />}
                </div>

                {/* User Info */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className={cn(
                            "font-bold text-slate-200 group-hover:text-white transition-colors",
                            isCurrentUser && "text-indigo-300"
                        )}>
                            {displayName?.length > 15 ? displayName?.substring(0, 15) + '...' : displayName}
                        </span>
                        {isCurrentUser && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-black uppercase tracking-widest">You</span>
                        )}
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                        {subtitle}
                    </span>
                </div>
            </div>

            {/* Win Rate Section */}
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 text-white font-black italic">
                        <TrendingUp size={14} className="text-emerald-500" />
                        {winPercentage}
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Win Rate</span>
                </div>
            </div>
        </motion.div>
    );
};

export default LeaderboardCard;
