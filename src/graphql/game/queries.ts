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
            prize {
              amount
              currency
            }
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
  query GetUpcomingGames($page: Int, $limit: Int) {
    getUpcomingGames(page: $page, limit: $limit) {
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
            startDate
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

export const GET_LEADERBOARD = gql`
  query GetLeaderboard($limit: Int, $page: Int, $search: String) {
    getLeaderboard(limit: $limit, page: $page, search: $search) {
      statusCode
      success
      message
      data {
        __typename
        ... on LeaderboardResult {
          players {
            _id
            userName
            firstName
            lastName
            avatar
            totalGamesPlayed
            totalWins
            totalLosses
            currentStreak
            bestStreak
            winPercentage
          }
          total
          page
          totalPages
          hasMore
        }
      }
    }
  }
`;

export const GET_USER_GAMES = gql`
  query MyGames($page: Int, $limit: Int, $search: String) {
    getUserGames(page: $page, limit: $limit, search: $search) {
      statusCode
      success
      message
      data {
        __typename
        ... on GameList {
          games {
            _id
            name
            type
            status
            winner
            startDate
            createdAt
            updatedAt
          }
          total
          page
          limit
          pages
        }
      }
    }
  }
`;

export const GET_USER_STATS = gql`
  query GetUserStats {
    getUserStats {
      statusCode
      success
      message
      data {
        __typename
        ... on UserStats {
          totalGamesPlayed
          totalWins
          totalLosses
          winPercentage
          currentStreak
          bestStreak
        }
      }
    }
  }
`;

export const GET_TOURNAMENT_BRACKET = gql`
  query GetTournamentBracket($tournamentId: ID!) {
    getTournamentBracket(tournamentId: $tournamentId) {
      statusCode
      success
      message
      data {
        __typename
        ... on TournamentBracket {
          tournament {
            _id
            title
          }
          stages {
            _id
            name
            index
            games {
              _id
              name
              status
              winner
              players {
                id
                name
                color
                tokens
              }
            }
          }
        }
      }
    }
  }
`;

export const IS_USER_REGISTERED = gql`
  query IsUserRegistered($tournamentId: ID!) {
    isUserRegistered(tournamentId: $tournamentId) {
      statusCode
      success
      message
      data {
        __typename
        ... on TournamentRegistration {
          isRegistered
        }
      }
    }
  }
`;
export const GET_DAILY_BLITZ = gql`
  query GetDailyBlitz {
    getDailyBlitz {
      statusCode
      success
      message
      data {
        __typename
        ... on DailyBlitz {
          id
          winsToday
          loginRewardClaimed
          win1RewardClaimed
          win3RewardClaimed
          nextReward {
            description
            amount
            target
            current
            percentage
          }
        }
      }
    }
  }
`;
