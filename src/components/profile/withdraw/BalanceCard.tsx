"use client";

import React from 'react';
import { Wallet, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/src/lib/redux/hooks';
import { RootState } from '@/src/lib/redux/store';

const BalanceCard = () => {
    const { withdrawable, pending, currency } = useAppSelector((state: RootState) => state.wallet);

    const formatCurrency = (amount: number) => {
        const symbol = currency === 'NGN' ? '₦' : currency || '₦';
        return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden group"
        >
            <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-md">
                            <Wallet size={18} className="text-white" />
                        </div>
                        <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">Available Balance</span>
                    </div>
                    <button className="text-white/40 hover:text-white transition-colors">
                        <Info size={16} />
                    </button>
                </div>

                <div className="space-y-1">
                    <h2 className="text-4xl font-black text-white italic tracking-tighter">{formatCurrency(withdrawable)}</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">Pending:</span>
                            <span className="text-yellow-400 text-sm font-bold">{formatCurrency(pending)}</span>
                        </div>
                    </div>
                </div>

                <p className="text-indigo-200/50 text-[9px] font-bold uppercase tracking-widest">
                    Withdrawals processed within 24hrs
                </p>
            </div>

            {/* Decorative background glass elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        </motion.div>
    );
};

export default BalanceCard;

