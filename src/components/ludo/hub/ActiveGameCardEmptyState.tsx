"use client";

import React, { useState } from 'react';
import { Gamepad2, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CreateGameModal from './CreateGameModal';

interface ActiveGameCardEmptyStateProps {
    isAuthenticated: boolean;
}

const ActiveGameCardEmptyState: React.FC<ActiveGameCardEmptyStateProps> = ({ isAuthenticated }) => {
    const router = useRouter();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl"
            >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/40 via-slate-800/40 to-slate-900/40" />

                <div className="relative p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-4 min-h-[200px]">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                        <Gamepad2 size={32} className="text-slate-400" />
                    </div>

                    {isAuthenticated ? (
                        <>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">No Active Games</h3>
                                <p className="text-slate-400 text-sm max-w-[300px]">
                                    Start a new game and challenge your friends!
                                </p>
                            </div>
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all"
                            >
                                <Gamepad2 size={18} />
                                Create Game
                            </button>
                        </>
                    ) : (
                        <>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Ready to Play?</h3>
                                <p className="text-slate-400 text-sm max-w-[300px]">
                                    Login to start playing and track your progress!
                                </p>
                            </div>
                            <button
                                onClick={() => router.push('/signin')}
                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all"
                            >
                                <LogIn size={18} />
                                Login to Play
                            </button>
                        </>
                    )}
                </div>
            </motion.div>

            <CreateGameModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </>
    );
};

export default ActiveGameCardEmptyState;
