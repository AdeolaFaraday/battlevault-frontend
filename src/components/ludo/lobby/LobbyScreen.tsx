"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import VersusAvatar from './VersusAvatar';
import ActionButtons from './ActionButtons';
import { cn } from '../../../lib/utils';
import { Swords, Trophy, Dices } from 'lucide-react';
import { useGameSession } from '@/src/hooks/useGameSession';
import { useAppSelector } from '@/src/lib/redux/hooks';
import { RootState } from '@/src/lib/redux/store';
import GuestNameModal from './GuestNameModal';

interface LobbyScreenProps {
    gameId?: string;
}

const LobbyScreen = ({ gameId }: LobbyScreenProps) => {
    const router = useRouter();
    const { loggedInUserDetails } = useAppSelector((state: RootState) => state.auth);

    // Construct player object only if user details exist (auth or guest)
    const player = loggedInUserDetails ? {
        id: loggedInUserDetails._id,
        name: `${loggedInUserDetails.firstName} ${loggedInUserDetails.lastName}`.trim(),
        color: "red", // Default color
        tokens: []
    } : undefined;

    // Only join session if we have player info
    const { gameState, loading, error } = useGameSession({
        gameId: gameId || "",
        player: player || { id: "", name: "", color: "", tokens: [] }
    });

    // Check for guest modal requirement
    const showGuestModal = !loggedInUserDetails;

    // Auto-redirect when game is full (2 players)
    useEffect(() => {
        if (gameState?.players && gameState.players.length === 2 && gameId) {
            router.push(`/ludo/${gameId}`);
        }
    }, [gameState?.players, gameId, router]);

    // Derived State from Game Session
    // We try to find the player that matches our ID to label as "You"
    // If not found (e.g. spectator), we just show players as is

    // IMPORTANT: Game State is the Source of Truth
    // Slot 1 (Host/Player 1)
    const player1 = gameState?.players[0];
    // Slot 2 (Opponent/Player 2)
    const player2 = gameState?.players[1];

    const isPlayer1Me = player1?.id === player?.id;
    const isPlayer2Me = player2?.id === player?.id;


    const currentUserDisplay = player1 ? {
        name: `${player1.name} ${isPlayer1Me ? '(You)' : ''}`.trim(),
        isReady: true,
        avatarUrl: ''
    } : undefined;

    const opponentDisplay = player2 ? {
        name: `${player2.name} ${isPlayer2Me ? '(You)' : ''}`.trim(),
        isReady: true,
        avatarUrl: ''
    } : undefined;

    // Game Mode State: 'tournament' | 'free'
    const [gameMode] = useState<'tournament' | 'free'>('tournament');

    const isHost = isPlayer1Me; // Simple host logic: first player is host
    const canStart = !!player2; // Can start if opponent is present

    const handleStartGame = () => {
        if (gameId) {
            router.push(`/ludo/${gameId}`);
        }
    };

    const handleLeaveRoom = () => {
        console.log("Leaving room...");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1a1d2e] overflow-hidden relative font-sans">

            <GuestNameModal isOpen={showGuestModal} gameId={gameId || 'lobby'} />

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
                        <VersusAvatar player={currentUserDisplay} />
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
                        <VersusAvatar player={opponentDisplay} isOpponent={true} />
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

            {/* Debug Info */}
            <div className="absolute top-4 left-4 text-white/50 text-xs">
                {loading && <p>Joining game...</p>}
                {error && <p className="text-red-400">Error: {error.message}</p>}
                {gameState && <p>Game ID: {gameState.id} | Status: {gameState.status}</p>}
            </div>
        </div>
    );
};

export default LobbyScreen;
