import { useLazyQuery } from "@apollo/client";
import { GET_WALLET_QUERY } from "@/src/graphql/wallet/queries";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { setWallet } from "@/src/lib/redux/slices/walletSlice";
import { useCallback } from "react";

const useGetWallet = (
    onCompleted?: (data: unknown) => void,
    onError?: (error: Error) => void
) => {
    const dispatch = useAppDispatch();

    const [getWallet, { loading, error }] = useLazyQuery(GET_WALLET_QUERY, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            if (data?.getWallet?.success && data.getWallet.data) {
                const walletData = data.getWallet.data;
                dispatch(setWallet(walletData));
                if (onCompleted) onCompleted(data);
            }
        },
        onError: (err) => {
            if (onError) onError(err);
        }
    });

    const refreshWallet = useCallback(() => {
        getWallet();
    }, [getWallet]);

    return {
        getWallet: refreshWallet,
        loading,
        error
    };
};

export default useGetWallet;
