"use client";

import React from 'react';
import Header from './Header';
import ActiveGameCard from './ActiveGameCard';
import UpcomingGamesSection from './UpcomingGamesSection';
import TournamentsSection from './TournamentsSection';
import QuickActions from './QuickActions';
import Greeting from '../../common/greeting';
import DailyBlitzSection from './DailyBlitzSection';
import BottomNav from '../../common/bottom-nav';

const GameHubScreen = () => {
    return (
        <div className="min-h-screen bg-[#1a1d2e] font-sans pb-32 md:pb-12">
            <Header />

            <BottomNav />

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 space-y-8 md:space-y-12">

                {/* Welcome Greeting */}
                <section className="px-1">
                    <div className="text-white/90 text-2xl md:text-3xl font-bold">
                        <Greeting />
                    </div>
                </section>

                {/* Top Section: Active Game - Full Width */}
                <section>
                    <ActiveGameCard />
                </section>

                {/* Two Column Layout for Desktop */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">

                    {/* Left Column: Tournaments & Upcoming */}
                    <div className="flex-1 space-y-8 md:space-y-10 order-2 md:order-1">
                        <section>
                            <TournamentsSection />
                        </section>
                        <section>
                            <UpcomingGamesSection limit={5} />
                        </section>
                        {/* TODO: Daily Blitz (Coming soon) */}
                        <section>
                            <DailyBlitzSection />
                        </section>
                    </div>

                    {/* Right Column: Quick Actions (Sticky on Desktop) */}
                    <div className="w-full md:w-[380px] shrink-0 order-1 md:order-2">
                        <QuickActions />
                    </div>
                </div>

            </main>
        </div>
    );
};

export default GameHubScreen;
