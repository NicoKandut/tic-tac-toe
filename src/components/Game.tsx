import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Connection from "../@types/Connection";
import { getBestMoves, getOutcomes } from "../main/computer";
import { getWinner } from "../main/gameLogic";
import GameType from "../main/GameType";
import Instruction, { ControlInstruction } from "../main/Instruction";
import { stringify } from "../main/invite";
import Player, { inverseOf } from "../main/Player";
import Board from "./Board";
import FlexRow from "./common/FlexRow";
import Evaluation from "./Evaluation";
import "./Game.css";
import History from "./History";

const ScoreRow = styled(FlexRow)`
  justify-content: space-between;
`;

const ConnectionRow = styled(FlexRow)`
  display: flex;
  justify-content: center;
  gap: 5px;
`;

export default function Game({
  type,
  playerId,
  connection,
  peerId,
}: {
  type: GameType;
  playerId: Player;
  connection: Connection | null;
  peerId: string;
}) {
  const [tiles, setTiles] = useState(new Array<Player>(9).fill(Player.NONE));
  const [games, setGames] = useState(new Array<[Player, Array<Player>]>());
  const [winner, setWinner] = useState<Player | null>(null);
  const [player, setPlayer] = useState(Player.X);

  const outcomes = useMemo(getOutcomes, [player]);

  const processTurn = useCallback(
    (index, shouldSend: boolean | undefined) => {
      const newTiles = tiles;
      newTiles.splice(index, 1, player);
      setTiles(newTiles);
      setPlayer(inverseOf(player));

      const winner = getWinner(tiles);
      setWinner(winner);

      if (type === GameType.VERSUS && shouldSend) {
        connection?.send(index);
      }
    },
    [connection, player, tiles, type]
  );

  const doTurn = useCallback(
    (index: number, shouldSend: boolean | undefined) => {
      if ((connection && player === playerId) || type !== GameType.VERSUS) {
        processTurn(index, shouldSend);
      }
    },
    [connection, player, playerId, processTurn, type]
  );

  const reset = useCallback(() => {
    if (winner) {
      setGames([...games, [winner, tiles.map((tile) => tile)]]);
      setTiles(new Array<Player>(9).fill(Player.NONE));
      setWinner(null);
    }
  }, [games, tiles, winner]);

  const processControl = useCallback(
    (instruction: ControlInstruction, shouldSend: boolean | undefined) => {
      if (instruction === "reset") {
        reset();
      }

      if (type === GameType.VERSUS && shouldSend) {
        connection?.send(instruction);
      }
    },
    [connection, reset, type]
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

    const handler = (data: Instruction) => {
      if (typeof data === "number") processTurn(data, false);
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

  useEffect(() => {
    if (type === GameType.COMPUTER && player === Player.O && !winner) {
      const goodMoves = getBestMoves(tiles, player);

      doTurn(
        goodMoves[Math.trunc(Math.random() * 1000) % goodMoves.length],
        false
      );
    }
  }, [doTurn, player, tiles, type, winner]);

  return (
    <>
      <History games={games} />
      <ConnectionRow>
        {type === GameType.LOCAL ? (
          <span className="connected">Local</span>
        ) : type === GameType.COMPUTER ? (
          <span className="connected">Computer</span>
        ) : connection ? (
          connection.status === "ERROR" ? (
            <span className="error">Error</span>
          ) : connection.status === "CLOSED" ? (
            <span className="closed">Closed</span>
          ) : (
            <span className="connected">Connected</span>
          )
        ) : (
          <>
            <span className="invite">Invite link: </span>
            <code onClick={selectLink}>{`https://${
              window.location.host + process.env.PUBLIC_URL
            }?i=${stringify({
              roomId: peerId,
              playerId: inverseOf(playerId),
            })}`}</code>
          </>
        )}
      </ConnectionRow>
      <ScoreRow>
        <div className="turn">
          {winner ? (
            <span className={winner}>
              {winner === Player.NONE
                ? "Draw"
                : winner === playerId
                ? "You win"
                : "You lose"}
            </span>
          ) : (
            <span className={player}>
              {player === playerId ? "Your turn" : "Opponent's turn"}
            </span>
          )}
        </div>
        <Evaluation outcomes={outcomes} />
        <div className="score">
          <span className="x">{score[Player.X]}</span>
          <span>-</span>
          <span className="o">{score[Player.O]}</span>
        </div>
      </ScoreRow>
      <Board tiles={tiles} winner={winner} processTurn={doTurn} />
      {winner && (
        <button className="continue" onClick={processReset}>
          Again
        </button>
      )}
    </>
  );
}
