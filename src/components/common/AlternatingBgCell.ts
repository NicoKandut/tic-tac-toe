import styled from "styled-components";

export default styled.div`
  padding: 10%;
  display: grid;
  background-color: var(--tile1);
  aspect-ratio: 1/1;

  :nth-of-type(even) {
    background-color: var(--tile2);
  }
`;
