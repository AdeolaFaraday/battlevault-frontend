import { gql } from "@apollo/client";

export const GET_TOURNAMENTS = gql`
  query GetTournaments {
    getTournaments {
      statusCode
      success
      message
      data {
        __typename
        ... on TournamentList {
          tournaments {
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
      }
    }
  }
`;

export const GET_UPCOMING_GAMES = gql`
  query GetUpcomingGames {
    getUpcomingGames {
      statusCode
      success
      message
      data {
        __typename
        ... on GameList {
          games {
            _id
            name
            players {
              id
              name
              avatarUrl
              color
            }
            currentTurn
            status
            diceValue
            createdAt
          }
        }
      }
    }
  }
`;

export const GET_ACTIVE_GAMES = gql`
  query GetActiveGames {
    getActiveGames {
      statusCode
      success
      message
      data {
        __typename
        ... on GameList {
          games {
            _id
            name
            status
            currentTurn
            diceValue
            players {
              id
              name
              color
            }
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;
