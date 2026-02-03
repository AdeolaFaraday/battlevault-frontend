import { useMutation } from "@apollo/client";
import { WITHDRAW_WINNINGS_MUTATION } from "@/src/graphql/wallet/mutations";
import { useCallback } from "react";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { setWallet } from "@/src/lib/redux/slices/walletSlice";

interface WalletData {
    _id: string;
    withdrawable: number;
    pending: number;
    rewards: number;
    locked: number;
    currency: string;
}

interface WithdrawWinningsResponse {
    withdrawWinnings: {
        success: boolean;
        message: string;
        data: WalletData;
    };
}

interface WithdrawWinningsVariables {
    amount: number;
    bankId: string;
}

const useWithdrawWinnings = (
    onCompleted?: (data: WithdrawWinningsResponse) => void,
    onError?: (error: Error) => void
) => {
    const dispatch = useAppDispatch();

    const [withdrawMutation, { loading, error, data }] = useMutation<
        WithdrawWinningsResponse,
        WithdrawWinningsVariables
    >(WITHDRAW_WINNINGS_MUTATION, {
        onCompleted: (data) => {
            if (data?.withdrawWinnings?.success && data.withdrawWinnings.data) {
                dispatch(setWallet(data.withdrawWinnings.data));
            }
            if (onCompleted) onCompleted(data);
        },
        onError: (err) => {
            if (onError) onError(err);
        },
    });

    const withdrawWinnings = useCallback(
        (amount: number, bankId: string) => {
            return withdrawMutation({
                variables: { amount, bankId },
            });
        },
        [withdrawMutation]
    );

    return {
        withdrawWinnings,
        loading,
        error,
        success: data?.withdrawWinnings?.success,
        message: data?.withdrawWinnings?.message,
    };
};

export default useWithdrawWinnings;
