"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Wallet, LogOut, User as UserIcon, Settings, LogIn, MessageSquare } from 'lucide-react';
import LogoIcon from '@/src/components/common/icons/Logo';
import DropdownMenuItem from '@/src/components/common/dropdown/DropdownMenuItem';
import { useAppSelector } from '@/src/lib/redux/hooks';
import { RootState } from '@/src/lib/redux/store';
import { useLogout } from '@/src/hooks/auth/useLogout';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_WALLET_QUERY } from '@/src/graphql/wallet/queries';
import { useGetChatList } from '@/src/api/chat/useGetChatList';
import { useChatUnreadCounts } from '@/src/hooks/chat/useChatUnreadCounts';

const Header = () => {
    const currentUser = useAppSelector((state: RootState) => state.auth.loggedInUserDetails);
    const { logout } = useLogout();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isBellOpen, setIsBellOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const bellRef = useRef<HTMLDivElement>(null);
    const isAuthenticated = !!currentUser;

    const { data: walletData } = useQuery(GET_WALLET_QUERY, {
        skip: !isAuthenticated,
        fetchPolicy: 'cache-and-network'
    });

    const withdrawable = walletData?.getWallet?.data?.withdrawable ?? 0;
    const currency = walletData?.getWallet?.data?.currency ?? 'NGN';

    const { chats } = useGetChatList();

    // Real-time unread counts from Firestore
    const chatIds = chats.map(c => c.id);
    const rtUnreadCounts = useChatUnreadCounts(chatIds, currentUser?._id);

    const unreadCount = Object.values(rtUnreadCounts).reduce((total, count) => total + count, 0);

    // Chats that currently have unread messages
    const unreadChats = chats.filter(c => (rtUnreadCounts[c.id] ?? 0) > 0);

    const formatCurrency = (amount: number) => {
        const symbol = currency === 'NGN' ? '₦' : currency || '₦';
        return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
                setIsBellOpen(false);
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
                    {isAuthenticated && (
                        <>
                            {/* Balance - Hidden on small mobile */}
                            <div className="hidden md:flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-white/5">
                                <Wallet className="w-4 h-4 text-emerald-400" />
                                <span className="text-emerald-400 font-bold text-sm">{formatCurrency(withdrawable)}</span>
                            </div>

                            {/* Messages/Chat */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push('/chat')}
                                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-indigo-500/10 transition-colors group"
                            >
                                <MessageSquare className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                                {unreadCount > 0 && (
                                    <>
                                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border border-[#1a1d2e] z-10" />
                                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-400 rounded-full animate-ping opacity-75" />
                                        <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-indigo-500/30 blur-sm -translate-x-1/2 -translate-y-1/2 left-2/3 top-1/3" />
                                    </>
                                )}
                            </motion.button>

                            {/* Notifications Bell */}
                            <div className="relative" ref={bellRef}>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsBellOpen(prev => !prev)}
                                    className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500/10 transition-colors group"
                                >
                                    <Bell className="w-5 h-5 text-slate-300 group-hover:text-red-400 transition-colors" />
                                    {unreadCount > 0 && (
                                        <>
                                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#1a1d2e] z-10" />
                                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-75" />
                                        </>
                                    )}
                                </motion.button>

                                {/* Bell Dropdown */}
                                <AnimatePresence>
                                    {isBellOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 top-full mt-2 w-80 bg-[#24283b] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                                        >
                                            <div className="p-3 border-b border-white/5 flex items-center justify-between">
                                                <p className="text-white font-semibold text-sm">Notifications</p>
                                                {unreadCount > 0 && (
                                                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-medium">
                                                        {unreadCount} unread
                                                    </span>
                                                )}
                                            </div>

                                            {unreadChats.length === 0 ? (
                                                <div className="p-6 text-center">
                                                    <Bell className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                                                    <p className="text-slate-500 text-sm">No new notifications</p>
                                                </div>
                                            ) : (
                                                <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                                                    {unreadChats.map(chat => {
                                                        const other = chat.participantDetails?.find(
                                                            p => p.id !== currentUser?._id
                                                        );
                                                        const name = other
                                                            ? `${other.firstName} ${other.lastName}`.trim()
                                                            : 'Unknown';
                                                        const count = rtUnreadCounts[chat.id] ?? 0;
                                                        return (
                                                            <button
                                                                key={chat.id}
                                                                onClick={() => {
                                                                    setIsBellOpen(false);
                                                                    router.push('/chat');
                                                                }}
                                                                className="w-full flex items-start gap-3 p-3 hover:bg-white/5 transition-colors text-left"
                                                            >
                                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white uppercase">
                                                                    {name.charAt(0)}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-white text-sm font-medium truncate">{name}</p>
                                                                    <p className="text-slate-400 text-xs truncate mt-0.5">{chat.lastMessage || 'New message'}</p>
                                                                </div>
                                                                <span className="text-xs bg-red-500 text-white rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center font-bold">
                                                                    {count > 9 ? '9+' : count}
                                                                </span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            <div className="p-2 border-t border-white/5">
                                                <button
                                                    onClick={() => { setIsBellOpen(false); router.push('/chat'); }}
                                                    className="w-full text-center text-xs text-indigo-400 hover:text-indigo-300 py-1.5 transition-colors"
                                                >
                                                    View all messages
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    )}

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
