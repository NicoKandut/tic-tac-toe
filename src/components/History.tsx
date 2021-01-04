import React, { useEffect, useRef } from "react";
import Player from "../main/Player";
import Board from "./Board";

export default function History({ games }: { games: [Player, Player[]][] }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef?.current?.scrollWidth;
    }
  }, [games]);

  return (
    <div className="history" ref={scrollRef}>
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
  );
}
