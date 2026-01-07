import React from 'react';
import { Play, LogOut } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface ActionButtonsProps {
    onStart: () => void;
    onLeave: () => void;
    canStart: boolean;
    isHost: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onStart, onLeave, canStart, isHost }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <button
                onClick={onLeave}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 hover:text-white transition-all duration-200 bg-transparent order-2 sm:order-1"
            >
                <LogOut size={18} />
                Leave
            </button>

            {isHost ? (
                <button
                    onClick={onStart}
                    disabled={!canStart}
                    className={cn(
                        "w-full sm:w-auto flex-[2] flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-200 transform order-1 sm:order-2",
                        canStart
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-emerald-500/25 hover:-translate-y-0.5 active:translate-y-0"
                            : "bg-slate-800 cursor-not-allowed text-slate-500 shadow-none border border-white/5"
                    )}
                >
                    <Play size={20} className={cn(canStart ? "fill-current" : "opacity-50")} />
                    <span>Start Match</span>
                </button>
            ) : (
                <div className="flex-[2] flex items-center justify-center px-6 py-4 text-slate-500 font-medium italic order-1 sm:order-2 border border-white/5 rounded-xl bg-white/5">
                    Waiting for host...
                </div>
            )}
        </div>
    );
};

export default ActionButtons;
