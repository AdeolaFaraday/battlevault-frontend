import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers($limit: Int, $page: Int, $search: String) {
    getAllUsers(limit: $limit, page: $page, search: $search) {
      success
      message
      data {
        __typename
        ... on UserList {
          users {
            _id
            userName
            firstName
            lastName
            email
            role
            avatar
            accountStatus
            profileStatus
            createdAt
          }
          total
          page
          limit
          totalPages
          hasMore
        }
      }
    }
  }
`;
