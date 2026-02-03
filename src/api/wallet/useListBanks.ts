import { useLazyQuery } from "@apollo/client";
import { LIST_BANKS_QUERY } from "@/src/graphql/wallet/queries";
import { useCallback } from "react";

export interface PaystackBank {
    name: string;
    code: string;
    slug: string;
}

interface ListBanksResponse {
    listBanks: {
        success: boolean;
        message: string;
        data: {
            banks: PaystackBank[];
        };
    };
}

const useListBanks = () => {
    const [fetchBanks, { loading, error, data }] = useLazyQuery<ListBanksResponse>(
        LIST_BANKS_QUERY,
        {
            fetchPolicy: "cache-first",
        }
    );

    const listBanks = useCallback(() => {
        return fetchBanks();
    }, [fetchBanks]);

    const banks = data?.listBanks?.success ? data.listBanks.data.banks : [];

    return {
        listBanks,
        banks,
        loading,
        error,
    };
};

export default useListBanks;
