import React from "react";
import { getBestMoves } from "../../main/computer";
import { getWinner } from "../../main/gameLogic";
import Player from "../../main/Player";
import Board from "../Board";
import FlexColumn from "../common/FlexColumn";
import { NO_OP } from "../History";

export default function Test() {
  const board = [
    Player.O,
    Player.O,
    Player.X,
    Player.X,
    Player.NONE,
    Player.NONE,
    Player.O,
    Player.NONE,
    Player.X,
  ];

  return (
    <FlexColumn>
      <Board tiles={board} winner={getWinner(board)} processTurn={NO_OP} />
      <span>Best Moves for O</span>
      <span>{getBestMoves(board, Player.O).join(", ")}</span>
    </FlexColumn>
  );
}
