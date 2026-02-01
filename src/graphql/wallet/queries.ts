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
