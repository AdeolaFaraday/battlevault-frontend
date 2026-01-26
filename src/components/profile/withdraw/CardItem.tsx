"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface CardItemProps {
    id: string;
    bank: string;
    lastFour: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const CardItem = ({ id, bank, lastFour, isSelected, onSelect }: CardItemProps) => {
    return (
        <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(id)}
            className={cn(
                "w-full flex items-center justify-between p-5 rounded-3xl border transition-all duration-300 group",
                isSelected
                    ? "bg-indigo-500/10 border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.15)]"
                    : "bg-[#24283b]/60 border-white/5 hover:border-white/10 hover:bg-[#2a2e42]/80"
            )}
        >
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                    isSelected ? "bg-indigo-500 text-white" : "bg-white/5 text-slate-400 group-hover:text-white"
                )}>
                    <CreditCard size={24} />
                </div>
                <div className="text-left">
                    <p className="text-white font-bold">{bank}</p>
                    <p className="text-xs text-slate-500 font-medium">•••• •••• •••• {lastFour}</p>
                </div>
            </div>

            {isSelected && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <CheckCircle2 size={24} className="text-indigo-500 fill-indigo-500/20" />
                </motion.div>
            )}
        </motion.button>
    );
};

export default CardItem;
