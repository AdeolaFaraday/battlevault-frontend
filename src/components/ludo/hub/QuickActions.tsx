"use client";
import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import CreateGameModal from './CreateGameModal';

const QuickActions = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col gap-3 md:gap-4 sticky md:top-24">
                <h3 className="text-lg font-bold text-white px-1 hidden md:block">
                    Quick Actions
                </h3>

                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="relative w-full group overflow-hidden rounded-2xl p-0.5"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 transition-all group-hover:scale-105" />
                    <div className="relative bg-[#1a1d2e] group-hover:bg-transparent rounded-[14px] p-5 md:p-6 transition-colors flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-white group-hover:text-purple-600 transition-colors">
                                <Plus size={24} />
                            </div>
                            <div className="text-left group-hover:text-white">
                                <h4 className="font-bold text-lg text-white">Create Free Game</h4>
                                <p className="text-sm text-slate-400 group-hover:text-purple-100">Play with friends</p>
                            </div>
                        </div>
                    </div>
                </button>

                <button className="w-full bg-[#24283b] hover:bg-[#2a2e42] border border-white/5 rounded-2xl p-5 md:p-6 transition-all flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                        <Search size={22} />
                    </div>
                    <div className="text-left">
                        <h4 className="font-bold text-lg text-slate-200 group-hover:text-white transition-colors">Join Game</h4>
                        <p className="text-sm text-slate-500">Find an open lobby</p>
                    </div>
                </button>
            </div>

            <CreateGameModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </>
    );
};

export default QuickActions;
