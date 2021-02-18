import React from "react";
import GameType from "../../main/GameType";
import Player from "../../main/Player";
import Game from "../Game";

export default function Computer() {
  return (
    <Game
      type={GameType.COMPUTER}
      playerId={Player.X}
      connection={null}
      peerId={""}
    />
  );
}
