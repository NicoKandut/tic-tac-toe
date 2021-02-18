import styled, { css } from "styled-components";

export default styled.div(
  ({ index }: { index: number }) => css`
    padding: 10%;
    display: grid;
    background-color: var(--tile1);
    aspect-ratio: 1/1;
    grid-row: ${1 + Math.floor(index / 3)} / ${2 + Math.floor(index / 3)};
    grid-column: ${1 + (index % 3)} / ${2 + (index % 3)};

    :nth-of-type(even) {
      background-color: var(--tile2);
    }
  `
);
