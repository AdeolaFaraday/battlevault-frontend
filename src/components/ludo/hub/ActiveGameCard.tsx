"use client";

import React from 'react';
import { Play, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ActiveGameCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-900" />

            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative p-5 md:p-8 flex flex-col md:flex-row items-center gap-6">

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
                                Ranked Match
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-medium text-indigo-200">
                                <Clock size={12} /> 2m ago
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                            vs. Player2
                        </h2>
                        <p className="text-indigo-200 font-medium">It&apos;s your turn!</p>
                    </div>

                    {/* Avatars tiny row */}
                    <div className="flex items-center justify-center md:justify-start -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-400 border-2 border-indigo-600 z-20" />
                        <div className="w-8 h-8 rounded-full bg-red-400 border-2 border-indigo-600 z-10" />
                    </div>
                </div>

                {/* Right: Action */}
                <div className="w-full md:w-auto mt-2 md:mt-0">
                    <button className="w-full md:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all group">
                        <span>Resume Game</span>
                        <Play size={20} className="fill-current group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ActiveGameCard;
