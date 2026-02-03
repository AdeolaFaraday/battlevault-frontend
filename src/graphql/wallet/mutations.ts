import { gql } from "@apollo/client";

export const CREATE_TRANSFER_RECIPIENT_MUTATION = gql`
  mutation CreateTransferRecipient($accountNumber: String!, $bankCode: String!) {
    createTransferRecipient(accountNumber: $accountNumber, bankCode: $bankCode) {
      success
      message
      data {
        ... on Bank {
          _id
          userId
          accountName
          accountNumber
          bankName
          bankCode
          isDefault
        }
      }
    }
  }
`;

export const WITHDRAW_WINNINGS_MUTATION = gql`
  mutation WithdrawWinnings($amount: Float!, $bankId: ID!) {
    withdrawWinnings(amount: $amount, bankId: $bankId) {
      success
      message
      data {
        ... on Wallet {
          _id
          withdrawable
          pending
          rewards
          locked
          currency
        }
      }
    }
  }
`;
