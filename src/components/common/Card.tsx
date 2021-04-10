import React from "react";
import styled from "styled-components";
import { Heading2 } from "./Headings";

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 20px;
  gap: 10px;
`;

const CardDivider = styled.div`
  background-color: var(--bg2);
  height: 1px;
  width: 100%;
`;

interface CardProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export default function Card(props: CardProps) {
  const { title, children } = props;

  return (
    <CardBody>
      <Heading2>{title}</Heading2>
      <CardDivider />
      {children}
    </CardBody>
  );
}
