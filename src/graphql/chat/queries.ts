import { gql } from '@apollo/client';

export const SEARCH_USERS = gql`
  query SearchUsers($query: String!, $limit: Int) {
    searchUsers(query: $query, limit: $limit) {
      statusCode
      success
      message
      data {
        ... on UserList {
          users {
            _id
            userName
            firstName
            lastName
            avatar
          }
        }
      }
    }
  }
`;

export const GET_CHAT_LIST = gql`
  query GetChatList {
    getChatList {
      statusCode
      success
      message
      data {
        ... on ChatList {
          chats {
            id
            participants
            lastMessage
            lastMessageTimestamp
            unreadCount
            participantDetails {
              id
              userName
              avatar
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;
