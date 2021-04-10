import React, { useRef } from "react";
import styled, { css } from "styled-components";
import { evaluateBoard, getOutcomes } from "../main/computer";
import Player from "../main/Player";
import theme from "./common/theme";

const Wrapper = styled.div(
  ({ x, o, none }: { x: number; o: number; none: number }) => css`
    display: grid;
    height: 70px;
    width: 500px;

    grid-template-columns: ${x}fr ${none}fr ${o}fr;
    align-items: stretch;
  `
);

const BlueBar = styled.div`
  background: ${theme.blue};
`;

const RedBar = styled.div`
  background: ${theme.red};
`;

const YellowBar = styled.div`
  background: ${theme.yellow};
`;

export default function Evaluation({
  outcomes,
}: {
  outcomes: Record<Player, number>;
}) {
  return (
    <Wrapper {...outcomes}>
      <RedBar></RedBar>
      <YellowBar></YellowBar>
      <BlueBar></BlueBar>
    </Wrapper>
  );
}
