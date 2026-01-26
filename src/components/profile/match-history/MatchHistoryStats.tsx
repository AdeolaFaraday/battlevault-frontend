"use client";

import React from 'react';
import { Trophy, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const MatchHistoryStats = () => {
    const stats = [
        { label: 'Total Played', value: '124', icon: Target, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
        { label: 'Total Wins', value: '82', icon: Trophy, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        { label: 'Win Rate', value: '66%', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    ];

    return (
        <div className="grid grid-cols-3 gap-3 md:gap-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#24283b]/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center backdrop-blur-md"
                >
                    <div className={`${stat.bg} p-2 rounded-xl mb-3`}>
                        <stat.icon size={20} className={stat.color} />
                    </div>
                    <span className="text-white font-black text-lg md:text-xl italic">{stat.value}</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</span>
                </motion.div>
            ))}
        </div>
    );
};

export default MatchHistoryStats;
