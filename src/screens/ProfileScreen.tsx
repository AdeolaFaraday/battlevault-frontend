"use client";

import React from 'react';
import {
    User,
    History,
    BarChart3,
    ArrowDownCircle,
    ArrowUpCircle,
    ShieldCheck,
    CheckCircle2,
    LogOut,
    Bell,
    Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';
import ProfileItem from '../components/profile/ProfileItem';
import Header from '../components/ludo/hub/Header';

const ProfileScreen = () => {
    // const router = useRouter();

    const menuItems = [
        { id: 'edit-profile', label: 'Edit Profile', icon: User, color: 'text-indigo-400' },
        { id: 'match-history', label: 'Match History', icon: History, color: 'text-indigo-400' },
        { id: 'stats', label: 'Win / Loss Stats', icon: BarChart3, color: 'text-indigo-400' },
        { id: 'withdraw', label: 'Withdraw', icon: ArrowUpCircle, color: 'text-indigo-400' },
        { id: 'deposit', label: 'Deposit', icon: ArrowDownCircle, color: 'text-indigo-400' },
    ];

    const secondaryItems = [
        { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-indigo-400' },
        { id: 'security', label: 'Security', icon: ShieldCheck, color: 'text-indigo-400' },
    ];

    return (
        <div className="min-h-screen bg-[#1a1d2e] font-sans pb-32">
            <Header />

            <main className="max-w-xl mx-auto px-4 py-8 space-y-8">
                {/* User Profile Header */}
                <section className="flex flex-col items-center space-y-6 pt-4">
                    <div className="relative">
                        <div className="w-28 h-28 rounded-full p-1.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl transition-transform duration-500 hover:scale-105">
                            <div className="w-full h-full rounded-full bg-[#24283b] flex items-center justify-center overflow-hidden border-4 border-[#1a1d2e]">
                                <User size={56} className="text-white opacity-60" />
                            </div>
                        </div>
                        {/* Verified Badge - Tucked in Bottom Left */}
                        <div style={{ bottom: '4px', right: '4px' }} className="absolute w-9 h-9 rounded-full bg-emerald-500 border-4 border-[#1a1d2e] flex items-center justify-center shadow-xl z-20 transition-transform duration-300 hover:scale-110">
                            <CheckCircle2 size={20} className="text-white fill-emerald-500" strokeWidth={3} />
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">John Doe</h1>
                        <p className="text-indigo-300 font-black uppercase tracking-[0.2em] text-[11px] mt-2 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">Elite Vanguard • Level 24</p>
                    </div>

                    {/* Wallet Quick View */}
                    <div className="w-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-white/90 text-[10px] font-black uppercase tracking-widest block mb-1">Total Balance</span>
                                <h2 className="text-3xl font-black text-white italic">₦45,250.00</h2>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-md">
                                <Wallet size={24} className="text-white" />
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -left-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <Wallet size={120} className="text-white" />
                        </div>
                    </div>
                </section>

                {/* Account Actions */}
                <section className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 mb-2">Account Actions</h3>
                    <div className="space-y-3">
                        {menuItems.map((item) => (
                            <ProfileItem
                                key={item.id}
                                icon={item.icon}
                                label={item.label}
                                iconColor={item.color}
                                onClick={() => console.log(`Navigating to ${item.id}`)}
                            />
                        ))}
                    </div>
                </section>

                {/* Settings & Security */}
                <section className="space-y-3">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 mb-2">Preferences</h3>
                    {secondaryItems.map((item) => (
                        <ProfileItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            iconColor={item.color}
                        />
                    ))}

                    <motion.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                                <LogOut size={20} className="text-red-400" />
                            </div>
                            <span className="font-bold text-red-400 group-hover:text-red-300 transition-colors">Sign Out</span>
                        </div>
                    </motion.button>
                </section>

                <div className="text-center pb-8">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">BattleVault v1.0.4</p>
                </div>
            </main>
        </div>
    );
};

export default ProfileScreen;
