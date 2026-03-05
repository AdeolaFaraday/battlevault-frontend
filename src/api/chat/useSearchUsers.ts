import { useLazyQuery } from '@apollo/client';
import { SEARCH_USERS } from '@/src/graphql/chat/queries';

export interface ChatUser {
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

export const useSearchUsers = () => {
    const [executeSearch, { loading, error, data }] = useLazyQuery(SEARCH_USERS, {
        fetchPolicy: 'network-only' // Always get fresh search results
    });

    const searchUsers = async (queryStr: string, limit: number = 20) => {
        if (!queryStr.trim()) return [];
        try {
            const result = await executeSearch({ variables: { query: queryStr, limit } });
            if (result.data?.searchUsers?.success && result.data.searchUsers.data?.users) {
                return result.data.searchUsers.data.users as ChatUser[];
            }
            return [];
        } catch (err) {
            console.error("Failed to search users:", err);
            return [];
        }
    };

    return {
        searchUsers,
        loading,
        error: error?.message || null,
        users: data?.searchUsers?.data?.users as ChatUser[] || []
    };
};
