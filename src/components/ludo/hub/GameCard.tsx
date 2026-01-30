"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { safeFormat } from '../../../utils/date-utils';
import { Game } from '@/src/hooks/useGameSession';
import { cn } from '../../../lib/utils';

interface GameCardProps {
    game: Game;
    onClick: () => void;
    className?: string;
}

const GameCard = ({ game, onClick, className }: GameCardProps) => {
    return (
        <div
            className={cn(
                "bg-[#24283b] hover:bg-[#2a2e42] border border-white/5 rounded-xl p-4 transition-colors cursor-pointer group",
                className
            )}
            onClick={onClick}
        >
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">
                        {game?.name || 'Unknown Game'}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded">
                            {safeFormat(+game.createdAt, 'EEE')}
                        </span>
                        <span>{safeFormat(+game.createdAt, 'h:mm a')}</span>
                    </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all text-slate-500">
                    <ChevronRight size={16} />
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>2-Player Classic</span>
                <span>{game.players.length}/2 Registered</span>
            </div>
        </div>
    );
};

export default GameCard;
