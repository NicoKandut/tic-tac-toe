import React from "react";
import styled from "styled-components";
import theme from "../common/theme";

const FooterGrid = styled.footer`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: ${theme.gap};
`;

const FooterItem = styled.div`
  display: flex;

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
        <span>ABC</span>
      </FooterItem>
      <FooterItem>
        <span>XYZ</span>
      </FooterItem>
    </FooterGrid>
  );
}
