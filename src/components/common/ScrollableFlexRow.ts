import styled from "styled-components";
import theme from "./theme";

export default styled.div`
  width: 100%;
  display: flex;
  gap: ${theme.gap};
  padding-bottom: ${theme.padding};
  overflow-x: hidden;
  scroll-behavior: smooth;
`;
