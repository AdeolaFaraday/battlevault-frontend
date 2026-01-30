import React from 'react';
import { BracketGame as BracketGameType } from '@/src/types/tournament';
import { cn } from '@/src/lib/utils';

interface BracketGameProps {
    game: BracketGameType;
    className?: string;
}

const BracketGame: React.FC<BracketGameProps> = ({ game, className }) => {
    // const isFinished = game.status === 'finished';
    const isLive = game.status === 'live' || game.status === 'playingDice' || game.status === 'playingToken';

    return (
        <div className={cn(
            "relative bg-black/40 backdrop-blur-md border border-white/5 rounded-lg md:rounded-xl p-1.5 md:p-3 min-w-[120px] md:min-w-[200px] shadow-xl hover:border-amber-500/30 transition-all group",
            className
        )}>
            <div className="flex flex-col gap-1 md:gap-2">
                <div className="flex items-center justify-between mb-0.5 md:mb-1">
                    <span className="text-[8px] md:text-[10px] text-amber-200/50 font-bold uppercase tracking-widest">
                        {game.name}
                    </span>
                    {isLive && (
                        <span className="flex items-center gap-1">
                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-[8px] md:text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Live</span>
                        </span>
                    )}
                </div>

                <div className="space-y-1 md:space-y-1.5">
                    {game.players.map((player, idx) => (
                        <div key={player.id || idx} className="flex items-center justify-between bg-white/5 rounded-md md:rounded-lg px-1.5 md:px-2 py-0.5 md:py-1.5 border border-white/5 group-hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-1.5 md:gap-2 overflow-hidden">
                                <div
                                    className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: player.color }}
                                />
                                <span className="text-[10px] md:text-xs font-semibold text-slate-200 truncate max-w-[80px] md:max-w-none">
                                    {player.name || 'TBD'}
                                </span>
                            </div>
                        </div>
                    ))}

                    {game.players.length < 2 && (
                        <div className="flex items-center gap-1.5 md:gap-2 bg-white/5 rounded-md md:rounded-lg px-1.5 md:px-2 py-0.5 md:py-1.5 border border-white/5 opacity-40">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-slate-600 shrink-0" />
                            <span className="text-[10px] md:text-xs font-semibold text-slate-400">TBD</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BracketGame;
