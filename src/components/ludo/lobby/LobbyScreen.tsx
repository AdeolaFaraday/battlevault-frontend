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
        <div className="min-h-screen flex items-center justify-center bg-[#1a1d2e] overflow-hidden relative font-sans">

            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-4xl px-4 relative z-10 flex flex-col h-screen md:h-auto justify-center">

                {/* Header / Game Type */}
                <div className="flex flex-col items-center mb-8 md:mb-16 mt-8 md:mt-0">
                    <span className="text-slate-400 font-bold tracking-[0.3em] text-[10px] md:text-sm mb-3 uppercase">
                        Battle Arena
                    </span>

                    {/* Game Mode Badge */}
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 transform scale-90 md:scale-100",
                        gameMode === 'tournament'
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-amber-500/10"
                            : "bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-blue-500/10"
                    )}>
                        {gameMode === 'tournament' ? (
                            <Trophy size={16} className="fill-current" />
                        ) : (
                            <Dices size={16} />
                        )}
                        <span className="font-bold text-xs md:text-base tracking-wide uppercase">
                            {gameMode === 'tournament' ? "Tournament Match" : "Free Play"}
                        </span>
                    </div>
                </div>

                {/* Main Battle Area */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 w-full">

                    {/* Player 1 (You) */}
                    <div className="flex-1 flex justify-center md:justify-end md:pr-16 w-full md:w-auto">
                        <VersusAvatar player={currentUser} />
                    </div>

                    {/* VS Badge - Center */}
                    <div className="relative flex-shrink-0 flex items-center justify-center scale-90 md:scale-110 z-20">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#131522] flex items-center justify-center shadow-xl relative z-10 border-2 border-white/10 group">
                            <Swords size={28} className="text-white/80 md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        {/* Glowing Rings */}
                        <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-[spin_4s_linear_infinite]" />
                        <div className="absolute -inset-2 rounded-full border border-purple-500/20 animate-[spin_6s_linear_infinite_reverse]" />

                        {/* Restored Pulse Effect */}
                        <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20" />

                        <span className="absolute -bottom-8 font-black text-slate-500 text-sm tracking-[0.2em]">
                            VS
                        </span>
                    </div>

                    {/* Player 2 (Opponent) */}
                    <div className="flex-1 flex justify-center md:justify-start md:pl-16 w-full md:w-auto">
                        <VersusAvatar player={opponent} isOpponent={true} />
                    </div>

                </div>

                {/* Action Footer */}
                <div className="mt-12 md:mt-24 flex justify-center w-full pb-8 md:pb-0">
                    <div className="w-full max-w-[300px] md:max-w-md">
                        <ActionButtons
                            onStart={handleStartGame}
                            onLeave={handleLeaveRoom}
                            canStart={canStart}
                            isHost={isHost}
                        />
                    </div>
                </div>

            </div>

            {/* Debug Button (Remove in Prod) */}
            {/* <div className="absolute top-4 right-4 md:bottom-4 md:top-auto">
                    <button
                        onClick={handleSimulateJoin}
                        className="text-[10px] text-slate-600 hover:text-slate-400 transition-colors border border-slate-700/50 px-2 py-1 rounded"
                    >
                        [Simulate Opponent]
                    </button>
                </div> */}

        </div>
    );
};

export default LobbyScreen;
