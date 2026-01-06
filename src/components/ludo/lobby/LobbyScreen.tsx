"use client";

import React, { useState } from 'react';
import VersusAvatar from './VersusAvatar';
import ActionButtons from './ActionButtons';
import { cn } from '../../../lib/utils';
import { Swords, Trophy, Dices } from 'lucide-react';

const LobbyScreen = () => {
    // Placeholder State for 1v1
    // Player 1 is current user (always present)
    const [currentUser] = useState({
        name: 'You',
        isReady: true,
        avatarUrl: ''
    });

    // Player 2 (Opponent) - simulates joining after delay or waiting
    const [opponent, setOpponent] = useState<{ name: string; isReady: boolean; avatarUrl: '' } | undefined>(
        undefined // Start as undefined to show empty state
    );

    // Game Mode State: 'tournament' | 'free'
    const [gameMode] = useState<'tournament' | 'free'>('tournament');

    // Simulate opponent joining
    const handleSimulateJoin = () => {
        setOpponent({ name: 'Alex_Gamer', isReady: false, avatarUrl: '' });
    };

    const roomCode = "LUDO-8829";
    const isHost = true;
    const canStart = !!opponent && opponent.isReady; // Just for demo logic, can add ready check later

    const handleStartGame = () => {
        console.log("Starting game...");
    };

    const handleLeaveRoom = () => {
        console.log("Leaving room...");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden relative">

            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-4xl px-4 relative z-10">

                {/* Header / Game Type */}
                <div className="flex flex-col items-center mb-6 md:mb-16">
                    <span className="text-gray-400 font-bold tracking-[0.2em] text-[10px] md:text-sm mb-2 uppercase">
                        Battle Arena
                    </span>

                    {/* Game Mode Badge */}
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm backdrop-blur-md transition-all duration-300 transform scale-90 md:scale-100",
                        gameMode === 'tournament'
                            ? "bg-amber-50/80 border-amber-200 text-amber-700 shadow-amber-500/10"
                            : "bg-blue-50/80 border-blue-200 text-blue-700 shadow-blue-500/10"
                    )}>
                        {gameMode === 'tournament' ? (
                            <Trophy size={16} className="fill-amber-100" />
                        ) : (
                            <Dices size={16} />
                        )}
                        <span className="font-bold text-xs md:text-base tracking-wide uppercase">
                            {gameMode === 'tournament' ? "Tournament Match" : "Free Play"}
                        </span>
                    </div>
                </div>

                {/* Main Battle Area */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 w-full">

                    {/* Player 1 (You) */}
                    <div className="flex-1 flex justify-center md:justify-end md:pr-12 w-full md:w-auto">
                        <VersusAvatar player={currentUser} />
                    </div>

                    {/* VS Badge - Center */}
                    <div className="relative flex-shrink-0 flex items-center justify-center my-2 md:my-0 scale-75 md:scale-100">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-2xl relative z-10 border-4 border-white">
                            <Swords size={24} className="text-yellow-400 md:w-10 md:h-10" />
                        </div>
                        <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20" />
                        <span className="absolute -bottom-6 md:-bottom-10 left-1/2 -translate-x-1/2 font-black text-slate-300 text-sm md:text-lg tracking-widest opacity-50">
                            VS
                        </span>
                    </div>

                    {/* Player 2 (Opponent) */}
                    <div className="flex-1 flex justify-center md:justify-start md:pl-12 w-full md:w-auto">
                        <VersusAvatar player={opponent} isOpponent={true} />
                    </div>

                </div>

                {/* Action Footer */}
                <div className="mt-8 md:mt-20 flex justify-center w-full">
                    <div className="w-full max-w-[280px] md:max-w-md scale-90 md:scale-100 origin-top">
                        <ActionButtons
                            onStart={handleStartGame}
                            onLeave={handleLeaveRoom}
                            canStart={canStart}
                            isHost={isHost}
                        />
                    </div>
                </div>

                {/* Debug Button (Remove in Prod) */}
                <div className="absolute bottom-4 right-4">
                    <button
                        onClick={handleSimulateJoin}
                        className="text-xs text-slate-300 hover:text-slate-500 transition-colors"
                    >
                        [Simulate Opponent Join]
                    </button>
                </div>

            </div>
        </div>
    );
};

export default LobbyScreen;
