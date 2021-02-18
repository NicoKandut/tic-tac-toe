import React, { useCallback } from "react";
import Player from "../main/Player";
import AlternatingBgCell from "./common/AlternatingBgCell";
import Mark from "./Mark";

export default function Tile({
  mark,
  index,
  processTurn,
}: {
  mark: Player;
  index: number;
  processTurn: (index: number, shouldSend: boolean | undefined) => void;
}) {
  const onClick = useCallback(() => {
    if (mark === Player.NONE) {
      processTurn(index, true);
    }
  }, [index, mark, processTurn]);

  return (
    <AlternatingBgCell onClick={onClick} index={index}>
      {mark !== Player.NONE && <Mark type={mark} />}
    </AlternatingBgCell>
  );
}
