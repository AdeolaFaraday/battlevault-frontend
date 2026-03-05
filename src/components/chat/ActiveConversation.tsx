import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Image as ImageIcon, MoreVertical, CheckCheck } from 'lucide-react';
import { useChatMessages } from '@/src/hooks/chat/useChatMessages';
import { useCreateMessage } from '@/src/api/chat/useCreateMessage';
import { useMarkChatAsRead } from '@/src/api/chat/useMarkChatAsRead';
import { ChatThread } from '@/src/api/chat/useGetChatList';
import { format } from 'date-fns';

interface ActiveConversationProps {
    chatId: string;
    chats: ChatThread[];
    currentUser: TCommonResponseData;
    onBack?: () => void;
}

const ActiveConversation = ({ chatId, chats, currentUser, onBack }: ActiveConversationProps) => {
    const { messages, loading: messagesLoading } = useChatMessages(chatId);
    const { sendMessage, loading: sending } = useCreateMessage();
    const { markAsRead } = useMarkChatAsRead();
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Mark as read when opening
    useEffect(() => {
        if (chatId) {
            markAsRead(chatId);
        }
    }, [chatId]);

    // Identify the recipient using the ChatThread details if it exists.
    // If it's a new chat not yet in the list, we might just have the ID 
    // from the search modal we can parse, or we wait for backend to resolve it.
    const currentChat = chats.find(c => c.id === chatId);

    // Deduce recipientId. If chat exists, find the other participant. 
    // If chat is mocked (e.g., from Search), we extract the other ID from the chatId string (userId1_userId2).
    const getRecipientDetails = () => {
        if (currentChat) {
            const participant = currentChat.participantDetails.find(p => p.id !== currentUser._id);
            return {
                id: participant?.id,
                name: `${participant?.firstName} ${participant?.lastName}`,
                avatar: participant?.avatar,
                userName: participant?.userName
            };
        }

        // Fallback for new chats
        const ids = chatId.split('_');
        const recipientId = ids.find(id => id !== currentUser._id);
        return {
            id: recipientId,
            name: 'New User',
            avatar: null,
            userName: ''
        };
    };

    const recipient = getRecipientDetails();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || !recipient.id) return;

        const text = inputText.trim();
        setInputText(''); // optimistic clear

        await sendMessage(recipient.id, text);
    };

    // Helper for message grouping by date
    const renderMessageDate = (timestamp: number) => {
        const dateString = format(new Date(timestamp), 'MMM d, yyyy');
        return (
            <div className="flex justify-center my-4">
                <span className="bg-slate-800/50 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-full border border-white/5 uppercase tracking-widest">
                    {dateString}
                </span>
            </div>
        );
    };

    let lastDate = '';

    return (
        <div className="flex flex-col h-full bg-[#24283b] w-full relative overflow-hidden">
            {/* Chat Header */}
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

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 pt-20 pb-24 scrollbar-hide space-y-4">
                {messagesLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center opacity-50">
                        <p className="text-slate-300 font-medium">Say hello to {recipient.name}!</p>
                        <p className="text-xs font-bold text-slate-500 uppercase mt-2 tracking-widest">This is the start of your conversation</p>
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isMine = msg.senderId === currentUser._id;
                        const msgDate = format(new Date(msg.timestamp), 'yyyy-MM-dd');
                        const showDate = msgDate !== lastDate;
                        lastDate = msgDate;

                        return (
                            <React.Fragment key={msg.id}>
                                {showDate && renderMessageDate(msg.timestamp)}
                                <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-4 group`}>
                                    <div className={`max-w-[75%] rounded-2xl px-4 py-2 relative shadow-lg ${isMine
                                        ? 'bg-indigo-600 text-white rounded-tr-sm'
                                        : 'bg-[#1e2235] text-slate-200 rounded-tl-sm border border-white/5'
                                        }`}>
                                        <p className="text-sm font-medium whitespace-pre-wrap break-words">{msg.text}</p>
                                        <div className={`flex items-center gap-1 mt-1 justify-end ${isMine ? 'text-indigo-200' : 'text-slate-500'}`}>
                                            <span className="text-[10px] font-bold">
                                                {format(new Date(msg.timestamp), 'HH:mm')}
                                            </span>
                                            {isMine && (
                                                <CheckCheck size={14} className={msg.read ? 'text-blue-300' : 'opacity-70'} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#24283b] via-[#24283b] to-transparent shrink-0">
                <form
                    onSubmit={handleSend}
                    className="flex items-center gap-2 bg-[#1a1d2e] border border-white/10 rounded-full p-1 pl-4 shadow-xl backdrop-blur-md relative z-30"
                >
                    <button type="button" className="text-slate-400 hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-white/5">
                        <ImageIcon size={20} />
                    </button>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Message..."
                        className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none focus:ring-0 placeholder-slate-500 font-medium"
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim() || sending}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${inputText.trim() && !sending
                            ? 'bg-indigo-500 text-white hover:bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:scale-105'
                            : 'bg-white/5 text-slate-500 cursor-not-allowed'
                            }`}
                    >
                        {sending ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Send size={16} className="ml-0.5" />
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ActiveConversation;
