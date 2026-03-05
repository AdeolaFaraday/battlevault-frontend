import { useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { firestore as db } from '@/src/lib/firebase';

/**
 * Hook to watch the unreadCounts map in the chats/{chatId} documents
 * for real-time sidebar updates.
 */
export const useChatUnreadCounts = (chatIds: string[], currentUserId: string | undefined) => {
    const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        if (!currentUserId || chatIds.length === 0) {
            setUnreadCounts({});
            return;
        }

        const unsubscribes = chatIds.map(chatId => {
            return onSnapshot(doc(db, "chats", chatId), (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    // Each chat document has an 'unreadCounts' map: { [userId]: number }
                    const count = data.unreadCounts?.[currentUserId] || 0;
                    setUnreadCounts(prev => ({ ...prev, [chatId]: count }));
                }
            }, (error) => {
                console.error(`Error listening to unreadCount for chat ${chatId}:`, error);
            });
        });

        return () => unsubscribes.forEach(unsub => unsub());
    }, [chatIds.sort().join(','), currentUserId]);

    return unreadCounts;
};
