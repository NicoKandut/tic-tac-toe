import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Player from "../main/Player";
import Board from "./Board";
import PlaceholderMessage from "./common/PlaceholderMessage";
import ScrollableFlexRow from "./common/ScrollableFlexRow";

const NO_OP = () => {};

const HistoryBoardWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
`;

export default function History({ games }: { games: [Player, Player[]][] }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [games]);

  return (
    <ScrollableFlexRow ref={scrollRef}>
      {games.length > 0 ? (
        games.map(([winner, tiles], index) => (
          <HistoryBoardWrapper key={index}>
            <Board tiles={tiles} winner={winner} processTurn={NO_OP} />
          </HistoryBoardWrapper>
        ))
      ) : (
        <PlaceholderMessage>
          <span>No matches played yet...</span>
        </PlaceholderMessage>
      )}
    </ScrollableFlexRow>
  );
}
