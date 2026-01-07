"use client";

import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

const UpcomingGamesSection = () => {
    // Mock Data
    const games = [
        { id: 1, name: "Friday Night Ludo", time: "20:00", day: "Today", players: "12/16" },
        { id: 2, name: "Weekend Warmup", time: "14:00", day: "Tomorrow", players: "4/8" },
    ];

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-400" />
                    Upcoming Games
                </h3>
                <button className="text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
                    View All
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {games.map((game) => (
                    <div key={game.id} className="bg-[#24283b] hover:bg-[#2a2e42] border border-white/5 rounded-xl p-4 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">
                                    {game.name}
                                </h4>
                                <div className="flex items-center gap-3 text-xs text-slate-400">
                                    <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded">
                                        {game.day}
                                    </span>
                                    <span>{game.time}</span>
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all text-slate-500">
                                <ChevronRight size={16} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                            <span>4-Player Classic</span>
                            <span>{game.players} Registered</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingGamesSection;
