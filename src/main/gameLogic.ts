import Player from "./Player";

type RowIndex = 0 | 1 | 2;
type ColumnIndex = 0 | 1 | 2;

/**
 * Checks a row for matching marks.
 */
export function checkRow(index: RowIndex, tiles: Array<Player>): Player | null {
  return checkTriplet(tiles.slice(index * 3, (index + 1) * 3));
}

/**
 * Checks a column for matching marks.
 */
export function checkColumn(
  index: ColumnIndex,
  tiles: Array<Player>
): Player | null {
  return checkTriplet(tiles.filter((_, i) => i % 3 === index));
}

export function checkTriplet(triplet: Array<Player>) {
  if (triplet.every((tile) => tile !== Player.NONE && tile === triplet[0])) {
    return triplet[0];
  }
  return null;
}

export function getWinner(tiles: Array<Player>): Player | null {
  for (let i = 0; i < 3; i++) {
    const h = checkRow(i as RowIndex, tiles);
    if (h) return h;

    const v = checkColumn(i as ColumnIndex, tiles);
    if (v) return v;
  }

  const d =
    checkTriplet([tiles[0], tiles[4], tiles[8]]) ||
    checkTriplet([tiles[2], tiles[4], tiles[6]]);
  if (d) return d;

  const full = tiles.every((tile) => tile !== Player.NONE);
  if (full) return Player.NONE;

  return null;
}
