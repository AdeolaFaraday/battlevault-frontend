"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpCircle, CheckCircle2, ChevronRight } from 'lucide-react';

const WithdrawForm = () => {
    const [amount, setAmount] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = () => {
        if (!amount) return;
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="space-y-8 relative">
            {/* Amount Input */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Withdrawal Amount</label>
                    <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300">Use Max</button>
                </div>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <span className="text-3xl font-black text-indigo-500 group-focus-within:scale-110 transition-transform italic">₦</span>
                    </div>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-16 pr-6 py-8 bg-[#24283b]/60 border border-white/5 rounded-[2rem] text-4xl font-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-[#2a2e42] transition-all placeholder-white/5 italic"
                    />
                </div>
            </div>

            {/* Withdraw Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isSaving || !amount}
                style={{
                    background: 'linear-gradient(to right, #4f46e5, #9333ea)',
                    boxShadow: '0 10px 30px rgba(79, 70, 229, 0.4)',
                }}
                className="w-full py-6 rounded-[1.5rem] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden transition-all"
            >
                <AnimatePresence mode="wait">
                    {isSaving ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        />
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3"
                        >
                            <ArrowUpCircle size={24} className="text-white group-hover:-translate-y-1 transition-transform" />
                            <span className="text-white font-black uppercase tracking-wider text-lg">Initiate Withdrawal</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Gloss effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.button>

            {/* Success Animation overlay */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3"
                    >
                        <CheckCircle2 size={24} className="text-emerald-500" />
                        <div className="flex-1">
                            <p className="text-white font-bold text-sm">Withdrawal Scheduled!</p>
                            <p className="text-emerald-500/60 text-[10px] uppercase font-black tracking-widest">Receipt sent to email</p>
                        </div>
                        <ChevronRight size={16} className="text-emerald-500/40" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WithdrawForm;
