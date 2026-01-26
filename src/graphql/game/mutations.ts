import { gql } from "@apollo/client";

export const JOIN_GAME_MUTATION = gql`
  mutation JoinGame($gameId: ID!, $name: String!) {
    joinGame(gameId: $gameId, name: $name) {
      statusCode
      success
      message
      data {
        ... on LudoGameState {
          _id
          players {
            id
            name
            color
          }
          status
        }
      }
    }
  }
`;

export const ROLL_DICE_MUTATION = gql`
  mutation RollDice($gameId: ID!, $name: String) {
    rollDice(gameId: $gameId, name: $name) {
      statusCode
      success
      message
      data {
        ... on LudoGameState {
          _id
          currentTurn
          diceValue
          isRolling
          status
          usedDiceValues
          activeDiceConfig
          tokens {
            blue { sn color active position isSafePath isFinished }
            yellow { sn color active position isSafePath isFinished }
            green { sn color active position isSafePath isFinished }
            red { sn color active position isSafePath isFinished }
          }
        }
      }
    }
  }
`;

export const PROCESS_MOVE_MUTATION = gql`
  mutation ProcessMove($gameId: ID!, $input: MoveInput!, $name: String) {
    processMove(gameId: $gameId, input: $input, name: $name) {
      statusCode
      success
      message
      data {
        ... on LudoGameState {
          _id
          players {
            id
            name
            color
            capturedCount
            finishedCount
          }
          currentTurn
          diceValue
          isRolling
          status
          usedDiceValues
          activeDiceConfig
          tokens {
            blue { sn color active position isSafePath isFinished }
            yellow { sn color active position isSafePath isFinished }
            green { sn color active position isSafePath isFinished }
            red { sn color active position isSafePath isFinished }
          }
          winner
          lastMoverId
        }
      }
    }
  }
`;

export const SELECT_DICE_MUTATION = gql`
  mutation SelectDice($gameId: ID!, $diceValues: [Int!]!, $name: String) {
    selectDice(gameId: $gameId, diceValues: $diceValues, name: $name) {
      statusCode
      success
      message
      data {
        ... on LudoGameState {
          _id
          activeDiceConfig
          status
        }
      }
    }
  }
`;

export const CREATE_FREE_GAME_MUTATION = gql`
  mutation CreateFreeGame($name: String!) {
    createFreeGame(name: $name) {
      statusCode
      success
      message
      data {
        ... on LudoGameState {
          _id
          players {
            id
            name
            color
          }
          currentTurn
          status
          createdAt
          updatedAt
        }
      }
    }
  }
`;
