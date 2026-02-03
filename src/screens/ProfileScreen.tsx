"use client";

import React from 'react';
import {
    User,
    History,
    BarChart3,
    CheckCircle2,
    LogOut,
    Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ProfileItem from '../components/profile/ProfileItem';
import { AppLayout } from '../components/common/layout';
import { useAppSelector } from '../lib/redux/hooks';
import { RootState } from '@/src/lib/redux/store';
import { useLogout } from '../hooks/auth/useLogout';
import useGetWallet from '../api/wallet/useGetWallet';
import { useEffect } from 'react';

const ProfileScreen = () => {
    const router = useRouter();

    const currentUser = useAppSelector((state: RootState) => state.auth.loggedInUserDetails);
    const { withdrawable, pending, currency } = useAppSelector((state: RootState) => state.wallet);
    const { logout } = useLogout();
    const { getWallet } = useGetWallet();

    useEffect(() => {
        if (currentUser) {
            getWallet();
        }
    }, [getWallet, currentUser]);

    const menuItems = [
        { id: 'edit-profile', label: 'Edit Profile', icon: User, color: 'text-indigo-400' },
        { id: 'match-history', label: 'Match History', icon: History, color: 'text-indigo-400' },
        { id: 'stats', label: 'Win / Loss Stats', icon: BarChart3, color: 'text-indigo-400' },
        { id: 'withdraw', label: 'Withdraw', icon: Wallet, color: 'text-indigo-400' },
    ];

    const handleMenuClick = (id: string) => {
        if (id === 'edit-profile') {
            router.push('/profile/edit');
        } else if (id === 'match-history') {
            router.push('/profile/match-history');
        } else if (id === 'stats') {
            router.push('/profile/stats');
        } else if (id === 'withdraw') {
            router.push('/profile/withdraw');
        } else if (id === 'deposit') {
            router.push('/profile/deposit');
        } else {
            console.log(`Navigating to ${id}`);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/signin');
    };

    const formatCurrency = (amount: number) => {
        const symbol = currency === 'NGN' ? '₦' : currency || '₦';
        return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <AppLayout>
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
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter">{currentUser?.firstName || ""} {currentUser?.lastName || ""}</h1>
                    <p className="text-indigo-300 font-black uppercase tracking-[0.2em] text-[11px] mt-2 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">{currentUser?.email || ""}</p>
                </div>

                {/* Wallet Quick View */}
                <div className="w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden group border border-white/5">
                    <div className="relative z-10 flex items-start justify-between">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <span className="text-white/50 text-[9px] font-black uppercase tracking-[0.2em] block">Available Funds</span>
                                <h2 className="text-4xl font-black text-emerald-400 italic tracking-tighter">{formatCurrency(withdrawable)}</h2>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="space-y-0.5">
                                    <span className="text-white/30 text-[8px] font-black uppercase tracking-widest block">Pending</span>
                                    <p className="text-sm font-bold" style={{ color: "#FFC107" }}>{formatCurrency(pending)}</p>
                                </div>
                                <div className="h-4 w-px bg-white/10" />
                                <div className="space-y-0.5">
                                    <span className="text-white/30 text-[8px] font-black uppercase tracking-widest block">Total</span>
                                    <p className="text-sm font-bold text-white/50">{formatCurrency(withdrawable + pending)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-md">
                            <Wallet size={24} className="text-emerald-400" />
                        </div>
                    </div>

                    {/* Background patterns */}
                    <div style={{ top: '-1rem', right: '-1rem' }} className="absolute opacity-[0.03] rotate-12 transition-transform duration-1000 group-hover:scale-110">
                        <Wallet size={180} className="text-white" />
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
                            onClick={() => handleMenuClick(item.id)}
                        />
                    ))}
                </div>
            </section>

            {/* Settings & Security */}
            <section className="space-y-3">
                <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
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
        </AppLayout>
    );
};

export default ProfileScreen;
