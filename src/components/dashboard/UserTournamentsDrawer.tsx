"use client";

import React, { useEffect, useState } from "react";
import { FiX, FiAward, FiCalendar, FiClock } from "react-icons/fi";
import { useQuery } from "@apollo/client";
import { GET_TOURNAMENTS } from "../../graphql/game/queries";
import { Tournament } from "@/src/constants/game";

interface UserTournamentsDrawerProps {
    userId: string | null;
    isOpen: boolean;
    onClose: () => void;
    onTournamentSelect: (tournamentId: string) => void;
}

export default function UserTournamentsDrawer({
    userId,
    isOpen,
    onClose,
    onTournamentSelect,
}: UserTournamentsDrawerProps) {
    // Using the general GET_TOURNAMENTS query for now as per requirements.
    // We will filter or simulate user tournaments until a specific query is given.
    const { data, loading, error } = useQuery(GET_TOURNAMENTS, {
        skip: !isOpen || !userId,
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const tournaments = data?.getTournaments?.data?.tournaments || [];

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-[#0A0A0A] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out z-[90] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between px-6 py-6 border-b border-white/5 bg-black">
                    <div>
                        <h3 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tight">
                            User Tournaments
                        </h3>
                        <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-widest">Participation History</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent bg-[#0A0A0A]">
                    {loading ? (
                        <div className="flex space-y-4 flex-col">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="animate-pulse bg-white/5 h-28 rounded-2xl w-full border border-white/5"></div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-10">
                            <div className="text-white font-black uppercase tracking-widest text-xs mb-2">Error Loading Data</div>
                            <p className="text-sm text-gray-500">{error.message}</p>
                        </div>
                    ) : tournaments.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                                <FiAward className="w-8 h-8 text-gray-600" />
                            </div>
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-1">No History</h4>
                            <p className="text-sm text-gray-500">This user hasn&apos;t joined any tournaments.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {tournaments.map((tournament: Tournament) => (
                                <div
                                    key={tournament._id}
                                    onClick={() => onTournamentSelect(tournament._id)}
                                    className="bg-[#111] hover:bg-[#161616] border border-white/5 hover:border-white/20 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-1 shadow-lg group relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start mb-3 relative z-10">
                                        <div>
                                            <h4 className="font-black text-white text-lg group-hover:text-white transition-colors uppercase tracking-tight">
                                                {tournament.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 font-medium line-clamp-1 mt-0.5">
                                                {tournament.description || "No description provided"}
                                            </p>
                                        </div>
                                        <span
                                            className={`text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest
                                                ${tournament.status === 'ACTIVE' ? 'bg-white text-black' :
                                                    tournament.status === 'COMPLETED' ? 'bg-gray-800 text-gray-400' :
                                                        'bg-white/10 text-white'
                                                }
                                            `}
                                        >
                                            {tournament.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-4 relative z-10">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 bg-black p-2 rounded-xl border border-white/5">
                                            <FiCalendar className="text-white shrink-0" />
                                            <span className="truncate uppercase tracking-wider">
                                                {new Date(Number(tournament.startDate)).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 bg-black p-2 rounded-xl border border-white/5">
                                            <FiClock className="text-white shrink-0" />
                                            <span className="truncate uppercase tracking-wider">
                                                {tournament.frequency}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                                        <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                            {tournament.registeredUsers?.length || 0} / {tournament.maxUsers || '∞'} Players
                                        </div>
                                        <div className="text-xs font-black text-white bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 group-hover:bg-white group-hover:text-black transition-all uppercase tracking-widest">
                                            {tournament.prize?.amount} {tournament.prize?.currency}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
