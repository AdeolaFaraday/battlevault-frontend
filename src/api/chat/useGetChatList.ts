import { useQuery } from '@apollo/client';
import { GET_CHAT_LIST } from '@/src/graphql/chat/queries';

export interface Participant {
    id: string;
    userName: string;
    avatar: string;
    firstName: string;
    lastName: string;
}

export interface ChatThread {
    id: string;
    participants: string[];
    lastMessage: string;
    lastMessageTimestamp: number;
    unreadCount: number;
    participantDetails: Participant[];
}

export const useGetChatList = () => {
    const { loading, error, data, refetch } = useQuery(GET_CHAT_LIST, {
        fetchPolicy: 'cache-and-network',
        pollInterval: 30000, // Poll every 30 seconds to update unread counts and last messages
    });

    const isSuccess = data?.getChatList?.success;
    const chats: ChatThread[] = data?.getChatList?.data?.chats || [];

    return {
        chats,
        loading,
        error: error?.message || data?.getChatList?.message || null,
        isSuccess,
        refetch
    };
};
