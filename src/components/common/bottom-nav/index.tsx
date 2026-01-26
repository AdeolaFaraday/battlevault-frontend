"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Swords, Trophy, UserCircle } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import BottomNavItem from './BottomNavItem';
import './styles.css';

const navItems = [
    { id: 'play', label: 'Play', icon: Gamepad2, activeColor: '#493D9E', path: '/' },
    { id: 'arena', label: 'Arena', icon: Swords, activeColor: '#D72638', path: '/arena' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, activeColor: '#F9A602', path: '/leaderboard' },
    { id: 'profile', label: 'Profile', icon: UserCircle, activeColor: '#008F5A', path: '/profile' },
];

const BottomNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('play');

    useEffect(() => {
        const currentItem = navItems.find(item => item.path === pathname);
        if (currentItem) {
            setActiveTab(currentItem.id);
        }
    }, [pathname]);

    const handleNavigation = (id: string, path: string) => {
        setActiveTab(id);
        router.push(path);
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[min(90%,450px)]">
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative flex items-center justify-between px-4 py-2 bg-[#1a1d2e]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
            >
                {navItems.map((item) => (
                    <BottomNavItem
                        key={item.id}
                        label={item.label}
                        icon={item.icon}
                        isActive={activeTab === item.id}
                        onClick={() => handleNavigation(item.id, item.path)}
                        activeColor={item.activeColor}
                    />
                ))}

                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.nav>
        </div>
    );
};

export default BottomNav;
