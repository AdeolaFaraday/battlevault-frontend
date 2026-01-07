"use client";

import React from 'react';
import { Trophy, Clock, Users } from 'lucide-react';

const TournamentsSection = () => {
    return (
        <div className="w-full space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 px-1">
                <Trophy className="w-5 h-5 text-amber-400" />
                Live Tournaments
            </h3>

            {/* Featured Tournament Card */}
            <div className="w-full bg-gradient-to-r from-amber-900/40 to-orange-900/40 border border-amber-500/20 rounded-2xl p-5 md:p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Trophy size={120} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-black">
                                Major Event
                            </span>
                            <span className="text-amber-200/60 text-xs font-medium">Weekly Series</span>
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-amber-100 leading-none mb-1">
                                Global Masters Cup
                            </h4>
                            <p className="text-amber-200/60 text-sm">
                                Compete for the ultimate glory!
                            </p>
                        </div>

                        {/* Prize Pool */}
                        <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-amber-500/20">
                            <span className="text-amber-400 text-sm font-bold">Prize Pool:</span>
                            <span className="text-white font-black">50,000 Gems</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[200px]">
                        {/* Countdown */}
                        <div className="flex items-center justify-between bg-black/20 rounded-lg p-2.5 border border-white/5">
                            <div className="flex flex-col items-center">
                                <span className="text-lg font-bold text-white font-mono">02</span>
                                <span className="text-[9px] uppercase text-slate-400">Days</span>
                            </div>
                            <span className="text-slate-500">:</span>
                            <div className="flex flex-col items-center">
                                <span className="text-lg font-bold text-white font-mono">14</span>
                                <span className="text-[9px] uppercase text-slate-400">Hrs</span>
                            </div>
                            <span className="text-slate-500">:</span>
                            <div className="flex flex-col items-center">
                                <span className="text-lg font-bold text-white font-mono">35</span>
                                <span className="text-[9px] uppercase text-slate-400">Min</span>
                            </div>
                        </div>

                        <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all text-sm uppercase tracking-wide">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Smaller Item */}
            <div className="bg-[#24283b] border border-white/5 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                        <Trophy size={20} />
                    </div>
                    <div>
                        <h5 className="font-bold text-slate-200">Blitz Daily</h5>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                                <Clock size={12} /> Starts in 45m
                            </span>
                            <span className="flex items-center gap-1">
                                <Users size={12} /> 120/200
                            </span>
                        </div>
                    </div>
                </div>
                <button className="px-4 py-2 border border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg text-sm font-bold transition-all">
                    View
                </button>
            </div>
        </div>
    );
};

export default TournamentsSection;
