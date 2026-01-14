import React from 'react';
import { ArrowLeft, Clock, Eye, Info, MoreVertical, Trophy, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

const GameHeader = () => {
    const router = useRouter();

    return (
        <div className="w-full flex items-center justify-between px-4 py-3 bg-slate-900/50 backdrop-blur-sm border-b border-white/5 relative z-50">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
            >
                <ArrowLeft size={24} />
            </button>

            {/* Center Stats */}
            <div className="flex gap-2 text-xs font-bold text-slate-300">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <Eye size={14} />
                    <span>8,4758</span> {/* Placeholder */}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <Clock size={14} />
                    <span>02:34:23</span> {/* Placeholder */}
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex gap-1">
                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                    <Info size={24} />
                </button>
                <button className="p-2 -mr-2 text-slate-400 hover:text-white transition-colors">
                    <MoreVertical size={24} />
                </button>
            </div>

            {/* Sub-Header / Current Game Info (Floating below or integrated?) 
                The design shows logic like "Prize Pool" and "Bet Amount" floating near the top.
                Let's include them here for now as absolute positioned elements or separate.
            */}
        </div>
    );
};

export const GameStats = () => {
    return (
        <div className="w-full max-w-[400px] flex justify-between items-center px-4 mt-4 mb-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
                <Trophy size={16} fill="currentColor" />
                <span className="font-black text-sm">487</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-800/80 border border-white/10 backdrop-blur-md">
                {/* Avatars tiny */}
                <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 border border-slate-900" />
                    <div className="w-6 h-6 rounded-full bg-emerald-500 border border-slate-900" />
                </div>
                <span className="text-white font-bold text-sm pl-1">10:34</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                <span className="font-black text-sm">847</span>
                <Star size={16} fill="currentColor" />
            </div>
        </div>
    )
}

export default GameHeader;
