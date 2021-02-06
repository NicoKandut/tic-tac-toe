import React from "react";
import styled from "styled-components";
import theme from "../common/theme";
import { FaCodeBranch, FaGithub, FaPen } from "react-icons/fa";

const FooterGrid = styled.footer`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  margin-bottom: ${theme.gap};
  color: var(--text2);

  div {
    transition: color 0.2s linear;
    color: var(--text2);

    :hover {
      color: teal;
    }
  }

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
`;

const FooterItem = styled.div`
  display: flex;
  gap: 5px;

  :nth-of-type(odd) {
    flex-direction: row;
  }

  :nth-of-type(even) {
    flex-direction: row-reverse;
  }
`;

export default function Footer() {
  return (
    <FooterGrid>
      <FooterItem>
        <FaPen />
        <span>Nico Kandut</span>
      </FooterItem>
      <FooterItem>
        <FaCodeBranch />
        <span>0.1.6</span>
      </FooterItem>
      <FooterItem>
        <FaGithub />
        <a href="https://github.com/NicoKandut/tic-tac-toe">Repository</a>
      </FooterItem>
    </FooterGrid>
  );
}
