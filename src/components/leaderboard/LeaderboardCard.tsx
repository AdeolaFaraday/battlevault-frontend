"use client";

import React from 'react';
import NextImage from 'next/image';
import { motion } from 'framer-motion';
import { Trophy, Zap, Crown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { LeaderboardCardType } from '../../constants/game';

interface LeaderboardCardProps extends LeaderboardCardType {
    rank: number;
    isCurrentUser?: boolean;
}

const LeaderboardCard = ({
    profileImage,
    name,
    subTitle,
    ringColor,
    points,
    rank,
    isCurrentUser
}: LeaderboardCardProps) => {
    const isTopThree = rank <= 3;

    // const rankColors = {
    //     1: "from-amber-400 to-yellow-600",
    //     2: "from-slate-300 to-slate-500",
    //     3: "from-orange-400 to-orange-700",
    //     default: "from-indigo-500/50 to-indigo-700/50"
    // };

    // const getRankColor = (r: number) => {
    //     if (r === 1) return rankColors[1];
    //     if (r === 2) return rankColors[2];
    //     if (r === 3) return rankColors[3];
    //     return rankColors.default;
    // };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: rank * 0.05 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className={cn(
                "relative flex items-center justify-between p-4 mb-3 rounded-2xl transition-all duration-300",
                "bg-[#24283b]/60 backdrop-blur-md border border-white/5",
                isCurrentUser && "border-indigo-500/50 bg-indigo-500/10 shadow-lg shadow-indigo-500/10",
                "hover:border-white/20 hover:bg-[#2a2e42]/80"
            )}
        >
            <div className="flex items-center gap-4">
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
                                src={profileImage}
                                alt={name}
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
                            {name}
                        </span>
                        {isCurrentUser && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-black uppercase tracking-widest">You</span>
                        )}
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                        {subTitle || "No streak info"}
                    </span>
                </div>
            </div>

            {/* Points Section */}
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 text-white font-black italic">
                        <Zap size={14} className="text-amber-500 fill-amber-500" />
                        {points.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Points</span>
                </div>
            </div>
        </motion.div>
    );
};

export default LeaderboardCard;
