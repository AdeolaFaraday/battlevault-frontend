import { useState, useRef, useEffect } from 'react';
import { User, Swords } from 'lucide-react';
import { cn } from '../../lib/utils';
import { LudoPlayer, Token } from '@/src/types/ludo';

interface PlayerCardProps {
    player?: LudoPlayer;
    isCurrentTurn: boolean;
    isCurrentUser?: boolean; // New prop to identify if this is the current user's card
    diceValue?: number; // Value to display if they just rolled? Or maybe handled separate
    color: "red" | "blue" | "green" | "yellow";
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    tokenData?: { [key: string]: Token[] };
    turnStartedAt?: number;
    turnDuration?: number;
    onTimeUp?: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
    player,
    isCurrentTurn,
    isCurrentUser = false,
    color,
    position,
    tokenData,
    turnStartedAt,
    turnDuration,
    onTimeUp
}) => {
    const [timeLeft, setTimeLeft] = useState<number>(turnDuration || 60000); // 1 minute
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // console.log("PlayerCard", player?.name, { isCurrentTurn, isCurrentUser, turnStartedAt, turnDuration });

    useEffect(() => {
        if (!isCurrentTurn || !turnStartedAt || !turnDuration) {
            setTimeLeft(turnDuration || 60000);
            return;
        }

        const tick = () => {
            const now = Date.now();
            const elapsed = now - turnStartedAt;
            const remaining = Math.max(0, turnDuration - elapsed);

            setTimeLeft(remaining);
            // console.log("Time left for player", player?.name, remaining);

            if (remaining <= 0) {
                if (timerRef.current) clearInterval(timerRef.current);
                // console.log("Time up for player", player?.name, { isCurrentUser, isCurrentTurn });
                if (isCurrentUser) {
                    onTimeUp?.();
                }
            }
        };

        tick(); // Initial call
        timerRef.current = setInterval(tick, 100);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isCurrentTurn, turnStartedAt, turnDuration, isCurrentUser, onTimeUp, player?.name]);

    const progress = turnDuration ? (timeLeft / turnDuration) * 100 : 0;

    // Map Ludo colors to Tailwind classes
    const gradientStyles = {
        red: "from-red-900/80 to-slate-900/80",
        blue: "from-blue-900/80 to-slate-900/80",
        green: "from-green-900/80 to-slate-900/80",
        yellow: "from-yellow-900/80 to-slate-900/80",
    };

    const variantStyles = {
        red: "bg-red-500/30",
        blue: "bg-blue-500/30",
        green: "bg-green-500/30",
        yellow: "bg-yellow-500/30",
    };

    const bgGradient = gradientStyles[color];
    const borderStyle = isCurrentTurn ? "border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "border-white/10";

    const seconds = Math.ceil(timeLeft / 1000);

    return (
        <div className={cn(
            "relative flex items-center group",
            (position === "top-right" || position === "bottom-right") ? "flex-row-reverse" : "flex-row"
        )}>
            {/* Countdown outside the card */}
            {isCurrentTurn && (
                <div className={cn(
                    "absolute flex items-center justify-center w-8 h-8 rounded-full bg-slate-900/90 border border-white/20 text-[10px] font-bold text-white z-30 transition-all duration-300",
                    (position === "top-right" || position === "bottom-right") ? "-left-10" : "-right-10",
                    seconds <= 5 ? "text-red-500 border-red-500/50 scale-110 animate-pulse" : ""
                )}>
                    {seconds}s
                </div>
            )}

            {/* Active Turn Indicator Badge */}
            {isCurrentTurn && (
                <div className={cn(
                    "absolute -top-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white text-slate-900 text-[8px] font-black tracking-tighter uppercase shadow-lg shadow-white/20 border border-white/50 z-40 whitespace-nowrap animate-bounce",
                )}>
                    {isCurrentUser ? "Your Turn" : "Their Turn"}
                </div>
            )}

            <div
                id={`player-card-${player?.id}`}
                className={cn(
                    "relative flex items-center p-2 rounded-full border backdrop-blur-md transition-all duration-300 w-[160px] md:w-[200px] overflow-hidden",
                    `bg-gradient-to-r ${bgGradient}`,
                    borderStyle,
                    // Reverse layout for right-side players
                    (position === "top-right" || position === "bottom-right") ? "flex-row-reverse text-right" : "flex-row text-left"
                )}>

                {/* Progress Bar Background */}
                {isCurrentTurn && (
                    <div
                        className={cn("absolute inset-y-0 left-0 transition-all duration-100 ease-linear pointer-events-none", variantStyles[color])}
                        style={{ width: `${progress}%` }}
                    />
                )}

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
                <div className={cn("relative flex flex-col mx-3 min-w-0 z-10")}>
                    <span className="text-xs md:text-sm font-bold text-white truncate max-w-full">
                        {player?.name || "Waiting..."}
                    </span>
                    {/* Stats: Kills & Finished */}
                    <div className="flex items-center gap-3 mt-0.5">
                        {/* Kills */}
                        <div className="flex items-center gap-1 shrink-0" title="Tokens Captured">
                            <Swords size={10} className="text-rose-400" />
                            <span className="text-[10px] font-bold text-rose-100">{player?.capturedCount || 0}</span>
                        </div>

                        {/* Finished Tokens - Stacked by color */}
                        <div className="flex flex-col gap-0.5 pb-0.5">
                            {(player?.tokens || [color]).map((tokenColor, colorIndex) => (
                                <div key={colorIndex} className="flex gap-0.5" title={`${tokenColor} Tokens Finished`}>
                                    {[...Array(4)].map((_, i) => {
                                        // Total dots across all rows up to this one
                                        const previousDots = colorIndex * 4;
                                        const dotIndex = previousDots + i;

                                        // NEW LOGIC: Check specific token if data available
                                        let isFinished = false;
                                        if (tokenData && tokenData[tokenColor]) {
                                            // We assume the tokens are ordered by SN or index matches logic. 
                                            // Usually Ludo has 4 tokens per color.
                                            // Let's safe check index access.
                                            const token = tokenData[tokenColor][i];
                                            isFinished = token?.isFinished || false;
                                        } else {
                                            // Fallback to old count
                                            isFinished = dotIndex < (player?.finishedCount || 0);
                                        }

                                        const dotColors = {
                                            red: "bg-red-400 border-red-400 shadow-[0_0_4px_rgba(239,68,68,0.6)]",
                                            blue: "bg-blue-400 border-blue-400 shadow-[0_0_4px_rgba(59,130,246,0.6)]",
                                            green: "bg-green-400 border-green-400 shadow-[0_0_4px_rgba(34,197,94,0.6)]",
                                            yellow: "bg-[#FFD700] border-[#FFD700] shadow-[0_0_4px_rgba(251,191,36,0.6)]",
                                        };

                                        return (
                                            <div
                                                key={i}
                                                className={cn(
                                                    "w-1.5 h-1.5 rounded-full border border-white/20 transition-all duration-500",
                                                    isFinished
                                                        ? dotColors[tokenColor as keyof typeof dotColors]
                                                        : "bg-transparent"
                                                )}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pulsing Border for active turn */}
                {isCurrentTurn && (
                    <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse pointer-events-none" />
                )}
            </div>
        </div>
    );
};

export default PlayerCard;
