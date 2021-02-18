import React from "react";
import styled from "styled-components";
import { evaluateBoard } from "../main/computer";
import Player from "../main/Player";
import theme from "./common/theme";

const BlueBar = styled.div`
  background: ${theme.blue};
  height: 70px;
  width: 500px;
`;

const RedBar = styled.div`
  background: ${theme.red};
  height: 100%;
`;

export default function Evaluation({
  tiles,
  player,
}: {
  tiles: Player[];
  player: Player;
}) {
  return (
    <BlueBar>
      <RedBar
        style={{
          width: `${(evaluateBoard(tiles, player) + 1) * 50}%`,
        }}
      />
    </BlueBar>
  );
}
