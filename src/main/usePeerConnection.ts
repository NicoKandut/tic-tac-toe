import Peer, { DataConnection } from "peerjs";
import { useEffect, useState } from "react";
import Player, { inverseOf } from "./Player";

const ID_PREFIX = "haleluni-ttt-";

function getPeerId(roomId: string, playerId: Player) {
  return ID_PREFIX + roomId + playerId;
}

export default function usePeerConnection(
  roomId: string,
  playerId: Player
): DataConnection | null {
  const [connection, setConnection] = useState<DataConnection | null>(null);

  useEffect(() => {
    const peer = new Peer(getPeerId(roomId, playerId));

    peer.on("error", (err) => {
      console.error("ERROR:", err);
    });

    // O is the second player. Once they accept the invite they take care of connecting to X.
    if (playerId === Player.O) {
      peer.on("open", () => {
        const destination = getPeerId(roomId, inverseOf(playerId));
        const conn = peer.connect(destination);
        setConnection(conn);
      });
    }

    // X will get the connection attempt from O and expose the connection as well
    else {
      peer.on("connection", (conn) => {
        setConnection(conn);
      });
    }

    return () => {
      peer.destroy();
    };
  }, [playerId, roomId]);

  return connection;
}
