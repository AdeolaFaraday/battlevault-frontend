"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "react-lottie-player";
import successAnimation from "@/src/components/common/lottie/success.json";
import { Trophy, Home, RotateCcw } from "lucide-react";
import { LudoPlayer } from "@/src/types/ludo";

interface GameCelebrationProps {
    isOpen: boolean;
    winner: LudoPlayer | undefined;
    onClose: () => void;
    onRestart?: () => void;
}

const colorMap: Record<string, string> = {
    red: "from-red-500/20 to-red-600/20 text-red-400 border-red-500/30",
    blue: "from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/30",
    green: "from-green-500/20 to-green-600/20 text-green-400 border-green-500/30",
    yellow: "from-yellow-500/20 to-yellow-600/20 text-yellow-400 border-yellow-500/30",
};

const GameCelebration: React.FC<GameCelebrationProps> = ({ isOpen, winner, onClose, onRestart }) => {
    const colorStyle = winner?.color ? colorMap[winner.color] : colorMap.blue;

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

                    {/* Content Container */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 100 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.5, opacity: 0, y: 100 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="relative bg-[#1e2235] border border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl overflow-hidden"
                    >
                        {/* Success Animation Overlay */}
                        <div className="absolute inset-0 pointer-events-none transform scale-150 opacity-40">
                            <Lottie
                                loop
                                animationData={successAnimation}
                                play
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            {/* Trophy Icon */}
                            <motion.div
                                initial={{ y: -20, opacity: 0, rotate: -15 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center mb-6 border-4 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.2)]"
                            >
                                <Trophy className="w-14 h-14 text-yellow-500 filter drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                            </motion.div>

                            <motion.div
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className="text-4xl font-black text-white mb-1 tracking-tight">
                                    VICTORY!
                                </h2>
                                <p className="text-white/40 text-sm font-medium uppercase tracking-[0.2em] mb-6">
                                    Game Over
                                </p>
                            </motion.div>

                            {/* Winner Badge */}
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className={`mb-10 px-8 py-3 rounded-2xl bg-gradient-to-r ${colorStyle} border font-bold text-lg shadow-lg`}
                            >
                                {winner?.name || "Player One"}
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="grid grid-cols-2 gap-4 w-full"
                            >
                                <button
                                    onClick={onClose}
                                    className="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-3xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/5 group"
                                >
                                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Home size={20} />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider">Home</span>
                                </button>
                                <button
                                    onClick={onRestart}
                                    className="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-3xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-xl shadow-indigo-500/20 active:scale-95 group"
                                >
                                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                                        <RotateCcw size={20} />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider">Rematch</span>
                                </button>
                            </motion.div>
                        </div>

                        {/* Particle Decorations (css only) */}
                        <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
                        <div className="absolute bottom-20 right-10 w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                        <div className="absolute top-40 right-4 w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default GameCelebration;
