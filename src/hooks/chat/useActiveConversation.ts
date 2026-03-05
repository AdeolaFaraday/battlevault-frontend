import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useChatMessages, ChatMessage } from '@/src/hooks/chat/useChatMessages';
import { useCreateMessage } from '@/src/api/chat/useCreateMessage';
import { useMarkChatAsRead } from '@/src/api/chat/useMarkChatAsRead';
import { ChatThread } from '@/src/api/chat/useGetChatList';

export interface PendingMessage extends ChatMessage {
    status: 'sending' | 'sent' | 'error';
}

interface timestampType {
    toMillis?: () => number;
    seconds?: number;
}

export const useActiveConversation = (chatId: string, chats: ChatThread[], currentUser: TCommonResponseData) => {
    const { messages, loading: messagesLoading } = useChatMessages(chatId);
    const { sendMessage, loading: graphqlSending } = useCreateMessage();
    const { markAsRead } = useMarkChatAsRead();

    const [inputText, setInputText] = useState('');
    const [pendingMessages, setPendingMessages] = useState<PendingMessage[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Mark as read when opening
    useEffect(() => {
        if (chatId) {
            markAsRead(chatId);
        }
    }, [chatId, markAsRead]);

    // Recipient Details
    const recipient = useMemo(() => {
        const currentChat = chats.find(c => c.id === chatId);
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
    }, [chatId, chats, currentUser._id]);

    const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    const handleSend = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputText.trim() || !recipient.id) return;

        const text = inputText.trim();
        const tempId = `temp-${Date.now()}`;
        const timestamp = Date.now();

        const optimisticMsg: PendingMessage = {
            id: tempId,
            chatId,
            senderId: currentUser._id,
            text,
            timestamp,
            read: false,
            status: 'sending'
        };

        setPendingMessages(prev => [...prev, optimisticMsg]);
        setInputText('');

        const response = await sendMessage(recipient.id, text);

        if (response.success) {
            setPendingMessages(prev =>
                prev.map(msg => msg.id === tempId ? { ...msg, status: 'sent' } : msg)
            );
        } else {
            setPendingMessages(prev =>
                prev.map(msg => msg.id === tempId ? { ...msg, status: 'error' } : msg)
            );
        }
    };

    const getMs = (t: timestampType) => {
        if (!t) return Date.now();
        if (typeof t === 'number') return t;
        if (t.toMillis) return t.toMillis();
        if (t.seconds) return t.seconds * 1000;
        return new Date(t as string).getTime() || Date.now();
    };

    const allMessages = useMemo(() => {
        // Filter pending messages
        const filteredPending = pendingMessages.filter(pm =>
            !messages.some(m => {
                const mTs = getMs(m.timestamp as timestampType);
                return m.text === pm.text &&
                    m.senderId === pm.senderId &&
                    Math.abs(mTs - pm.timestamp) < 10000;
            })
        );

        return [...messages, ...filteredPending].sort((a, b) => getMs(a.timestamp as timestampType) - getMs(b.timestamp as timestampType));
    }, [messages, pendingMessages]);

    return {
        messages: allMessages,
        messagesLoading,
        inputText,
        setInputText,
        handleSend,
        recipient,
        messagesEndRef,
        scrollToBottom,
        sending: graphqlSending,
        getMs
    };
};
