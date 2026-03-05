import { gql } from '@apollo/client';

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($recipientId: String!, $text: String!) {
    createMessage(recipientId: $recipientId, text: $text) {
      statusCode
      success
      message
      data {
        ... on Message {
          id
          chatId
          senderId
          text
          timestamp
          read
        }
      }
    }
  }
`;

export const MARK_CHAT_AS_READ = gql`
  mutation MarkChatAsRead($chatId: String!) {
    markChatAsRead(chatId: $chatId) {
      statusCode
      success
      message
    }
  }
`;
