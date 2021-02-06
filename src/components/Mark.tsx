import React from "react";
import styled, { css } from "styled-components";
import Player from "../main/Player";
import theme from "./common/theme";

interface MarkProps {
  type: Player;
}

const PlayerColorSvg = styled.svg(
  (props: MarkProps) =>
    css`
      * {
        fill: transparent;
      }

      .shape * {
        stroke: ${props.type === Player.X ? theme.red : theme.blue};
      }

      .shadow * {
        stroke: gray;
      }
    `
);

export default function Mark({ type }: MarkProps) {
  return (
    <PlayerColorSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      type={type}
    >
      {type === Player.X ? (
        <>
          <g className="shadow">
            <line x1="2" y1="2.5" x2="10" y2="10.5" strokeWidth="2" />
            <line x1="2" y1="10.5" x2="10" y2="2.5" strokeWidth="2" />
          </g>
          <g className="shape">
            <line x1="2" y1="2" x2="10" y2="10" strokeWidth="2" />
            <line x1="2" y1="10" x2="10" y2="2" strokeWidth="2" />
          </g>
        </>
      ) : (
        <>
          <g className="shadow">
            <circle cx="6" cy="6.5" r="4" strokeWidth="2" />
          </g>
          <g className="shape">
            <circle cx="6" cy="6" r="4" strokeWidth="2" />
          </g>
        </>
      )}
    </PlayerColorSvg>
  );
}
