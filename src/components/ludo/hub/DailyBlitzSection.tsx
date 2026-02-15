"use client";

import React from 'react';
import { Zap, ArrowRight, CheckCircle2, Trophy, Flame, Target, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { GET_DAILY_BLITZ } from '../../../graphql/game/queries';
import DailyBlitzSkeleton from './DailyBlitzSkeleton';

const DailyBlitzSection = () => {
    const { data, loading, error } = useQuery(GET_DAILY_BLITZ);


    if (loading) {
        return <DailyBlitzSkeleton />;
    }

    if (error || !data?.getDailyBlitz?.data) {
        return null; // Or handle error state
    }

    const blitzData = data.getDailyBlitz.data;

    const missions = [
        {
            id: 1,
            title: "Daily Check-in",
            description: "Log in to claim your daily bonus",
            reward: "50 Coins",
            progress: 1,
            total: 1,
            completed: !!blitzData.id, // If we have data, they logged in
            claimed: blitzData.loginRewardClaimed,
            icon: <Star className="w-5 h-5 text-yellow-500" />
        },
        {
            id: 2,
            title: "Win 1 Match",
            description: "Win any Ludo match today",
            reward: "100 Coins",
            progress: blitzData.winsToday >= 1 ? 1 : 0,
            total: 1,
            completed: blitzData.winsToday >= 1,
            claimed: blitzData.win1RewardClaimed,
            icon: <Trophy className="w-5 h-5 text-purple-500" />
        },
        {
            id: 3,
            title: "Win 3 Matches",
            description: "Succeed in 3 games today",
            reward: "300 Coins",
            progress: Math.min(blitzData.winsToday, 3),
            total: 3,
            completed: blitzData.winsToday >= 3,
            claimed: blitzData.win3RewardClaimed,
            icon: <Target className="w-5 h-5 text-blue-500" />
        }
    ];

    const nextReward = blitzData.nextReward;

    return (
        <section className="w-full space-y-4">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    Daily Blitz
                </h3>
                <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
                    <Flame size={14} className="text-orange-500 fill-orange-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">
                        {blitzData.winsToday} Wins Today
                    </span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full bg-gradient-to-br from-[#2d1b4e] via-[#1a1d2e] to-[#1a1d2e] border border-white/5 rounded-3xl p-6 overflow-hidden group shadow-2xl"
            >
                {/* Background Glows */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full group-hover:bg-purple-600/20 transition-all duration-700" />
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Streak & Main Action */}
                    <div className="lg:col-span-1 space-y-6 flex flex-col justify-center">
                        <div className="space-y-2">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Your Progress</h4>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-white">{nextReward?.percentage || 0}%</span>
                                <span className="text-xs text-slate-500 font-medium">to next reward</span>
                            </div>
                            <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${nextReward?.percentage?.toFixed(2) || 0}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                                />
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <p className="text-xs text-slate-400 mb-1">Next Reward</p>
                            <p className="text-lg font-black text-yellow-500 flex items-center gap-2">
                                <Star size={18} className="fill-yellow-500" />
                                {nextReward?.amount} {nextReward?.description}
                            </p>
                        </div>

                        <button className="w-full py-4 bg-white text-black font-black rounded-2xl text-sm uppercase tracking-wider hover:bg-yellow-500 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 group-button">
                            Complete Missions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Right: Missions List */}
                    <div className="lg:col-span-2 space-y-3">
                        {missions.map((mission, index) => (
                            <motion.div
                                key={mission.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative p-4 rounded-2xl border transition-all duration-300 ${mission.claimed
                                    ? 'bg-emerald-500/5 border-emerald-500/20'
                                    : 'bg-black/20 border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${mission.claimed ? 'bg-emerald-500/20' : 'bg-white/5'
                                        }`}>
                                        {mission.claimed ? <CheckCircle2 className="text-emerald-500" size={24} /> : mission.icon}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h5 className={`font-bold text-sm md:text-base truncate ${mission.claimed ? 'text-emerald-400' : 'text-white'}`}>
                                                {mission.title}
                                            </h5>
                                        </div>
                                        <p className="text-xs text-slate-500 truncate mb-2">{mission.description}</p>

                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${mission.claimed ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                                    style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                                                {mission.progress}/{mission.total}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20">
                                            {mission.reward}
                                        </span>

                                        {/* {mission.completed && !mission.claimed ? (
                                            <button className="px-4 py-2 bg-emerald-500 text-black text-[10px] font-black rounded-lg uppercase hover:bg-emerald-400 transition-colors">
                                                Claim
                                            </button>
                                        ) : mission.claimed ? (
                                            <div className="px-3 py-1 bg-emerald-500/10 rounded-lg">
                                                <span className="text-[10px] font-black text-emerald-500 uppercase">Claimed</span>
                                            </div>
                                        ) : null} */}

                                        {mission.claimed && (
                                            <div className="px-3 py-1 bg-emerald-500/10 rounded-lg">
                                                <span className="text-[10px] font-black text-emerald-500 uppercase">Claimed</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default DailyBlitzSection;

