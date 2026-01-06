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
        ? "border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
        : "border-gray-200 shadow-none";

    // Waiting pulse animation for empty opponent slot
    const emptyStateClass = isOpponent
        ? "animate-pulse bg-gray-50 border-gray-200 border-dashed"
        : "bg-gray-50 border-gray-200";

    return (
        <div className="flex flex-col items-center justify-center gap-6 relative z-10 w-full max-w-[200px]">
            {/* Avatar Circle */}
            <div className={cn(
                "w-24 h-24 sm:w-40 sm:h-40 rounded-full border-4 flex items-center justify-center transition-all duration-500",
                player ? "bg-white" : emptyStateClass,
                player ? statusColor : "",
                // If it's an opponent and we are waiting, add a subtle breath effect
                !player && isOpponent && "shadow-[0_0_20px_rgba(0,0,0,0.05)]"
            )}>
                {player ? (
                    <div className="text-gray-700">
                        {/* Placeholder for actual image */}
                        <User size={64} strokeWidth={1.5} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-gray-300">
                        <Loader2 size={40} className="animate-spin mb-2" />
                        <span className="text-xs font-bold uppercase tracking-widest">Waiting</span>
                    </div>
                )}
            </div>

            {/* Player Name / Label */}
            <div className="text-center">
                {player ? (
                    <>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-1">
                            {player.name}
                        </h3>
                        {isReady ? (
                            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                                Ready
                            </span>
                        ) : (
                            <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                Not Ready
                            </span>
                        )}
                    </>
                ) : (
                    <div className="h-8 w-32 bg-gray-100 rounded-full animate-pulse mx-auto" />
                )}
            </div>
        </div>
    );
};

export default VersusAvatar;
