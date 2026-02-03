"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';

interface LegalPageLayoutProps {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, lastUpdated, children }) => {
    // const router = useRouter();

    return (
        <div className="min-h-screen bg-[#1a1d2e] font-sans pb-32">
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/signin"
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-tight">{title}</h1>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Last Updated: {lastUpdated}</p>
                    </div>
                </div>

                {/* Content Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full bg-[#24283b]/60 border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm"
                >
                    {children}
                </motion.div>

                {/* Footer */}
                <div className="mt-8 text-center text-white/20 text-xs font-medium uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} Battlevault. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default LegalPageLayout;
