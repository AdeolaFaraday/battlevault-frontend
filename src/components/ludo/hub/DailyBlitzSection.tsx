"use client";

import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DailyBlitzSection = () => {
    // Mock data for the Daily Blitz
    const blitzData = {
        title: "Daily Blitz Royale",
        prize: "₦250,000",
        entryFee: "₦1,000",
        startTime: "8:00 PM",
        playersJoined: 245,
        maxPlayers: 500,
        description: "High stakes, 2x speed, winner takes all. The ultimate test of your Ludo skills."
    };

    return (
        <section className="w-full space-y-4">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    Daily Blitz
                </h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20 animate-pulse">
                    Live in 2h 14m
                </span>
            </div>

            <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative w-full bg-gradient-to-br from-[#2d1b4e] via-[#1a1d2e] to-[#1a1d2e] border border-purple-500/30 rounded-3xl p-6 overflow-hidden group shadow-2xl shadow-purple-900/20"
            >
                {/* Background Decorative Elements */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-600/10 blur-[80px] rounded-full group-hover:bg-purple-600/20 transition-all duration-700" />
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-600/10 blur-[80px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="space-y-4 max-w-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/20 group-hover:rotate-12 transition-transform duration-500">
                                <Zap size={24} className="text-black fill-black" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-white tracking-tight uppercase italic underline decoration-yellow-500/50 underline-offset-4">
                                    {blitzData.title}
                                </h4>
                                <p className="text-slate-400 text-sm font-medium mt-1">
                                    {blitzData.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 min-w-[120px]">
                                <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Prize Pool</span>
                                <span className="text-xl font-black text-white">{blitzData.prize}</span>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 min-w-[100px]">
                                <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Entry Fee</span>
                                <span className="text-xl font-black text-yellow-500">{blitzData.entryFee}</span>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 min-w-[100px]">
                                <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Starts At</span>
                                <span className="text-xl font-black text-blue-400">{blitzData.startTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 min-w-[240px]">
                        <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Capacity</span>
                                <span className="text-xs font-black text-white">{blitzData.playersJoined}/{blitzData.maxPlayers}</span>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                    style={{ width: `${(blitzData.playersJoined / blitzData.maxPlayers) * 100}%` }}
                                />
                            </div>
                        </div>

                        <button className="w-full py-4 bg-white text-black font-black rounded-2xl text-sm uppercase tracking-wider hover:bg-yellow-500 hover:text-black transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
                            Join the Blitz <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default DailyBlitzSection;
