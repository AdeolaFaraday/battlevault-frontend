import React from 'react';
import { Search, Plus, MessageSquare } from 'lucide-react';
import { ChatThread } from '@/src/api/chat/useGetChatList';
import { useChatUnreadCounts } from '@/src/hooks/chat/useChatUnreadCounts';
import { formatDistanceToNow } from 'date-fns';

interface ChatListSectionProps {
    chats: ChatThread[];
    loading: boolean;
    selectedChatId: string | null;
    onSelectChat: (id: string) => void;
    onNewChat: () => void;
    currentUser: TCommonResponseData;
}

const ChatListSection = ({ chats, loading, selectedChatId, onSelectChat, onNewChat, currentUser }: ChatListSectionProps) => {
    const chatIds = chats.map(c => c.id);
    const rtUnreadCounts = useChatUnreadCounts(chatIds, currentUser?._id);

    const getOtherParticipant = (chat: ChatThread) => {
        return chat.participantDetails.find(p => p.id !== currentUser?._id) || chat.participantDetails[0];
    };

    return (
        <>
            <div className="p-4 border-b border-white/5 bg-[#1a1d2e]/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-black text-white px-2 tracking-tight">Messages</h2>
                    <button
                        onClick={onNewChat}
                        className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300 flex items-center justify-center transition-all shadow-[0_4px_15px_rgba(99,102,241,0.2)]"
                    >
                        <Plus size={20} />
                    </button>
                </div>

                <div className="relative group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 w-4 h-4 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full bg-[#1e2235]/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-medium placeholder-slate-500"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1 scrollbar-hide">
                {loading && chats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 gap-3">
                        <div className="w-6 h-6 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading Chats...</span>
                    </div>
                ) : chats.length === 0 ? (
                    <div className="text-center py-10 px-4">
                        <div className="w-16 h-16 bg-[#24283b] rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                            <MessageSquare className="w-8 h-8 text-slate-600" />
                        </div>
                        <p className="text-slate-400 font-medium text-sm">No conversations yet.</p>
                        <button
                            onClick={onNewChat}
                            className="mt-4 text-xs font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors"
                        >
                            Start a New Chat
                        </button>
                    </div>
                ) : (
                    chats.map(chat => {
                        const otherUser = getOtherParticipant(chat);
                        const isSelected = selectedChatId === chat.id;
                        // Use real-time count if available, otherwise fallback to GraphQL initial state
                        const unreadCount = rtUnreadCounts[chat.id] ?? chat.unreadCount;

                        return (
                            <button
                                key={chat.id}
                                onClick={() => onSelectChat(chat.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${isSelected
                                    ? 'bg-indigo-500/15 border-indigo-500/30 border'
                                    : 'hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                <div className="relative shrink-0">
                                    <img
                                        src={otherUser?.avatar || '/default-avatar.png'}
                                        alt={otherUser?.userName}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-[#1a1d2e] bg-slate-800"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = 'https://ui-avatars.com/api/?name=' + (otherUser?.firstName || 'A');
                                        }}
                                    />
                                    {unreadCount > 0 && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] font-black text-white border-2 border-[#1a1d2e]">
                                            {unreadCount}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`font-bold truncate text-sm ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                                            {otherUser?.firstName} {otherUser?.lastName}
                                        </span>
                                        {chat.lastMessageTimestamp && (
                                            <span className="text-[10px] text-slate-500 shrink-0 font-medium">
                                                {formatDistanceToNow(new Date(chat.lastMessageTimestamp), { addSuffix: false })}
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-xs truncate ${unreadCount > 0 ? 'text-indigo-300 font-bold' : 'text-slate-400 font-medium'}`}>
                                        {chat.lastMessage || 'Sent a new message'}
                                    </p>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </>
    );
};

export default ChatListSection;
