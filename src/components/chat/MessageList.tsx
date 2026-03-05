import React from 'react';
import { format } from 'date-fns';
import MessageBubble from './MessageBubble';
import { ChatMessage } from '@/src/hooks/chat/useChatMessages';
import { PendingMessage } from '@/src/hooks/chat/useActiveConversation';

interface MessageListProps {
    messages: (ChatMessage | PendingMessage)[];
    messagesLoading: boolean;
    currentUser: TCommonResponseData;
    recipientName: string;
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

interface timestampType {
    toMillis?: () => number;
    seconds?: number;
}

const MessageList = ({
    messages,
    messagesLoading,
    currentUser,
    recipientName,
    messagesEndRef
}: MessageListProps) => {

    const getMs = (t: timestampType) => {
        if (!t) return Date.now();
        if (typeof t === 'number') return t;
        if (t.toMillis) return t.toMillis();
        if (t.seconds) return t.seconds * 1000;
        return new Date(t as string).getTime() || Date.now();
    };

    const renderMessageDate = (timestamp: number) => {
        const dateString = format(new Date(timestamp), 'MMM d, yyyy');
        return (
            <div className="flex justify-center my-4" key={`date-${timestamp}`}>
                <span className="bg-slate-800/50 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-full border border-white/5 uppercase tracking-widest">
                    {dateString}
                </span>
            </div>
        );
    };

    if (messagesLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-center opacity-50">
                <p className="text-slate-300 font-medium">Say hello to {recipientName}!</p>
                <p className="text-xs font-bold text-slate-500 uppercase mt-2 tracking-widest">This is the start of your conversation</p>
            </div>
        );
    }

    let lastDate = '';

    return (
        <div className="flex-1 overflow-y-auto p-4 pt-20 pb-24 scrollbar-hide space-y-4">
            {messages.map((msg) => {
                const isMine = msg.senderId === currentUser._id;
                const ms = getMs(msg.timestamp as timestampType);
                const msgDate = format(new Date(ms), 'yyyy-MM-dd');
                const showDate = msgDate !== lastDate;
                lastDate = msgDate;

                return (
                    <React.Fragment key={msg.id}>
                        {showDate && renderMessageDate(ms)}
                        <MessageBubble message={msg} isMine={isMine} />
                    </React.Fragment>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;
