"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, History } from 'lucide-react';
import Header from '../components/ludo/hub/Header';
import BottomNav from '../components/common/bottom-nav';
import MatchHistoryStats from '../components/profile/match-history/MatchHistoryStats';
import MatchHistoryCard from '../components/profile/match-history/MatchHistoryCard';
import MatchHistoryFilter from '../components/profile/match-history/MatchHistoryFilter';

const MatchHistoryScreen = () => {
    const router = useRouter();

    const matches = [
        { game: 'Ludo Classic', result: 'win' as const, date: 'Oct 24, 2023', time: '14:20', stake: '₦1,000', earnings: '₦1,800', playerCount: 4 },
        { game: 'Ludo Speed', result: 'loss' as const, date: 'Oct 23, 2023', time: '09:15', stake: '₦500', earnings: '₦500', playerCount: 2 },
        { game: 'Ludo Classic', result: 'win' as const, date: 'Oct 22, 2023', time: '21:05', stake: '₦2,000', earnings: '₦3,600', playerCount: 4 },
        { game: 'Ludo Blitz', result: 'win' as const, date: 'Oct 21, 2023', time: '18:40', stake: '₦1,000', earnings: '₦1,800', playerCount: 4 },
        { game: 'Ludo Classic', result: 'loss' as const, date: 'Oct 20, 2023', time: '11:30', stake: '₦5,000', earnings: '₦5,000', playerCount: 4 },
    ];

    return (
        <div className="min-h-screen bg-[#1a1d2e] font-sans pb-32">
            <Header />
            <BottomNav />

            <main className="max-w-xl mx-auto px-4 py-8 space-y-8">
                {/* Navigation Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                            <History size={20} className="text-indigo-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Match History</h1>
                            <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Your battle legacy</p>
                        </div>
                    </div>
                </div>

                {/* Statistics Summary */}
                <MatchHistoryStats />

                {/* Search & Filter */}
                <MatchHistoryFilter />

                {/* Match List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Recent Battles</span>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{matches.length} Matches</span>
                    </div>

                    <div className="space-y-3">
                        {matches.map((match, index) => (
                            <MatchHistoryCard
                                key={index}
                                {...match}
                                delay={0.2 + (index * 0.05)}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-center pt-8">
                    <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">
                        Load More Battles
                    </button>
                </div>
            </main>
        </div>
    );
};

export default MatchHistoryScreen;
