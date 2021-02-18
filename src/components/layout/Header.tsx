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
      min-width: fit-content;

      :visited {
        color: var(--text2);
      }

      :hover {
        color: teal;
      }
    }
  }

  a {
    color: var(--text1);
    text-decoration: none;

    :visited {
      color: var(--text1);
    }

    :hover {
      color: var(--text1);
    }
  }
`;

export default function Header() {
  return (
    <HeaderRow>
      <div>
        <Link to="/">
          <h1>Tic Tac Toe React App</h1>
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link
            to={`/versus?i=${stringify({
              roomId: generateRoomId(),
              playerId: Player.X,
            })}`}
          >
            Online Versus
          </Link>
          <Link to="/local">Local Versus</Link>
          <Link to="/computer">Computer Versus</Link>
        </nav>
      </div>
      <DarkModeButton />
    </HeaderRow>
  );
}
