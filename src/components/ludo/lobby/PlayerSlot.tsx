import React from 'react';
import { User, CheckCircle2, Loader2, Plus } from 'lucide-react';
import { cn } from '../../../lib/utils'; // Assuming this utility exists, otherwise I'll need to define it or usage clsx directly

interface PlayerSlotProps {
    color: 'red' | 'blue' | 'green' | 'yellow';
    player?: {
        name: string;
        avatarUrl?: string; // Optional for now
        isReady: boolean;
    };
    onClick?: () => void; // For potential future interaction like invite
}

const colorMap = {
    red: {
        bg: 'bg-red-50',
        border: 'border-red-100',
        text: 'text-red-700',
        icon: 'text-red-400',
        accent: 'bg-red-500',
        shadow: 'shadow-red-500/10'
    },
    blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        text: 'text-blue-700',
        icon: 'text-blue-400',
        accent: 'bg-blue-500',
        shadow: 'shadow-blue-500/10'
    },
    green: {
        bg: 'bg-green-50',
        border: 'border-green-100',
        text: 'text-green-700',
        icon: 'text-green-400',
        accent: 'bg-green-500',
        shadow: 'shadow-green-500/10'
    },
    yellow: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-100',
        text: 'text-yellow-700',
        icon: 'text-yellow-400',
        accent: 'bg-yellow-500',
        shadow: 'shadow-yellow-500/10'
    },
};

const PlayerSlot: React.FC<PlayerSlotProps> = ({ color, player, onClick }) => {
    const theme = colorMap[color];

    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300",
                theme.bg,
                theme.border,
                theme.shadow,
                "hover:shadow-lg w-full aspect-[3/4] max-w-[200px]"
            )}
            onClick={onClick}
        >
            {/* Status Indicator (Top Right) */}
            <div className="absolute top-3 right-3">
                {player ? (
                    player.isReady ? (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-green-200 shadow-sm">
                            <CheckCircle2 size={14} className="text-green-600" />
                            <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">Ready</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm">
                            <Loader2 size={14} className="text-slate-400 animate-spin" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Waiting</span>
                        </div>
                    )
                ) : null}
            </div>

            {/* Avatar Section */}
            <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300",
                player ? "bg-white shadow-md ring-4 ring-opacity-30" : "bg-white/50 border-2 border-dashed border-gray-300"
                , player ? theme.text : "text-gray-300"
            )}
                style={player ? { boxShadow: `0 8px 16px -4px ${theme.accent}20` } : {}}
            >
                {player ? (
                    <User size={32} className={theme.icon} />
                ) : (
                    <Plus size={32} />
                )}
            </div>

            {/* Name / Empty State Text */}
            <div className="text-center">
                {player ? (
                    <>
                        <h3 className={cn("font-bold text-lg leading-tight mb-1", theme.text)}>
                            {player.name}
                        </h3>
                        <p className={cn("text-xs font-medium opacity-60 uppercase tracking-wider", theme.text)}>
                            {color}
                        </p>
                    </>
                ) : (
                    <span className="text-sm font-medium text-gray-400">
                        Waiting for player...
                    </span>
                )}
            </div>

            {/* Decorative Bottom Bar */}
            <div className={cn("absolute bottom-0 left-0 right-0 h-1.5 mx-8 rounded-t-full opacity-40", theme.accent)} />
        </div>
    );
};

export default PlayerSlot;
