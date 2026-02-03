import { useLazyQuery } from "@apollo/client";
import { GET_SAVED_BANKS_QUERY } from "@/src/graphql/wallet/queries";
import { useCallback } from "react";

export interface SavedBank {
    _id: string;
    userId: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankCode: string;
    isDefault: boolean;
}

interface GetSavedBanksResponse {
    getSavedBanks: {
        success: boolean;
        message: string;
        data: {
            banks: SavedBank[];
        };
    };
}

const useGetSavedBanks = () => {
    const [fetchSavedBanks, { loading, error, data, refetch }] = useLazyQuery<GetSavedBanksResponse>(
        GET_SAVED_BANKS_QUERY,
        {
            fetchPolicy: "network-only",
        }
    );

    const getSavedBanks = useCallback(() => {
        return fetchSavedBanks();
    }, [fetchSavedBanks]);

    const savedBanks = data?.getSavedBanks?.success ? data.getSavedBanks.data.banks : [];

    return {
        getSavedBanks,
        refetch,
        savedBanks,
        loading,
        error,
    };
};

export default useGetSavedBanks;
