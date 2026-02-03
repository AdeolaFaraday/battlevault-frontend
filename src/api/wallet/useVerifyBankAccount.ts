import { useLazyQuery } from "@apollo/client";
import { VERIFY_BANK_ACCOUNT_QUERY } from "@/src/graphql/wallet/queries";
import { useCallback } from "react";

interface AccountVerification {
    accountNumber: string;
    accountName: string;
    bankId: number;
}

interface VerifyBankAccountResponse {
    verifyBankAccount: {
        success: boolean;
        message: string;
        data: AccountVerification;
    };
}

interface VerifyBankAccountVariables {
    accountNumber: string;
    bankCode: string;
}

const useVerifyBankAccount = () => {
    const [verifyAccount, { loading, error, data }] = useLazyQuery<
        VerifyBankAccountResponse,
        VerifyBankAccountVariables
    >(VERIFY_BANK_ACCOUNT_QUERY, {
        fetchPolicy: "network-only",
    });

    const verifyBankAccount = useCallback(
        (accountNumber: string, bankCode: string) => {
            return verifyAccount({
                variables: { accountNumber, bankCode },
            });
        },
        [verifyAccount]
    );

    const verification = data?.verifyBankAccount?.success
        ? data.verifyBankAccount.data
        : null;

    return {
        verifyBankAccount,
        verification,
        loading,
        error,
        success: data?.verifyBankAccount?.success,
        message: data?.verifyBankAccount?.message,
    };
};

export default useVerifyBankAccount;
