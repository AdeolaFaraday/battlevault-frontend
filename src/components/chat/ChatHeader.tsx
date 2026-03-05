import React from 'react';
import { ArrowLeft, MoreVertical } from 'lucide-react';

interface ChatHeaderProps {
    recipient: {
        id: string | undefined;
        name: string;
        avatar: string | null | undefined;
        userName: string | undefined;
    };
    onBack?: () => void;
}

const ChatHeader = ({ recipient, onBack }: ChatHeaderProps) => {
    return (
        <div className="h-16 border-b border-white/5 bg-[#1a1d2e]/80 backdrop-blur-xl px-4 flex items-center justify-between shrink-0 absolute top-0 left-0 right-0 z-20">
            <div className="flex items-center gap-3">
                <button
                    onClick={onBack}
                    className="md:hidden w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center -ml-2 text-slate-300"
                >
                    <ArrowLeft size={20} />
                </button>

                <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden border-2 border-indigo-500/30">
                    <img
                        src={recipient.avatar || '/default-avatar.png'}
                        alt={recipient.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://ui-avatars.com/api/?name=' + recipient.name;
                        }}
                    />
                </div>
                <div>
                    <h3 className="text-white font-bold text-sm tracking-tight">{recipient.name}</h3>
                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Active Now</p>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <button className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-slate-400 transition-colors">
                    <MoreVertical size={20} />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
