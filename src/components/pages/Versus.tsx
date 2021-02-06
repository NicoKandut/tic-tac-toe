import React from "react";
import GameType from "../../main/GameType";
import Player from "../../main/Player";
import usePeerConnection from "../../main/usePeerConnection";
import useInvite from "../../main/useQuery";
import Game from "../Game";

export default function Versus() {
  const { roomId, playerId = Player.X } = useInvite();
  const { connection, peerId } = usePeerConnection(playerId, roomId);

  return (
    <Game
      type={GameType.VERSUS}
      playerId={playerId}
      connection={connection}
      peerId={peerId}
    />
  );
}
