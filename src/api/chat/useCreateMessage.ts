import { useMutation } from '@apollo/client';
import { CREATE_MESSAGE } from '@/src/graphql/chat/mutations';

export const useCreateMessage = () => {
    const [executeMutation, { loading, error }] = useMutation(CREATE_MESSAGE);

    const sendMessage = async (recipientId: string, text: string) => {
        try {
            const response = await executeMutation({
                variables: { recipientId, text }
            });
            return {
                success: response.data?.createMessage?.success,
                message: response.data?.createMessage?.message,
                data: response.data?.createMessage?.data
            };
        } catch (err: unknown) {
            console.error("Failed to send message via Graphql:", err);
            return {
                success: false,
                message: (err as Error).message || "Failed to send message",
                data: null
            };
        }
    };

    return {
        sendMessage,
        loading,
        error: error?.message || null
    };
};
