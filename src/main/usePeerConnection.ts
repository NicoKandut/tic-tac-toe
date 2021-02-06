import Peer from "peerjs";
import { useEffect, useState } from "react";
import Connection from "../@types/Connection";
import Player from "./Player";

export default function usePeerConnection(
  playerId: Player,
  host: string | undefined
): {
  connection: Connection | null;
  peerId: string;
} {
  const [connection, setConnection] = useState<Connection | null>(null);
  const [peerId, setPeerId] = useState("");

  useEffect(() => {
    const peer = new Peer();

    peer.on("error", (err) => {
      console.error("ERROR:", err);
    });

    peer.on("open", (id) => {
      setPeerId(id);
      console.debug("Peer Id:", id);

      // connect to host if possible
      if (host) {
        console.debug("Role: HOST");
        const conn = peer.connect(host);

        setConnection(conn);
        conn.on("error", () => {
          setConnection({ ...conn, status: "ERROR" });
        });
        conn.on("close", () => {
          setConnection({ ...conn, status: "CLOSED" });
        });

        console.debug("Connection established", conn);
      }
    });

    if (!host) {
      console.debug("Role: CLIENT");
      peer.on("connection", (conn) => {
        setConnection(conn);
        conn.on("error", () => {
          setConnection({ ...conn, status: "ERROR" });
        });
        conn.on("close", () => {
          setConnection({ ...conn, status: "CLOSED" });
        });
        console.debug("Connection established", conn);
      });
    }

    return () => {
      peer.destroy();
    };
  }, [playerId, host]);

  return { connection, peerId };
}
