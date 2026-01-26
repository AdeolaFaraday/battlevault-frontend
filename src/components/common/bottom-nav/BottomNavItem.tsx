"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface BottomNavItemProps {
    label: string;
    icon: LucideIcon;
    isActive: boolean;
    onClick: () => void;
    activeColor?: string;
}

const BottomNavItem = ({
    label,
    icon: Icon,
    isActive,
    onClick,
    activeColor = "#493D9E"
}: BottomNavItemProps) => {
    return (
        <button
            onClick={onClick}
            className="relative flex flex-col items-center justify-center py-2 px-1 min-w-[64px] transition-colors duration-200"
        >
            <div className="relative">
                {/* Active Background Glow */}
                {isActive && (
                    <motion.div
                        layoutId="active-glow"
                        className="absolute inset-0 blur-md rounded-full -m-2 opacity-50"
                        style={{ backgroundColor: activeColor }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}

                {/* Icon */}
                <motion.div
                    animate={{
                        scale: isActive ? 1.2 : 1,
                        y: isActive ? -4 : 0,
                        color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.5)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="relative z-10"
                >
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
            </div>

            {/* Label */}
            <motion.span
                animate={{
                    opacity: isActive ? 1 : 0.6,
                    scale: isActive ? 1.05 : 1,
                    color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.5)"
                }}
                className={cn(
                    "text-[10px] font-bold mt-1 uppercase tracking-wider relative z-10",
                    isActive ? "font-extrabold" : "font-medium"
                )}
            >
                {label}
            </motion.span>

            {/* Underline Indicator */}
            {isActive && (
                <motion.div
                    layoutId="active-indicator"
                    className="absolute bottom-0 h-1 w-6 rounded-t-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
        </button>
    );
};

export default BottomNavItem;
