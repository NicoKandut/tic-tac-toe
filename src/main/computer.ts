import { getWinner } from "./gameLogic";
import Player, { inverseOf } from "./Player";

function prettyBoard(board: Player[]) {
  return board
    .map((value) => (value === "none" ? " " : value))
    .reduce(
      (result, value, index) => result + value + (index % 3 === 2 ? "\n" : ""),
      "\n"
    );
}

export function getBestMove(tiles: Player[], player: Player) {
  let bestRating = -2;
  let bestIndex = -1;

  tiles.forEach((value, index) => {
    if (value === Player.NONE) {
      const newBoard = [...tiles];
      newBoard[index] = player;

      const rating = -1 * evaluateBoard(newBoard, inverseOf(player));

      if (rating > bestRating) {
        bestRating = rating;
        bestIndex = index;
      }
    }
  });

  return bestIndex;
}

export function evaluateBoard(tiles: Player[], player: Player): number {
  const winner = getWinner(tiles);

  if (winner === player) {
    return 1;
  }

  if (winner === inverseOf(player)) {
    return -1;
  }

  if (winner === Player.NONE) {
    return 0;
  }

  // Not finished

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
