"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ModernAuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    return (
        <div className="min-h-screen w-full bg-[#0f111a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-[10%] -left-[5%] w-[400px] h-[400px] rounded-full bg-indigo-600/20 blur-[80px]"
                />
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -bottom-[15%] -right-[5%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[100px]"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/assets/grid-pattern.svg')] opacity-[0.03]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[480px]"
            >
                {/* Main Card */}
                <div className="bg-[#1a1d2e]/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
                    {children}
                </div>

                {/* Footer Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 flex justify-center gap-8 text-white/30 text-xs font-medium tracking-widest uppercase"
                >
                    <span onClick={() => router.push('/privacy')} className="hover:text-white/60 cursor-pointer transition-colors">Privacy Policy</span>
                    <span onClick={() => router.push('/terms')} className="hover:text-white/60 cursor-pointer transition-colors">Terms of Service</span>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ModernAuthWrapper;
