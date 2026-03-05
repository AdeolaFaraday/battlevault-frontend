"use client";

import React, { useState } from 'react';
import { AppLayout } from '@/src/components/common/layout';
import ChatListSection from '@/src/components/chat/ChatListSection';
import ActiveConversation from '@/src/components/chat/ActiveConversation';
import SearchUserModal from '@/src/components/chat/SearchUserModal';
import { useGetChatList } from '@/src/api/chat/useGetChatList';
import { useAppSelector } from '@/src/lib/redux/hooks';
import { RootState } from '@/src/lib/redux/store';

const ChatDashboard = () => {
    const { chats, loading, refetch } = useGetChatList();
    const currentUser = useAppSelector((state: RootState) => state.auth.loggedInUserDetails);

    console.log({ currentUser })

    // UI states
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    // For mobile handling when a chat is open
    const isMobileChatOpen = Boolean(selectedChatId);

    // Temporary helper for Search selection
    const handleStartNewChat = (userId: string) => {
        // Derive ID or trust backend logic by using recipientId mutation directly 
        // For local layout flow we can temporarily mock a chat ID until the true one comes from GetChatList
        const derivedChatId = [currentUser?._id, userId].sort().join('_');
        setSelectedChatId(derivedChatId);
        setIsSearchModalOpen(false);
        refetch(); // Ensure list is refreshed in case we just created something
    };

    return (
        <AppLayout showBottomNav={false} className="!p-0 h-[calc(100vh-80px)] md:!py-8 max-w-5xl md:h-screen">
            <div className="flex overflow-hidden h-full rounded-none md:rounded-2xl border-white/5 md:border bg-[#24283b] shadow-2xl relative">

                {/* Chat List (Sidebar) */}
                <div className={`w-full md:w-1/3 flex flex-col h-full border-r border-white/5 bg-[#1e2235] ${isMobileChatOpen ? 'hidden md:flex' : 'flex'}`}>
                    <ChatListSection
                        chats={chats}
                        loading={loading}
                        selectedChatId={selectedChatId}
                        onSelectChat={setSelectedChatId}
                        onNewChat={() => setIsSearchModalOpen(true)}
                        currentUser={currentUser!}
                    />
                </div>

                {/* Active Conversation Layout */}
                <div className={`w-full md:w-2/3 h-full flex flex-col relative bg-[#24283b] ${!isMobileChatOpen ? 'hidden md:flex' : 'flex'}`}>
                    {selectedChatId ? (
                        <ActiveConversation
                            chatId={selectedChatId}
                            chats={chats}
                            currentUser={currentUser!}
                            onBack={() => setSelectedChatId(null)}
                        />
                    ) : (
                        <div className="m-auto flex flex-col items-center justify-center text-slate-500 gap-4">
                            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-white/40">Your Messages</h2>
                            <p className="text-sm font-medium">Select a conversation or start a new one</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlays */}
            <SearchUserModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
                onSelectUser={handleStartNewChat}
            />
        </AppLayout>
    );
};

export default ChatDashboard;
