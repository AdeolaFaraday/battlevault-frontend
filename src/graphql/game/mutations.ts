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

export const ROLL_DICE_MUTATION = gql`
  mutation RollDice($gameId: ID!) {
    rollDice(gameId: $gameId) {
      id
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
`;

export const PROCESS_MOVE_MUTATION = gql`
  mutation ProcessMove($gameId: ID!, $input: MoveInput!) {
    processMove(gameId: $gameId, input: $input) {
      id
      players {
        id
        name
        color
        tokens
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
`;

export const SELECT_DICE_MUTATION = gql`
  mutation SelectDice($gameId: ID!, $diceValues: [Int!]!) {
    selectDice(gameId: $gameId, diceValues: $diceValues) {
      id
      activeDiceConfig
      status
    }
  }
`;
