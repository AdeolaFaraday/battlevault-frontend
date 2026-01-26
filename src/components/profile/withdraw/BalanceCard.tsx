"use client";

import React from 'react';
import { Wallet, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const BalanceCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group"
        >
            <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-md">
                            <Wallet size={20} className="text-white" />
                        </div>
                        <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">Available Balance</span>
                    </div>
                    <button className="text-white/40 hover:text-white transition-colors">
                        <Info size={18} />
                    </button>
                </div>

                <div className="space-y-1">
                    <h2 className="text-5xl font-black text-white italic tracking-tighter">₦45,250.00</h2>
                    <p className="text-indigo-200/60 text-[10px] font-bold uppercase tracking-widest">Withdrawals processed within 24hrs</p>
                </div>

                <div className="flex gap-4 pt-2">
                    <div className="px-4 py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">Active Bonus: ₦5,000</span>
                    </div>
                </div>
            </div>

            {/* Decorative background glass elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        </motion.div>
    );
};

export default BalanceCard;
