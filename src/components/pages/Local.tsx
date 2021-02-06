import React from "react";
import GameType from "../../main/GameType";
import Player from "../../main/Player";
import Game from "../Game";

export default function Local() {
  return (
    <Game
      type={GameType.LOCAL}
      playerId={Player.X}
      connection={null}
      peerId={""}
    />
  );
}
