import { stringify } from "../../main/invite";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Player from "../../main/Player";
import DarkModeButton from "../DarkModeButton";
import { generateRoomId } from "../pages/Welcome";

const HeaderRow = styled.header`
  display: flex;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 30px;

    a {
      color: var(--text2);
      text-decoration: none;

      :visited {
        color: var(--text2);
      }
  
      :hover {
        color: teal;
      }
    }
  }
`;

export default function Header() {
  return (
    <HeaderRow>
      <div>
      <h1>Tic Tac Toe React App</h1>
      <nav><Link to="/">Home</Link><Link
        to={`/versus?i=${stringify({
          roomId: generateRoomId(),
          playerId: Player.X,
        })}`}
      >
        Versus
      </Link></nav>
      </div>
      <DarkModeButton />
    </HeaderRow>
  );
}
