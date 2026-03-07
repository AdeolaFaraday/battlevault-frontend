import { gql } from "@apollo/client";

export const START_TOURNAMENT = gql`
  mutation StartTournament($tournamentId: ID!) {
    startTournament(tournamentId: $tournamentId) {
      success
      message
      data {
        __typename
        ... on Tournament {
            _id
            title
        }
      }
    }
  }
`;

export const ADVANCE_USER_IN_TOURNAMENT = gql`
  mutation AdvanceUserInTournament($tournamentId: ID!, $userId: ID!) {
    advanceUserInTournament(tournamentId: $tournamentId, userId: $userId) {
      success
      message
    }
  }
`;
