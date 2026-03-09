import React from 'react';
import ShareButton from './ShareButton';

// GameHeader component removed as requested

export const GameStats = ({ id }: { id: string }) => {
    return (
        <div className="w-full max-w-[500px] flex justify-between items-center px-6 mt-4 mb-2">
            {/* Left: Live Status */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span className="text-[10px] font-black text-rose-200 tracking-wider">LIVE</span>
            </div>

            {/* Center: Share button */}
            <ShareButton
                gameId={id}
            />

            {/* Right: Prize/Coins */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 border border-amber-200 shadow-sm" />
                <span className="text-[10px] font-black text-amber-200 tracking-wide">100</span>
            </div>
        </div>
    )
}

export default GameStats;
