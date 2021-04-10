import { getWinner } from "./gameLogic";
import Player, { inverseOf } from "./Player";

let outcomes = {
  [Player.X]: 0,
  [Player.O]: 0,
  [Player.NONE]: 0,
};

export function resetOutcomes() {
  outcomes = {
    [Player.X]: 0,
    [Player.O]: 0,
    [Player.NONE]: 0,
  };
}

export function getOutcomes() {
  return outcomes;
}

export function getBestMoves(tiles: Player[], player: Player) {
  let bestRating = -2;
  let bestIndex = [-1];
  resetOutcomes();

  tiles.forEach((value, index) => {
    if (value === Player.NONE) {
      const newBoard = [...tiles];
      newBoard[index] = player;

      const rating = -1 * evaluateBoard(newBoard, inverseOf(player));

      if (rating > bestRating) {
        bestRating = rating;
        bestIndex = [index];
      } else if (rating === bestRating) {
        bestIndex.push(index);
      }
    }
  });

  return bestIndex;
}

export function evaluateBoard(tiles: Player[], player: Player): number {
  const winner = getWinner(tiles);

  if (winner) {
    outcomes[winner]++;
  }

  if (winner === player) {
    return 1;
  }

  if (winner === inverseOf(player)) {
    return -1;
  }

  if (winner === Player.NONE) {
    return 0;
  }

  return getPossibleBoards(tiles, player).reduce((maxRating, board) => {
    const opponent = inverseOf(player);
    const boardRating = -1 * evaluateBoard(board, opponent);

    return boardRating > maxRating ? boardRating : maxRating;
  }, -2);
}

export function getPossibleBoards(tiles: Player[], player: Player): Player[][] {
  return tiles
    .map((value, index) => {
      if (value !== Player.NONE) {
        return [];
      }

      const newBoard = [...tiles];
      newBoard[index] = player;

      return newBoard;
    })
    .filter((tiles) => tiles.length > 0);
}
