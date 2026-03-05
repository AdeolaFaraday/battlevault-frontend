import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, DocumentData } from "firebase/firestore";
import { firestore as db } from '@/src/lib/firebase';

export interface ChatMessage {
    id: string;
    chatId: string;
    senderId: string;
    text: string;
    timestamp: number;
    read: boolean;
}

export const useChatMessages = (chatId: string | null) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!chatId) {
            setMessages([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const q = query(
            collection(db, "chats", chatId, "messages"),
            orderBy("timestamp", "asc")
        );

        // Creates a real time subscription to the messages subcollection in Firestore
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newMessages: ChatMessage[] = [];
            snapshot.forEach((doc) => {
                newMessages.push({ id: doc.id, ...(doc.data() as DocumentData) } as ChatMessage);
            });
            setMessages(newMessages);
            setLoading(false);
        }, (err) => {
            console.error("Firestore subscription error:", err);
            setLoading(false);
        });

        // Cleanup listener on unmount or chatId change
        return () => unsubscribe();
    }, [chatId]);

    return { messages, loading };
};
