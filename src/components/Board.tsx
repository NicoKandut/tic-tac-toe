import React from "react";
import Player from "../main/Player";
import Tile from "./Tile";
import Mark from "./Mark";
import styled, { css } from "styled-components";
import theme from "./common/theme";

interface BoardProps {
  tiles: Player[];
  processTurn: (index: number, shouldSend: boolean | undefined) => void;
  winner: Player | null;
}

const Wrapper = styled.div`
  position: relative;
`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  border: 5px gray solid;
  border-radius: 5px;
  background: gray;
`;

const Overlay = styled.div(
  ({ winner }: Pick<BoardProps, "winner">) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    ${winner
      ? { x: theme.semiRed, o: theme.semiBlue, none: theme.semiYellow }[winner]
      : ""};
  `
);

const OverlayMark = styled(Mark)`
  max-width: 60%;
`;

const DrawText = styled.span`
  font-size: 32px;
  color: gold;
  filter: drop-shadow(0 3px 0 gray);
`;

export default function Board({ tiles, processTurn, winner }: BoardProps) {
  return (
    <Wrapper>
      <BoardGrid className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            mark={tile}
            index={index}
            processTurn={processTurn}
          />
        ))}
      </BoardGrid>
      {winner && (
        <Overlay winner={winner}>
          {winner === Player.NONE ? (
            <DrawText>Draw</DrawText>
          ) : (
            <OverlayMark type={winner} />
          )}
        </Overlay>
      )}
    </Wrapper>
  );
}
