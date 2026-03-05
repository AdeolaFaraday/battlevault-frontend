import React from 'react';
import { format } from 'date-fns';
import { CheckCheck, AlertCircle, Loader2 } from 'lucide-react';
import { PendingMessage } from '@/src/hooks/chat/useActiveConversation';
import { ChatMessage } from '@/src/hooks/chat/useChatMessages';

interface MessageBubbleProps {
    message: ChatMessage | PendingMessage;
    isMine: boolean;
}

interface timestampType {
    toMillis?: () => number;
    seconds?: number;
}

const MessageBubble = ({ message, isMine }: MessageBubbleProps) => {
    const pendingStatus = (message as PendingMessage).status;

    const getMs = (t: timestampType) => {
        if (!t) return Date.now();
        if (typeof t === 'number') return t;
        if (t.toMillis) return t.toMillis();
        if (t.seconds) return t.seconds * 1000;
        return new Date(t as string).getTime() || Date.now();
    };

    const timestamp = getMs(message.timestamp as timestampType);

    return (
        <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-4 group`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2 relative shadow-lg ${isMine
                ? 'bg-indigo-600 text-white rounded-tr-sm'
                : 'bg-[#1e2235] text-slate-200 rounded-tl-sm border border-white/5'
                }`}>
                <p className="text-sm font-medium whitespace-pre-wrap break-words">{message.text}</p>
                <div className={`flex items-center gap-1 mt-1 justify-end ${isMine ? 'text-indigo-200' : 'text-slate-500'}`}>
                    <span className="text-[10px] font-bold">
                        {format(new Date(timestamp), 'HH:mm')}
                    </span>
                    {isMine && (
                        <div className="flex items-center gap-1">
                            {pendingStatus === 'sending' ? (
                                <Loader2 size={12} className="animate-spin opacity-70" />
                            ) : pendingStatus === 'error' ? (
                                <div className="flex items-center gap-0.5 text-red-400">
                                    <AlertCircle size={12} />
                                    <span className="text-[8px] font-black uppercase">Failed</span>
                                </div>
                            ) : (
                                <CheckCheck size={14} className={message.read ? 'text-blue-300' : 'opacity-70'} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
