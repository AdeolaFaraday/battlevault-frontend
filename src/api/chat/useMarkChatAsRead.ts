import { useMutation } from '@apollo/client';
import { MARK_CHAT_AS_READ } from '@/src/graphql/chat/mutations';

export const useMarkChatAsRead = () => {
    const [executeMutation, { loading, error }] = useMutation(MARK_CHAT_AS_READ);

    const markAsRead = async (chatId: string) => {
        try {
            const response = await executeMutation({
                variables: { chatId }
            });
            return {
                success: response.data?.markChatAsRead?.success,
                message: response.data?.markChatAsRead?.message
            };
        } catch (err: unknown) {
            console.error("Failed to mark chat as read via GraphQL:", err);
            return {
                success: false,
                message: (err as Error).message || "Failed to mark as read"
            };
        }
    };

    return {
        markAsRead,
        loading,
        error: error?.message || null
    };
};
