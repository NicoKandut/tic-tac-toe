import styled from "styled-components";
import theme from "./theme";

export default styled.div`
  padding: 10%;
  display: grid;
  background-color: ${theme.lightBeige};

  :nth-of-type(even) {
    background-color: ${theme.darkBeige};
  }
`;
