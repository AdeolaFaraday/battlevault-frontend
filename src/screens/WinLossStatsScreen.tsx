"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { AppLayout } from '../components/common/layout';
import StatsOverview from '../components/profile/stats/StatsOverview';
import WinLossChart from '../components/profile/stats/WinLossChart';

const WinLossStatsScreen = () => {
    const router = useRouter();

    return (
        <AppLayout>
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
                        <BarChart3 size={20} className="text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Battle Stats</h1>
                        <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Analyze your performance</p>
                    </div>
                </div>
            </div>

            {/* Main Stats Ring Chart */}
            <WinLossChart />

            {/* Stats Grid Metrics */}
            <StatsOverview />

            <div className="text-center pt-8">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Stats updated 2 minutes ago</p>
            </div>
        </AppLayout>
    );
};

export default WinLossStatsScreen;
