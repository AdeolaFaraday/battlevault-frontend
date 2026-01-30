import React from 'react';
import { cn } from '@/src/lib/utils';

interface StageConnectorsProps {
    gameCount: number; // Number of games in the NEXT stage (number of braces to draw)
    className?: string;
}

const StageConnectors: React.FC<StageConnectorsProps> = ({ gameCount, className }) => {
    return (
        <div className={cn("flex flex-col w-6 md:w-24 shrink-0", className)}>
            {/* Spacer to align with BracketStage header (Header height + Gap) */}
            <div className="h-[46px] md:h-[70px] shrink-0" />

            {/* Connector container matching the distribution logic of BracketStage */}
            <div className="flex flex-col justify-around flex-grow py-2 md:py-4">
                {Array.from({ length: gameCount }).map((_, i) => (
                    <div key={i} className="relative w-full flex-grow flex items-center justify-center">
                        <svg
                            className="w-full h-full min-h-[80px] md:min-h-[120px]"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M 0,25 L 50,25 L 50,75 L 0,75 M 50,50 L 100,50"
                                stroke="rgba(255, 255, 255, 0.1)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StageConnectors;
