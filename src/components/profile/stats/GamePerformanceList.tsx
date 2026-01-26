"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Swords, Zap } from 'lucide-react';

const GamePerformanceList = () => {
    const gameStats = [
        { game: 'Ludo Classic', played: 64, wins: 45, winRate: '70%', icon: Trophy, color: 'text-amber-500' },
        { game: 'Ludo Speed', played: 38, wins: 24, winRate: '63%', icon: Zap, color: 'text-indigo-400' },
        { game: 'Ludo Blitz', played: 22, wins: 13, winRate: '59%', icon: Swords, color: 'text-red-400' },
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">Game Performance</h3>
            <div className="space-y-3">
                {gameStats.map((stat, index) => (
                    <motion.div
                        key={stat.game}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                        className="bg-[#24283b]/60 border border-white/5 rounded-3xl p-5 flex items-center justify-between group hover:bg-[#2a2e42]/80 transition-all backdrop-blur-md"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                                <stat.icon size={22} className={stat.color} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">{stat.game}</h4>
                                <p className="text-xs text-slate-500">{stat.played} Battles Played</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <span className="block text-white font-black italic">{stat.winRate}</span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Efficiency</span>
                            </div>
                            <div className="text-right min-w-[60px]">
                                <span className="block text-emerald-400 font-black italic">{stat.wins}W</span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Victories</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default GamePerformanceList;
