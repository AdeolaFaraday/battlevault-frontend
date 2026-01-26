"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CreditCard, Lock, ArrowRight } from 'lucide-react';

const AddCardSection = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="space-y-4">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full h-20 rounded-3xl border-2 border-dashed border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all flex items-center justify-center gap-3 group"
            >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                    <Plus size={20} className="text-slate-400 group-hover:text-white" />
                </div>
                <span className="text-slate-400 group-hover:text-white font-bold transition-colors">Link New Payment Card</span>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-[#24283b]/40 border border-white/5 rounded-3xl p-6 space-y-6 backdrop-blur-md">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest px-1">Card Number</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                            <CreditCard size={18} className="text-slate-500 group-focus-within:text-indigo-400" />
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                            placeholder="XXXX XXXX XXXX XXXX"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest px-1">Expiry Date</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                            placeholder="MM / YY"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest px-1">CVV</label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                maxLength={3}
                                                className="w-full px-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                                placeholder="***"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                                                <Lock size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-white font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all group overflow-hidden relative">
                                <span className="relative z-10">Add Card & Secure</span>
                                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AddCardSection;
