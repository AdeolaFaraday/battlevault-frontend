"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import UpcomingGamesSection from '../components/ludo/hub/UpcomingGamesSection';
import TournamentsSection from '../components/ludo/hub/TournamentsSection';
import Header from '../components/ludo/hub/Header';
import BottomNav from '../components/common/bottom-nav';

const ArenaScreen = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#1a1d2e] font-sans pb-32">
            <Header />

            <BottomNav />

            <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
                {/* Arena Header */}
                <div className="flex items-center gap-4 mb-4">
                    <button
                        onClick={() => router.back()}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">The Arena</h1>
                        <p className="text-slate-400 text-sm font-medium">Find your next battle</p>
                    </div>
                </div>

                {/* Upcoming Games Section - Horizontal Scroll */}
                <div className="mb-4">
                    <UpcomingGamesSection
                        layout="horizontal"
                        limit={10}
                        showViewAll={false}
                    />
                </div>

                {/* Live Tournaments Section - Horizontal Scroll */}
                <TournamentsSection
                    layout="horizontal"
                    limit={10}
                    showViewAll={false}
                />
            </main>
        </div>
    );
};

export default ArenaScreen;
