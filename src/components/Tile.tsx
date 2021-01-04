import React, { useCallback } from "react";
import Player from "../main/Player";
import Mark from "./Mark";
import "./Tile.css";

export default function Tile({
  mark,
  index,
  processTurn,
}: {
  mark: Player;
  index: number;
  processTurn: (index: number, doNotSend: boolean | undefined) => void;
}) {
  const onClick = useCallback(() => {
    if (mark === Player.NONE) {
      processTurn(index, false);
    }
  }, [index, mark, processTurn]);

  return (
    <div className="tile" onClick={onClick}>
      {mark !== Player.NONE && <Mark type={mark} />}
    </div>
  );
}
