import React from "react";
import Player from "../main/Player";
import Tile from "./Tile";
import "./Board.css";
import Mark from "./Mark";

export default function Board({
  tiles,
  processTurn,
  winner,
}: {
  tiles: Player[];
  processTurn: (index: number, doNotSend: boolean | undefined) => void;
  winner: Player | null;
}) {
  return (
    <div className="board-wrapper">
      <div className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            mark={tile}
            index={index}
            processTurn={processTurn}
          />
        ))}
      </div>
      {winner && (
        <div className={`endscreen ${winner}`}>
          {winner === Player.NONE ? (
            <span className="draw">Draw</span>
          ) : (
            <Mark type={winner} />
          )}
        </div>
      )}
    </div>
  );
}
