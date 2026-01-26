"use client";

import React from 'react';
import { TrendingUp, DollarSign, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsOverview = () => {
    const mainStats = [
        { label: 'Overall Win Rate', value: '72%', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        { label: 'Total Earnings', value: '₦125,400', icon: DollarSign, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
        { label: 'Current Streak', value: '5 Wins', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    ];

    return (
        <div className="grid grid-cols-3 gap-3">
            {mainStats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group overflow-hidden bg-[#24283b]/40 border border-white/5 rounded-3xl p-4 flex flex-col items-center text-center backdrop-blur-md"
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <div className={`${stat.bg} w-10 h-10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                            <stat.icon size={20} className={stat.color} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg md:text-xl font-black text-white italic">{stat.value}</h3>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label.split(' ').pop()}</p>
                        </div>
                    </div>

                    {/* Subtle background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
            ))}
        </div>
    );
};

export default StatsOverview;
