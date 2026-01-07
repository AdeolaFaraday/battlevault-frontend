import { gql } from "@apollo/client";

export const JOIN_GAME_MUTATION = gql`
  mutation JoinGame($gameId: ID!, $player: LudoPlayerInput!) {
    joinGame(gameId: $gameId, player: $player) {
      id
      name
      type
      tournamentId
      matchStage
      players {
        id
        name
        color
        tokens
      }
      currentTurn
      diceValue
      isRolling
      status
      createdAt
      updatedAt
    }
  }
`;
