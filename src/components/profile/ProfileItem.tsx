"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ProfileItemProps {
    icon: React.ElementType;
    label: string;
    onClick?: () => void;
    className?: string;
    iconColor?: string;
}

const ProfileItem = ({
    icon: Icon,
    label,
    onClick,
    className,
    iconColor = "text-indigo-400"
}: ProfileItemProps) => {
    return (
        <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300",
                "bg-[#24283b]/40 backdrop-blur-md border border-white/5",
                "hover:bg-[#24283b]/80 hover:border-white/10 group",
                className
            )}
        >
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                    "bg-white/10 border border-white/5"
                )}>
                    <Icon size={22} className={cn(iconColor, "filter drop-shadow-sm")} />
                </div>
                <span className="font-bold text-slate-200 group-hover:text-white transition-colors">
                    {label}
                </span>
            </div>

            <ChevronRight
                size={18}
                className="text-slate-600 group-hover:text-slate-400 transition-colors"
            />
        </motion.button>
    );
};

export default ProfileItem;
