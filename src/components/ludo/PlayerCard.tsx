import React from 'react';
import { User, Swords } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PlayerCardProps {
    player?: LudoPlayer;
    isCurrentTurn: boolean;
    diceValue?: number; // Value to display if they just rolled? Or maybe handled separate
    color: "red" | "blue" | "green" | "yellow";
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, isCurrentTurn, color, position }) => {
    // Map Ludo colors to Tailwind classes
    // const colorStyles = {
    //     red: "bg-red-500/10 border-red-500/50 text-red-100",
    //     blue: "bg-blue-500/10 border-blue-500/50 text-blue-100",
    //     green: "bg-green-500/10 border-green-500/50 text-green-100",
    //     yellow: "bg-yellow-500/10 border-yellow-500/50 text-yellow-100",
    // };

    const gradientStyles = {
        red: "from-red-900/80 to-slate-900/80",
        blue: "from-blue-900/80 to-slate-900/80",
        green: "from-green-900/80 to-slate-900/80",
        yellow: "from-yellow-900/80 to-slate-900/80",
    };

    const bgGradient = gradientStyles[color];
    const borderStyle = isCurrentTurn ? "border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "border-white/10";

    return (
        <div className={cn(
            "relative flex items-center p-2 rounded-full border backdrop-blur-md transition-all duration-300 w-[160px] md:w-[200px]",
            `bg-gradient-to-r ${bgGradient}`,
            borderStyle,
            // Reverse layout for right-side players
            (position === "top-right" || position === "bottom-right") ? "flex-row-reverse text-right" : "flex-row text-left"
        )}>
            {/* Avatar Circle */}
            <div className={cn(
                "relative shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 overflow-hidden flex items-center justify-center bg-slate-800",
                isCurrentTurn ? "border-white shadow-inner" : `border-${color}-500/30`
            )}>
                {player?.avatarUrl ? (
                    <img src={player.avatarUrl} alt={player.name} className="w-full h-full object-cover" />
                ) : (
                    <User size={24} className="text-slate-400" />
                )}
            </div>

            {/* Info */}
            <div className={cn("flex flex-col mx-3 min-w-0")}>
                <span className="text-xs md:text-sm font-bold text-white truncate max-w-full">
                    {player?.name || "Waiting..."}
                </span>
                {/* Stats: Kills & Finished */}
                <div className="flex items-center gap-3 mt-0.5">
                    {/* Kills */}
                    <div className="flex items-center gap-1" title="Tokens Captured">
                        <Swords size={10} className="text-rose-400" />
                        <span className="text-[10px] font-bold text-rose-100">{player?.capturedCount || 0}</span>
                    </div>

                    {/* Finished Tokens */}
                    <div className="flex gap-0.5" title="Tokens Finished">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "w-1.5 h-1.5 rounded-full border border-white/30",
                                    i < (player?.finishedCount || 0)
                                        ? "bg-amber-400 border-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.8)]"
                                        : "bg-transparent"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Active Turn Indicator (Optional Glow or Icon) */}
            {isCurrentTurn && (
                <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse pointer-events-none" />
            )}
        </div>
    );
};

export default PlayerCard;
