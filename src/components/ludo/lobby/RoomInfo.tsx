import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface RoomInfoProps {
    roomCode: string;
}

const RoomInfo: React.FC<RoomInfoProps> = ({ roomCode }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(roomCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-3 mb-8">
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                Room Code
            </div>
            <div
                className="group relative flex items-center bg-white border border-gray-200 rounded-xl pl-6 pr-2 py-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
                onClick={handleCopy}
            >
                <span className="text-3xl font-mono font-bold text-gray-800 tracking-wider mr-4">
                    {roomCode}
                </span>
                <button
                    className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
                        copied ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                    )}
                >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>

                {/* Tooltip confirmation */}
                <div className={cn(
                    "absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-xl pointer-events-none transition-all duration-200",
                    copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                )}>
                    Copied!
                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
            </div>
            <p className="text-xs text-gray-400 font-medium">
                Share this code with your friends to join
            </p>
        </div>
    );
};

export default RoomInfo;
