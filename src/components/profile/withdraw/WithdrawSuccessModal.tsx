"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { CheckCircle2, ArrowRight, Building2 } from "lucide-react";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });
import successAnimation from "@/src/components/common/lottie/success.json";

interface WithdrawSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    bankName: string;
    currency?: string;
}

const WithdrawSuccessModal: React.FC<WithdrawSuccessModalProps> = ({
    isOpen,
    onClose,
    amount,
    bankName,
    currency = "NGN",
}) => {
    const formatCurrency = (value: number) => {
        const symbol = currency === "NGN" ? "₦" : currency;
        return `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Confetti Particles */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    opacity: 0,
                                    y: -20,
                                    x: Math.random() * window.innerWidth,
                                    rotate: 0
                                }}
                                animate={{
                                    opacity: [0, 1, 1, 0],
                                    y: window.innerHeight + 100,
                                    rotate: Math.random() * 720 - 360
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    delay: Math.random() * 0.5,
                                    ease: "easeOut"
                                }}
                                className={`absolute w-3 h-3 rounded-sm ${["bg-emerald-500", "bg-indigo-500", "bg-yellow-400", "bg-pink-500", "bg-cyan-400"][i % 5]
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Content Container */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 100 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.5, opacity: 0, y: 100 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="relative bg-[#1e2235] border border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl overflow-hidden"
                    >
                        {/* Success Animation Overlay */}
                        <div className="absolute inset-0 pointer-events-none transform scale-150 opacity-30">
                            <Lottie
                                loop={false}
                                animationData={successAnimation}
                                play
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            {/* Success Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", damping: 15 }}
                                className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center mb-6 border-4 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4, type: "spring" }}
                                >
                                    <CheckCircle2 className="w-12 h-12 text-emerald-500 fill-emerald-500/20" />
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className="text-3xl font-black text-white mb-1 tracking-tight">
                                    Withdrawal Initiated!
                                </h2>
                                <p className="text-white/40 text-sm font-medium uppercase tracking-[0.2em] mb-6">
                                    Processing your request
                                </p>
                            </motion.div>

                            {/* Amount Badge */}
                            <motion.div
                                initial={{ y: 10, opacity: 0, scale: 0.9 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mb-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
                            >
                                <span className="text-3xl font-black text-emerald-400">{formatCurrency(amount)}</span>
                            </motion.div>

                            {/* Bank Info */}
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                            >
                                <Building2 size={14} className="text-white/40" />
                                <span className="text-white/60 text-sm font-medium">{bankName}</span>
                            </motion.div>

                            {/* Done Button */}
                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onClose}
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20 transition-all group"
                            >
                                <span>Done</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="mt-4 text-[10px] text-white/30 font-medium uppercase tracking-widest"
                            >
                                Receipt sent to your email
                            </motion.p>
                        </div>

                        {/* Particle Decorations */}
                        <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <div className="absolute bottom-20 right-10 w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                        <div className="absolute top-40 right-4 w-2 h-2 rounded-full bg-teal-500 animate-bounce" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WithdrawSuccessModal;
