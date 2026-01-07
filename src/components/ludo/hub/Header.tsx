"use client";

import React from 'react';
import { Bell, Trophy, Wallet } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-[#1a1d2e]/95 backdrop-blur-md border-b border-white/5 px-4 py-3 md:px-8 md:py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Trophy className="text-white w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        BattleVault
                    </h1>
                </div>

                {/* Right Section: Stats & Profile */}
                <div className="flex items-center gap-3 md:gap-6">
                    {/* Balance - Hidden on small mobile */}
                    <div className="hidden md:flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-white/5">
                        <Wallet className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-bold text-sm">2,500</span>
                    </div>

                    {/* Notifications */}
                    <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
                        <Bell className="w-5 h-5 text-slate-300" />
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1a1d2e]" />
                    </button>

                    {/* Profile Avatar */}
                    <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-indigo-500/30 p-0.5 group-hover:border-indigo-500 transition-colors">
                                <div className="w-full h-full rounded-full bg-slate-700 overflow-hidden relative">
                                    {/* Placeholder Avatar */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                        PK
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#1a1d2e]" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
