import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkButton = styled(Link)`
  height: 32px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  background-color: var(--bg2);
  border-radius: 5px;
  filter: drop-shadow(0 5px 0 var(--shadow));
  transition: all 0.2s linear;
  text-decoration: none;
  color: var(--text1);

  :hover {
    opacity: 0.75;
  }
`;

export default LinkButton;
