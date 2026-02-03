import { gql } from "@apollo/client";

export const WALLET_FIELDS_FRAGMENT = gql`
  fragment WalletFields on Wallet {
    _id
    withdrawable
    pending
    rewards
    currency
  }
`;

export const GET_WALLET_QUERY = gql`
  query GetWallet {
    getWallet {
      success
      message
      data {
        ... on Wallet {
          ...WalletFields
        }
      }
    }
  }
  ${WALLET_FIELDS_FRAGMENT}
`;

export const BANK_FIELDS_FRAGMENT = gql`
  fragment BankFields on Bank {
    _id
    userId
    accountName
    accountNumber
    bankName
    bankCode
    isDefault
  }
`;

export const LIST_BANKS_QUERY = gql`
  query ListBanks {
    listBanks {
      success
      message
      data {
        ... on PaystackBankList {
          banks {
            name
            code
            slug
          }
        }
      }
    }
  }
`;

export const GET_SAVED_BANKS_QUERY = gql`
  query GetSavedBanks {
    getSavedBanks {
      success
      message
      data {
        ... on BankList {
          banks {
            ...BankFields
          }
        }
      }
    }
  }
  ${BANK_FIELDS_FRAGMENT}
`;

export const VERIFY_BANK_ACCOUNT_QUERY = gql`
  query VerifyBankAccount($accountNumber: String!, $bankCode: String!) {
    verifyBankAccount(accountNumber: $accountNumber, bankCode: $bankCode) {
      success
      message
      data {
        ... on AccountVerification {
          accountNumber
          accountName
          bankId
        }
      }
    }
  }
`;
