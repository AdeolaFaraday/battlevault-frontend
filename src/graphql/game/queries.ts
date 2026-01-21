import { gql } from "@apollo/client";

export const GET_TOURNAMENTS = gql`
  query GetTournaments {
    getTournaments {
      _id
      title
      description
      gameType
      entryFee
      entryFeeCurrency
      prize
      status
      frequency
      isPrivate
      maxUsers
      startDate
      endDate
      registeredUsers {
        _id
        userName
      }
    }
  }
`;

export const GET_UPCOMING_GAMES = gql`
  query GetUpcomingGames {
    getUpcomingGames {
      id
      name
      players {
        id
        name
        avatarUrl
        color
      }
      currentTurn
      status
      createdAt
    }
  }
`;

export const GET_ACTIVE_GAMES = gql`
  query GetActiveGames {
    getActiveGames {
      id
      players {
        id
        name
      }
      currentTurn
      status
      createdAt
      updatedAt
    }
  }
`;
