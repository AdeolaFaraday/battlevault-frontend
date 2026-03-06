"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGetUserUnreadMessagesCount } from '@/src/api/chat/useGetUserUnreadMessagesCount';
import { useGetChatList } from '@/src/api/chat/useGetChatList'; // Needed to get user names based on participants

interface NotificationBellProps {
    isAuthenticated: boolean;
    currentUserId?: string;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ isAuthenticated }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const bellRef = useRef<HTMLDivElement>(null);

    // Fetch messages from new endpoint
    const { unreadData } = useGetUserUnreadMessagesCount(!isAuthenticated);
    const { unreadCount, messages } = unreadData;

    // We'll still fetch the chat list just to map sender IDs to names/avatars 
    // from the participantDetails array if available.
    const { chats } = useGetChatList();

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => window.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!isAuthenticated) return null;

    return (
        <div className="relative" ref={bellRef}>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(prev => !prev)}
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500/10 transition-colors group"
            >
                <Bell className="w-5 h-5 text-slate-300 group-hover:text-red-400 transition-colors" />
                {unreadCount > 0 && (
                    <>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#1a1d2e] z-10" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-75" />
                    </>
                )}
            </motion.button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-80 bg-[#24283b] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                    >
                        <div className="p-3 border-b border-white/5 flex items-center justify-between">
                            <p className="text-white font-semibold text-sm">Notifications</p>
                            {unreadCount > 0 && (
                                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-medium">
                                    {unreadCount} unread
                                </span>
                            )}
                        </div>

                        {messages.length === 0 ? (
                            <div className="p-6 text-center">
                                <Bell className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                                <p className="text-slate-500 text-sm">No new notifications</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                                {messages.map((msg) => {
                                    // Try to find the sender's details from our chat list cache
                                    const chatThread = chats.find(c => c.id === msg.chatId);
                                    const senderDetails = chatThread?.participantDetails?.find(p => p.id === msg.senderId);

                                    const senderName = senderDetails
                                        ? `${senderDetails.firstName} ${senderDetails.lastName}`.trim()
                                        : 'Unknown';

                                    return (
                                        <button
                                            key={msg.id}
                                            onClick={() => {
                                                setIsOpen(false);
                                                router.push('/chat');
                                            }}
                                            className="w-full flex items-start gap-3 p-3 hover:bg-white/5 transition-colors text-left"
                                        >
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white uppercase">
                                                {senderName.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-medium truncate">{senderName}</p>
                                                <p className="text-slate-400 text-xs truncate mt-0.5">
                                                    {msg.text}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                                <span className="text-[10px] text-slate-500">
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                <span className="w-2 h-2 bg-red-500 rounded-full" />
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        <div className="p-2 border-t border-white/5">
                            <button
                                onClick={() => { setIsOpen(false); router.push('/chat'); }}
                                className="w-full text-center text-xs text-indigo-400 hover:text-indigo-300 py-1.5 transition-colors"
                            >
                                View all messages
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationBell;
