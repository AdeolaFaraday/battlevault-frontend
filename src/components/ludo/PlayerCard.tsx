import { useState, useRef, useEffect, useMemo } from 'react';
import { User, Swords, TimerReset } from 'lucide-react';
import { cn } from '../../lib/utils';
import { LudoPlayer, Token } from '@/src/types/ludo';
import { isOnline } from '../../utils/presence';

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
    rewardPoints?: number;
    onRenewTime?: () => void;
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
    onTimeUp,
    rewardPoints = 0,
    onRenewTime
}) => {
    const [timeLeft, setTimeLeft] = useState<number>(turnDuration || 60000); // 1 minute
    const [currentTime, setCurrentTime] = useState(Date.now());
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Update current time periodically for presence status
    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(Date.now()), 10000); // Update every 10s
        return () => clearInterval(interval);
    }, []);

    const online = useMemo(() => isOnline(player?.lastSeen), [player?.lastSeen, currentTime]);

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
                    "absolute flex flex-col items-center gap-2 z-30 transition-all duration-300",
                    (position === "top-right" || position === "bottom-right") ? "-right-20" : "-left-20"
                )}>
                    {/* Timer Circle */}
                    <div className={cn(
                        "flex flex-col items-center justify-center w-10 h-10 rounded-full bg-slate-900/90 border border-white/20 shadow-xl backdrop-blur-md",
                        seconds <= 5 ? "text-red-500 border-red-500/50 scale-110 animate-pulse" : "text-white"
                    )}>
                        <span className="text-[10px] font-black leading-none">{seconds}</span>
                        <span className="text-[6px] font-bold opacity-70 uppercase tracking-tighter">sec</span>
                    </div>

                    {/* Renew Button */}
                    {isCurrentUser && (
                        <button
                            onClick={onRenewTime}
                            className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 border border-white/30 text-white shadow-[0_5px_15px_rgba(79,70,229,0.4)] transition-all hover:scale-110 active:scale-95 group/renew"
                            title="Renew Time (Uses Reward Points)"
                        >
                            <span className="text-[7px] font-black uppercase tracking-tighter pl-1">Extend</span>
                            <TimerReset size={12} className="group-hover/renew:rotate-180 transition-transform duration-500" />
                        </button>
                    )}
                </div>
            )}

            {/* Reward Points outside the card - opposite side of timer */}
            {isCurrentUser && (
                <div className={cn(
                    "absolute z-30 transition-all duration-300",
                    (position === "top-right" || position === "bottom-right") ? "-left-14" : "-right-14"
                )}>
                    <div className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 shadow-lg backdrop-blur-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 border border-amber-200 shadow-sm" />
                        <span className="text-[9px] font-black text-amber-200 tracking-wider">RP</span>
                        <span className="text-[10px] font-black text-white leading-none">{rewardPoints}</span>
                    </div>
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

                {/* Avatar Circle with Presence Indicator */}
                <div className="relative shrink-0">
                    <div className={cn(
                        "relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 overflow-hidden flex items-center justify-center bg-slate-800",
                        isCurrentTurn ? "border-white shadow-inner" : `border-${color}-500/30`
                    )}>
                        {player?.avatarUrl ? (
                            <img src={player.avatarUrl} alt={player.name} className="w-full h-full object-cover" />
                        ) : (
                            <User size={24} className="text-slate-400" />
                        )}
                    </div>

                    {/* Online Status Indicator - Outside overflow-hidden */}
                    <div className={cn(
                        "absolute bottom-0 right-0 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-slate-900 z-50",
                        online ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" : "bg-slate-500"
                    )} />
                </div>

                {/* Info */}
                <div className={cn("relative flex flex-col mx-3 min-w-0 z-10")}>
                    <div className="flex flex-col min-w-0">
                        <span className="text-xs md:text-sm font-bold text-white truncate">
                            {player?.name || "Waiting..."}
                        </span>
                    </div>
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
