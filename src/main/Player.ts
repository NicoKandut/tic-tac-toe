enum Player {
  NONE = "none",
  X = "x",
  O = "o",
}

export function inverseOf(player: Player) {
  if (player === Player.O) {
    return Player.X;
  }
  if (player === Player.X) {
    return Player.O;
  }

  throw new Error(`Cannot find inverse of ${player}`);
}

export default Player;
