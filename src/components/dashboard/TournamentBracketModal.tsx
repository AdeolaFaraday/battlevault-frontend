import React from "react";
import { FiX, FiUsers, FiCheckCircle, FiPlay } from "react-icons/fi";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TOURNAMENT_BRACKET } from "../../graphql/game/queries";
import { START_TOURNAMENT, ADVANCE_USER_IN_TOURNAMENT } from "../../graphql/admin/mutations";
import { toast } from "sonner";
import LogoIcon from "../common/icons/Logo";
import { BracketGame as BracketGameType, BracketPlayer } from "@/src/types/tournament";

interface TournamentBracketModalProps {
    tournamentId: string | null;
    isOpen: boolean;
    onClose: () => void;
}
interface Stage {
    _id: string;
    name: string;
    index: number;
    games: BracketGameType[];
}

export default function TournamentBracketModal({
    tournamentId,
    isOpen,
    onClose,
}: TournamentBracketModalProps) {
    const { data, loading, error, refetch } = useQuery(GET_TOURNAMENT_BRACKET, {
        variables: { tournamentId },
        skip: !isOpen || !tournamentId,
    });

    const [startTournament, { loading: startingTournament }] = useMutation(START_TOURNAMENT, {
        onCompleted: (data) => {
            if (data?.startTournament?.success) {
                toast.success("Tournament Started successfully");
                refetch();
            } else {
                toast.error(data?.startTournament?.message || "Failed to start tournament");
            }
        },
        onError: (err) => {
            toast.error(err.message || "An error occurred");
        }
    });

    const [advanceUser, { loading: advancingUser }] = useMutation(ADVANCE_USER_IN_TOURNAMENT, {
        onCompleted: (data) => {
            if (data?.advanceUserInTournament?.success) {
                toast.success("User advanced successfully");
                refetch();
            } else {
                toast.error(data?.advanceUserInTournament?.message || "Failed to advance user");
            }
        },
        onError: (err) => {
            toast.error(err.message || "An error occurred");
        }
    });

    const handleStartTournament = () => {
        if (!tournamentId) return;
        startTournament({ variables: { tournamentId } });
    };

    const handleAdvanceUser = (userId: string) => {
        if (!tournamentId || !userId) return;
        advanceUser({ variables: { tournamentId, userId } });
    };

    if (!isOpen) return null;

    const bracketData = data?.getTournamentBracket?.data;
    const stages = bracketData?.stages || [];
    const tournamentTitle = bracketData?.tournament?.title || "Tournament Bracket";
    const tournamentStatus = bracketData?.tournament?.status || "UPCOMING";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 text-white">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-6xl h-[85vh] bg-[#0A0A0A] rounded-3xl border border-white/10 shadow-[0_0_80px_-12px_rgba(255,255,255,0.1)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-black relative z-20">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-white/5">
                            <LogoIcon width="32" height="32" className="text-black" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-white uppercase">{tournamentTitle}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live Bracket View</p>
                                <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full
                                    ${tournamentStatus === 'ACTIVE' ? 'bg-white text-black' :
                                        tournamentStatus === 'COMPLETED' ? 'bg-gray-800 text-gray-400' :
                                            'bg-white/10 text-white'}
                                `}>
                                    {tournamentStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {tournamentStatus === 'UPCOMING' && (
                            <button
                                onClick={handleStartTournament}
                                disabled={startingTournament}
                                className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-gray-200 disabled:bg-gray-400 text-black text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-xl active:scale-95"
                            >
                                {startingTournament ? (
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <FiPlay className="w-4 h-4 fill-current" />
                                )}
                                Start Tournament
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:scale-105 active:scale-95"
                        >
                            <FiX className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Bracket Content Area */}
                <div className="flex-1 overflow-auto bg-[#0A0A0A] relative">
                    <div className="p-10 min-h-full min-w-max flex gap-16 relative z-10">
                        {loading ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="relative w-16 h-16">
                                    <div className="absolute inset-0 rounded-full border-2 border-white/5"></div>
                                    <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin"></div>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="w-full absolute inset-0 flex items-center justify-center text-center">
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-sm">
                                    <div className="text-white font-black uppercase tracking-widest mb-3">Fetch Error</div>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">{error.message}</p>
                                </div>
                            </div>
                        ) : stages.length === 0 ? (
                            <div className="w-full absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <FiUsers className="w-16 h-16 mx-auto mb-6 opacity-10 text-white" />
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Bracket Generation Pending</p>
                                </div>
                            </div>
                        ) : (
                            stages.map((stage: Stage, stageIdx: number) => (
                                <div key={stage._id} className="flex flex-col flex-1 min-w-[340px]">
                                    <div className="text-center mb-10 bg-white/5 py-3 rounded-2xl border border-white/5 sticky top-0 z-20 backdrop-blur-md shadow-xl">
                                        <h3 className="font-black text-white uppercase tracking-[0.3em] text-[10px]">
                                            {stage.name}
                                        </h3>
                                    </div>

                                    <div className="flex-1 flex flex-col justify-around gap-12">
                                        {stage.games.map((game: BracketGameType, gameIdx: number) => (
                                            <div
                                                key={game._id}
                                                className="relative group w-full"
                                            >
                                                {/* Connector Line to Next Stage */}
                                                {stageIdx < stages.length - 1 && (
                                                    <div className="absolute top-1/2 -right-8 w-8 h-[1px] bg-white/10 z-0"></div>
                                                )}

                                                <div className="bg-[#111] rounded-3xl border border-white/5 hover:border-white/20 shadow-2xl overflow-hidden transition-all duration-500 relative z-10 group-hover:-translate-y-1">
                                                    {/* Match Header */}
                                                    <div className="bg-white/5 px-5 py-3 border-b border-white/5 flex justify-between items-center">
                                                        <span className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase">
                                                            Match {gameIdx + 1}
                                                        </span>
                                                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full
                                                            ${game.status === 'COMPLETED' ? 'bg-white text-black' : 'bg-white/10 text-white'}
                                                        `}>
                                                            {game.status}
                                                        </span>
                                                    </div>

                                                    {/* Players */}
                                                    <div className="p-2 space-y-1">
                                                        {game.players.slice(0, 2).map((player: BracketPlayer, idx: number) => {
                                                            const isWinner = game.winner === player.id;
                                                            const indicatorColor = idx === 0 ? '#ef4444' : '#3b82f6';
                                                            return (
                                                                <div
                                                                    key={player.id}
                                                                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group/player
                                                                        ${isWinner ? 'bg-white/10 ring-1 ring-white/20' : 'hover:bg-white/5'}
                                                                    `}
                                                                >
                                                                    <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shrink-0 border border-white/10 relative">
                                                                        <span className="text-xs font-black text-white">{player.name.charAt(0).toUpperCase()}</span>
                                                                        <div
                                                                            className="absolute -top-1 -left-1 w-3 h-3 rounded-full border-2 border-black"
                                                                            style={{ backgroundColor: indicatorColor }}
                                                                        />
                                                                        {isWinner && (
                                                                            <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full p-0.5 ring-2 ring-black">
                                                                                <FiCheckCircle className="w-4 h-4 text-black" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className={`text-sm font-black tracking-tight truncate ${isWinner ? 'text-white' : 'text-gray-400'}`}>
                                                                            {player.name}
                                                                        </div>
                                                                    </div>
                                                                    {!isWinner && game.status !== 'COMPLETED' && tournamentStatus === 'ONGOING' && (
                                                                        <button
                                                                            onClick={() => handleAdvanceUser(player.id)}
                                                                            disabled={advancingUser}
                                                                            className="px-3 py-1.5 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest transition-all opacity-0 group-hover/player:opacity-100 hover:scale-105 active:scale-95 disabled:opacity-50"
                                                                            title="Advance Participant"
                                                                        >
                                                                            Advance
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}

                                                        {/* Empty slot */}
                                                        {Array.from({ length: Math.max(0, 2 - game.players.length) }).map((_, idx) => {
                                                            const actualIdx = game.players.length + idx;
                                                            const indicatorColor = actualIdx === 0 ? '#ef4444' : '#3b82f6';
                                                            return (
                                                                <div key={`empty-${actualIdx}`} className="flex items-center gap-4 p-4 rounded-2xl border border-dashed border-white/5 opacity-30">
                                                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 relative">
                                                                        <div
                                                                            className="absolute -top-1 -left-1 w-3 h-3 rounded-full border-2 border-black"
                                                                            style={{ backgroundColor: indicatorColor }}
                                                                        />
                                                                    </div>
                                                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Awaiting Player</div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
