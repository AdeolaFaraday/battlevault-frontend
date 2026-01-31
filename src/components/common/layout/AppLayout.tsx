"use client";

import React, { ReactNode } from 'react';
import Header from '../../ludo/hub/Header';
import BottomNav from '../bottom-nav';

interface AppLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
    showBottomNav?: boolean;
    className?: string;
}

const AppLayout = ({
    children,
    showHeader = true,
    showBottomNav = true,
    className = ''
}: AppLayoutProps) => {
    return (
        <div className="min-h-screen bg-[#1a1d2e] font-sans pb-32">
            {showHeader && <Header />}
            {showBottomNav && <BottomNav />}
            <div className="max-w-2xl mx-auto">
                <main className={`px-4 py-8 space-y-8 ${className}`}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
