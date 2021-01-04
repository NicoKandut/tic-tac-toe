import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getWinner } from "../main/gameLogic";
import Instruction, { ControlInstruction } from "../main/Instruction";
import Player, { inverseOf } from "../main/Player";
import usePeerConnection from "../main/usePeerConnection";
import Board from "./Board";
import FlexColumn from "./common/FlexColumn";
import "./Game.css";

type GameParams = {
  roomId: string;
  playerId: Player;
};

export default function Game() {
  const { roomId, playerId } = useParams<GameParams>();
  const [tiles, setTiles] = useState(new Array<Player>(9).fill(Player.NONE));
  const [games, setGames] = useState(new Array<[Player, Array<Player>]>());
  const [winner, setWinner] = useState<Player | null>(null);
  const [player, setPlayer] = useState(Player.X);

  console.log("RENDER Game");
  const connection = usePeerConnection(roomId, playerId);

  const processTurn = useCallback(
    (index, doNotSend: boolean | undefined) => {
      console.log("Processturn");
      const newTiles = tiles;
      newTiles.splice(index, 1, player);
      setTiles(newTiles);
      setPlayer(inverseOf(player));

      const winner = getWinner(tiles);
      setWinner(winner);

      if (!doNotSend) {
        console.log("SENDING:", index);
        connection?.send(index);
      }
    },
    [connection, player, tiles]
  );

  const doTurn = useCallback(
    (index: number, doNotSend: boolean | undefined) => {
      if (player === playerId) {
        processTurn(index, doNotSend);
      }
    },
    [player, playerId, processTurn]
  );

  const reset = useCallback(() => {
    if (winner) {
      setGames([...games, [winner, tiles.map((tile) => tile)]]);
      setTiles(new Array<Player>(9).fill(Player.NONE));
      setWinner(null);
    }
  }, [games, tiles, winner]);

  const processControl = useCallback(
    (instruction: ControlInstruction, doNotSend: boolean | undefined) => {
      if (instruction === "reset") {
        reset();
      }

      if (!doNotSend) {
        console.log("SENDING:", instruction);
        connection?.send(instruction);
      }
    },
    [connection, reset]
  );

  const processReset = useCallback(() => {
    processControl("reset", false);
  }, [processControl]);

  const score = useMemo(() => {
    return games.reduce(
      (result, [winner]) => {
        result[winner] = result[winner] + 1;
        return result;
      },
      {
        [Player.X]: 0,
        [Player.O]: 0,
        [Player.NONE]: 0,
      }
    );
  }, [games]);

  useEffect(() => {
    const conn = connection;

    console.log("DATA HANDLER:", conn);
    const handler = (data: Instruction) => {
      console.log("DATA");

      if (typeof data === "number") processTurn(data, true);
      else if (typeof data === "string") processControl(data, true);
    };

    conn?.on("data", handler);

    return () => conn?.off("data", handler);
  }, [connection, processControl, processTurn]);

  const selectLink = useCallback((event) => {
    var r = document.createRange();
    r.selectNodeContents(event.target as Node);
    var sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(r);
    }
  }, []);

  return (
    <FlexColumn className="game">
      <div className="history">
        {games.length > 0 ? (
          games.map(([winner, tiles], index) => (
            <div key={index}>
              <span></span>
              <Board tiles={tiles} winner={winner} processTurn={() => {}} />
            </div>
          ))
        ) : (
          <div className="no-matches">
            <span>No matches played yet...</span>
          </div>
        )}
      </div>
      <div>
        {connection ? (
          <span>Connected</span>
        ) : (
          <>
            <span>Invite link: </span>
            <code onClick={selectLink}>{`${
              window.location.host
            }/${roomId}/${inverseOf(playerId)}`}</code>
          </>
        )}
      </div>
      <div className="score">
        <span className="x">{score[Player.X]}</span>
        <span>-</span>
        <span className="o">{score[Player.O]}</span>
      </div>
      <main className="board-container">
        <Board tiles={tiles} winner={winner} processTurn={doTurn} />
        {winner && (
          <button className="continue" onClick={processReset}>
            Again
          </button>
        )}
      </main>
    </FlexColumn>
  );
}
