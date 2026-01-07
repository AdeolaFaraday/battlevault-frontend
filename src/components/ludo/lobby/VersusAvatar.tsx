import React from 'react';
import { User, Loader2 } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface VersusAvatarProps {
    player?: {
        name: string;
        avatarUrl?: string; // Optional
        isReady: boolean;
    };
    isOpponent?: boolean;
    color?: 'red' | 'blue' | 'green' | 'yellow'; // Optional constraint if needed
}

const VersusAvatar: React.FC<VersusAvatarProps> = ({ player, isOpponent = false }) => {
    // Determine status color based on ready state
    const isReady = player?.isReady;

    // Status color mapping
    const statusColor = isReady
        ? "border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
        : "border-slate-700 shadow-none";

    // Waiting pulse animation for empty opponent slot
    const emptyStateClass = isOpponent
        ? "animate-pulse bg-white/5 border-white/10 border-dashed"
        : "bg-white/5 border-white/10";

    return (
        <div className="flex flex-col items-center justify-center gap-6 relative z-10 w-full max-w-[200px]">
            {/* Avatar Circle */}
            <div className={cn(
                "w-28 h-28 sm:w-40 sm:h-40 rounded-full border-4 flex items-center justify-center transition-all duration-500 relative",
                player ? "bg-slate-800" : emptyStateClass,
                player ? statusColor : "",
                // If it's an opponent and we are waiting, add a subtle breath effect
                !player && isOpponent && "shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            )}>
                {player ? (
                    <div className="text-slate-300 w-full h-full rounded-full overflow-hidden relative">
                        {/* Placeholder Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <User size={64} strokeWidth={1.5} className="text-indigo-300" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-slate-500 gap-2">
                        <Loader2 size={32} className="animate-spin opacity-50" />
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Waiting</span>
                    </div>
                )}

                {/* Status Indicator Dot (Absolute) */}
                {player && (
                    <div className={cn(
                        "absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-[#1a1d2e]",
                        isReady ? "bg-emerald-500" : "bg-slate-500"
                    )} />
                )}
            </div>

            {/* Player Name / Label */}
            <div className="text-center space-y-2">
                {player ? (
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                            {player.name}
                        </h3>
                        {isReady ? (
                            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Ready
                            </span>
                        ) : (
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                                Not Ready
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="h-6 w-24 bg-white/5 rounded-full animate-pulse mx-auto" />
                )}
            </div>
        </div>
    );
};

export default VersusAvatar;
