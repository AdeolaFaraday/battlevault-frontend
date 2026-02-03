import { useMutation } from "@apollo/client";
import { CREATE_TRANSFER_RECIPIENT_MUTATION } from "@/src/graphql/wallet/mutations";
import { useCallback } from "react";
import { SavedBank } from "./useGetSavedBanks";

interface CreateTransferRecipientResponse {
    createTransferRecipient: {
        success: boolean;
        message: string;
        data: SavedBank;
    };
}

interface CreateTransferRecipientVariables {
    accountNumber: string;
    bankCode: string;
}

const useCreateTransferRecipient = (
    onCompleted?: (data: CreateTransferRecipientResponse) => void,
    onError?: (error: Error) => void
) => {
    const [createRecipient, { loading, error, data }] = useMutation<
        CreateTransferRecipientResponse,
        CreateTransferRecipientVariables
    >(CREATE_TRANSFER_RECIPIENT_MUTATION, {
        onCompleted: (data) => {
            if (onCompleted) onCompleted(data);
        },
        onError: (err) => {
            if (onError) onError(err);
        },
    });

    const createTransferRecipient = useCallback(
        (accountNumber: string, bankCode: string) => {
            return createRecipient({
                variables: { accountNumber, bankCode },
            });
        },
        [createRecipient]
    );

    return {
        createTransferRecipient,
        loading,
        error,
        success: data?.createTransferRecipient?.success,
        message: data?.createTransferRecipient?.message,
        bank: data?.createTransferRecipient?.data,
    };
};

export default useCreateTransferRecipient;
