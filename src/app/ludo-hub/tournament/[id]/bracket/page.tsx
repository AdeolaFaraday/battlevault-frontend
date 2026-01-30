"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTournamentBracket } from '@/src/hooks/ludo/useTournamentBracket';
import TournamentBracketView from '@/src/components/ludo/hub/bracket/TournamentBracketView';
import { Loader2, ArrowLeft, RefreshCcw } from 'lucide-react';

export default function TournamentBracketPage() {
    const params = useParams();
    const router = useRouter();
    const tournamentId = params?.id as string;

    const { bracket, loading, error, refetch } = useTournamentBracket(tournamentId);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f111a] flex flex-col items-center justify-center gap-4">
                <Loader2 size={48} className="text-amber-500 animate-spin" />
                <p className="text-amber-200/50 font-bold uppercase tracking-widest text-sm">Synchronizing Bracket...</p>
            </div>
        );
    }

    if (error || !bracket) {
        return (
            <div className="min-h-screen bg-[#0f111a] flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl max-w-md">
                    <h2 className="text-2xl font-black text-white mb-2 uppercase">Sync Failed</h2>
                    <p className="text-slate-400 mb-6">
                        {error?.message || "We couldn't retrieve the tournament bracket at this time."}
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => refetch()}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-black rounded-xl hover:bg-slate-200 transition-all uppercase text-xs tracking-widest"
                        >
                            <RefreshCcw size={16} /> Try Again
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-white font-black rounded-xl hover:bg-white/10 transition-all uppercase text-xs tracking-widest"
                        >
                            <ArrowLeft size={16} /> Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="relative">
            <button
                onClick={() => router.back()}
                className="absolute top-8 left-8 z-50 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-white/50 hover:text-white group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <TournamentBracketView bracket={bracket} />
        </main>
    );
}
