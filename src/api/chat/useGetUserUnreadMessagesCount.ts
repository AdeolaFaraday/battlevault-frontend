import { useQuery } from '@apollo/client';
import { GET_USER_UNREAD_MESSAGES_COUNT } from '@/src/graphql/chat/queries';

export interface UnreadMessage {
    id: string;
    chatId: string;
    senderId: string;
    text: string;
    timestamp: string;
    read: boolean;
}

export interface UnreadMessagesData {
    unreadCount: number;
    messages: UnreadMessage[];
}

export const useGetUserUnreadMessagesCount = (skip: boolean = false) => {
    const { loading, error, data, refetch } = useQuery(GET_USER_UNREAD_MESSAGES_COUNT, {
        fetchPolicy: 'cache-and-network',
        pollInterval: 30000, // Poll every 30 seconds
        skip,
    });

    const isSuccess = data?.getUserUnreadMessagesCount?.success;
    const unreadData: UnreadMessagesData = data?.getUserUnreadMessagesCount?.data || { unreadCount: 0, messages: [] };

    return {
        unreadData,
        loading,
        error: error?.message || data?.getUserUnreadMessagesCount?.message || null,
        isSuccess,
        refetch
    };
};
