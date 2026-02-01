import React from 'react';
import { TournamentBracket as TournamentBracketType } from '@/src/types/tournament';
import BracketStage from './BracketStage';
import StageConnectors from './StageConnectors';
import { Trophy, Share2, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { BracketGame as BracketGameType } from '@/src/types/tournament';

interface TournamentBracketViewProps {
    bracket: TournamentBracketType;
    className?: string;
}

interface Stage {
    _id: string;
    name: string;
    index: number;
    games: BracketGameType[];
}

const TournamentBracketView: React.FC<TournamentBracketViewProps> = ({ bracket, className }) => {
    const sortedStages = React.useMemo(() =>
        [...bracket?.stages || []].sort((a, b) => a.index - b.index) as Stage[]
        , [bracket?.stages]);

    const finalGame = React.useMemo(() => {
        // Look for the "Final" match in any stage (usually the last one)
        for (const stage of sortedStages) {
            const final = stage.games.find(g => g.name.toLowerCase().includes('final'));
            if (final) return final;
        }
        return null;
    }, [sortedStages]);

    const winnerPlayer = React.useMemo(() => {
        if (!finalGame?.winner) return null;
        return finalGame.players.find(p => p.id === finalGame.winner);
    }, [finalGame]);

    return (
        <div className={cn("w-full min-h-screen bg-[#0f111a] text-white p-6 md:p-10", className)}>
            <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2 mt-16">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-amber-500/20 p-2 rounded-lg border border-amber-500/30">
                            <Trophy className="text-amber-500" size={24} />
                        </div>
                        <span className="text-amber-500 font-black tracking-widest text-xs uppercase">Tournament Arena</span>
                    </div>
                    <h1 className="lg:text-4xl md:text-6xl sm:text-2xl font-black text-white leading-tight uppercase tracking-tight">
                        {bracket.tournament.title}
                    </h1>
                    <p className="text-slate-400 lg:text-base md:text-sm sm:text-xs font-medium max-w-2xl">
                        Explore the road to the championship. Track every move, every win, and see who rises to the top of the vault.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
                        <Share2 size={20} />
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-black rounded-xl shadow-lg shadow-amber-500/20 transition-all text-xs uppercase tracking-widest active:scale-95">
                        Live Stream
                    </button>
                </div>
            </header>

            <div className="max-w-full overflow-x-auto pb-10 custom-scrollbar">
                <div className="inline-flex min-w-full justify-center lg:justify-start gap-0 px-2 md:px-4 pt-4">
                    {sortedStages.map((stage, idx, allStages) => (
                        <React.Fragment key={stage._id || idx}>
                            <BracketStage stage={stage} className="shrink-0" />
                            {idx < allStages.length - 1 ? (
                                <StageConnectors
                                    gameCount={allStages[idx + 1].games.length}
                                    className="flex"
                                />
                            ) : (
                                // If this is the last stage and it contains the final, 
                                // AND we have a winner, show the winner box
                                winnerPlayer && (
                                    <div className="flex flex-col">
                                        {/* Spacer to align with Stage Header */}
                                        <div className="h-[46px] md:h-[70px] shrink-0" />

                                        <div className="flex items-center flex-grow">
                                            {/* Connector to Winner */}
                                            <div className="flex items-center w-6 md:w-16 shrink-0">
                                                <div className="w-full h-px bg-amber-500/30" />
                                            </div>

                                            {/* Winner Box */}
                                            <div className="flex flex-col items-center gap-2 md:gap-4 animate-in fade-in zoom-in duration-1000">
                                                <div className="bg-amber-500/10 backdrop-blur-md border border-amber-500/30 rounded-full px-4 md:px-6 py-1 md:py-2 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                                                    <h3 className="text-[8px] md:text-xs font-black text-amber-500 uppercase tracking-[0.3em] leading-none">
                                                        CHAMPION
                                                    </h3>
                                                </div>

                                                <div className="relative group">
                                                    {/* Glow Effect */}
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />

                                                    <div className="relative bg-[#1a1d2e] border-2 border-amber-500/50 rounded-2xl p-3 md:p-6 min-w-[120px] md:min-w-[240px] shadow-2xl flex flex-col items-center gap-2 md:gap-3">
                                                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                                                            <Trophy size={24} className="text-black md:hidden" strokeWidth={2.5} />
                                                            <Trophy size={40} className="text-black hidden md:block" strokeWidth={2.5} />
                                                        </div>

                                                        <div className="text-center space-y-0.5 md:space-y-1">
                                                            <span className="block text-[8px] md:text-[10px] text-amber-500/70 font-black uppercase tracking-widest">Grand Winner</span>
                                                            <h2 className="text-sm md:text-2xl font-black text-white uppercase tracking-tight truncate max-w-[100px] md:max-w-[220px]">
                                                                {winnerPlayer.name}
                                                            </h2>
                                                        </div>

                                                        <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-1.5 bg-amber-500/10 rounded-full border border-amber-500/20">
                                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: winnerPlayer.color }} />
                                                            <span className="text-[8px] md:text-[10px] font-bold text-amber-200 uppercase tracking-widest">Dominating</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <footer className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>Live Matches</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-600 rounded-full" />
                    <span>Upcoming / TBD</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <Info size={14} />
                    <span>Double Elimination Format</span>
                </div>
            </footer>
        </div>
    );
};

export default TournamentBracketView;
