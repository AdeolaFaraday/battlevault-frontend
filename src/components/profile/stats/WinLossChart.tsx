"use client";

import React from 'react';
import { motion } from 'framer-motion';

const WinLossChart = () => {
    const winRate = 72;
    const circumference = 2 * Math.PI * 40; // Assuming radius 40

    return (
        <div className="bg-[#24283b]/40 border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center backdrop-blur-md relative overflow-hidden group">
            <div className="relative w-48 h-48">
                {/* Background Ring */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-white/5"
                    />
                    {/* Win Ring */}
                    <motion.circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 80}
                        initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - winRate / 100) }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        strokeLinecap="round"
                        className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                    />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl font-black text-white italic"
                    >
                        {winRate}%
                    </motion.span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Win Rate</span>
                </div>
            </div>

            <div className="mt-8 flex gap-8">
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-black text-white italic">82</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Wins</span>
                </div>
                <div className="w-[1px] h-8 bg-white/5 self-center" />
                <div className="flex flex-col items-center">
                    <span className="text-2xl font-black text-white italic text-red-400">42</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Losses</span>
                </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
    );
};

export default WinLossChart;
