"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface QuickAmountGridProps {
    onSelect: (amount: string) => void;
    selectedAmount: string;
}

const QuickAmountGrid = ({ onSelect, selectedAmount }: QuickAmountGridProps) => {
    const amounts = ['1000', '2500', '5000', '10000', '25000', '50000'];

    return (
        <div className="grid grid-cols-3 gap-3">
            {amounts.map((amount) => (
                <motion.button
                    key={amount}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect(amount)}
                    className={`py-4 rounded-2xl font-black italic transition-all border ${selectedAmount === amount
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]'
                            : 'bg-[#24283b]/60 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                        }`}
                >
                    <span className="text-xs mr-0.5">₦</span>
                    {parseInt(amount).toLocaleString()}
                </motion.button>
            ))}
        </div>
    );
};

export default QuickAmountGrid;
