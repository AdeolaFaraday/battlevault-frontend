"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Wallet, LogOut, User as UserIcon, Settings, LogIn } from 'lucide-react';
import LogoIcon from '@/src/components/common/icons/Logo';
import DropdownMenuItem from '@/src/components/common/dropdown/DropdownMenuItem';
import { useAppSelector } from '@/src/lib/redux/hooks';
import { RootState } from '@/src/lib/redux/store';
import { useLogout } from '@/src/hooks/auth/useLogout';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Header = () => {
    const currentUser = useAppSelector((state: RootState) => state.auth.loggedInUserDetails);
    const { withdrawable, currency } = useAppSelector((state: RootState) => state.wallet);
    const { logout } = useLogout();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isAuthenticated = !!currentUser;

    const formatCurrency = (amount: number) => {
        const symbol = currency === 'NGN' ? '₦' : currency || '₦';
        return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="sticky top-0 z-50 bg-[#1a1d2e]/95 backdrop-blur-md border-b border-white/5 px-4 py-3 md:px-8 md:py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
                    <LogoIcon width={40} height={40} className="fill-white" color="white" />
                    <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        BattleVault
                    </h1>
                </div>

                {/* Right Section: Stats & Profile */}
                <div className="flex items-center gap-3 md:gap-6">
                    {/* Balance - Hidden on small mobile */}
                    <div className="hidden md:flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-white/5">
                        <Wallet className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-bold text-sm">{formatCurrency(withdrawable)}</span>
                    </div>

                    {/* Notifications */}
                    <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
                        <Bell className="w-5 h-5 text-slate-300" />
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1a1d2e]" />
                    </button>

                    {/* Profile Avatar with Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={toggleDropdown}
                        >
                            <div className="relative">
                                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-indigo-500/30 p-0.5 group-hover:border-indigo-500 transition-colors">
                                    <div className="w-full h-full rounded-full bg-slate-700 overflow-hidden relative flex items-center justify-center">
                                        {currentUser?.avatar ? (
                                            <img
                                                src={currentUser.avatar}
                                                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white uppercase">
                                                {`${currentUser?.firstName?.charAt(0) || 'B'}${currentUser?.lastName?.charAt(0) || 'V'}`}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#1a1d2e]" />
                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full mt-2 w-64 bg-[#24283b] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                                >
                                    {isAuthenticated ? (
                                        <>
                                            <div className="p-4 border-b border-white/5">
                                                <p className="text-white font-bold truncate">
                                                    {currentUser?.firstName} {currentUser?.lastName}
                                                </p>
                                                <p className="text-xs text-slate-400 truncate">
                                                    {currentUser?.email}
                                                </p>
                                            </div>
                                            <div className="p-2 space-y-1">
                                                <DropdownMenuItem icon={UserIcon} onClick={() => router.push('/profile')} label="Profile" />
                                                <DropdownMenuItem icon={Settings} label="Settings" />
                                                <div className="h-px bg-white/5 my-1" />
                                                <DropdownMenuItem
                                                    icon={LogOut}
                                                    label="Logout"
                                                    variant="danger"
                                                    onClick={logout}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="p-2">
                                            <DropdownMenuItem
                                                icon={LogIn}
                                                label="Login"
                                                onClick={() => router.push('/signin')}
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
