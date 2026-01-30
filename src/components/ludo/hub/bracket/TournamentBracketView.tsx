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
    return (
        <div className={cn("w-full min-h-screen bg-[#0f111a] text-white p-6 md:p-10", className)}>
            <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-amber-500/20 p-2 rounded-lg border border-amber-500/30">
                            <Trophy className="text-amber-500" size={24} />
                        </div>
                        <span className="text-amber-500 font-black tracking-widest text-xs uppercase">Tournament Arena</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">
                        {bracket.tournament.title}
                    </h1>
                    <p className="text-slate-400 font-medium max-w-2xl">
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
                    {([...bracket?.stages || []].sort((a, b) => a.index - b.index) as Stage[]).map((stage, idx, allStages) => (
                        <React.Fragment key={stage._id || idx}>
                            <BracketStage stage={stage} className="shrink-0" />
                            {idx < allStages.length - 1 && (
                                <StageConnectors
                                    gameCount={allStages[idx + 1].games.length}
                                    className="flex"
                                />
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
