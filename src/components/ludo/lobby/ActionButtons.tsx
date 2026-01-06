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
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mx-auto mt-8">
            <button
                onClick={onLeave}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 transition-all duration-200 bg-white"
            >
                <LogOut size={20} />
                Leave Room
            </button>

            {isHost ? (
                <button
                    onClick={onStart}
                    disabled={!canStart}
                    className={cn(
                        "w-full sm:w-auto flex-[2] flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-200 transform",
                        canStart
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/25 hover:-translate-y-0.5"
                            : "bg-gray-300 cursor-not-allowed text-gray-500 shadow-none"
                    )}
                >
                    <Play size={20} className={cn(canStart && "fill-current")} />
                    Start Game
                </button>
            ) : (
                <div className="flex-[2] flex items-center justify-center px-6 py-4 text-gray-400 font-medium italic">
                    Waiting for host to start...
                </div>
            )}
        </div>
    );
};

export default ActionButtons;
