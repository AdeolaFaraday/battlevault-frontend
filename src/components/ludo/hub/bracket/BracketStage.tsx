import React from 'react';
import { BracketStage as BracketStageType } from '@/src/types/tournament';
import BracketGame from './BracketGame';
import { cn } from '@/src/lib/utils';

interface BracketStageProps {
    stage: BracketStageType;
    className?: string;
}

const BracketStage: React.FC<BracketStageProps> = ({ stage, className }) => {
    return (
        <div className={cn("flex flex-col gap-4 md:gap-8 items-center self-stretch", className)}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 md:px-6 py-1 md:py-2 shadow-lg h-[30px] md:h-[38px] flex items-center justify-center">
                <h3 className="text-[10px] md:text-sm font-black text-amber-100 uppercase tracking-[0.2em] leading-none">
                    {stage.name}
                </h3>
            </div>

            <div className="flex flex-col justify-around flex-grow gap-4 md:gap-6 w-full py-2 md:py-4">
                {stage.games.map((game, idx) => (
                    <div key={game._id || idx} className="relative flex items-center justify-center flex-grow">
                        <BracketGame game={game} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BracketStage;
