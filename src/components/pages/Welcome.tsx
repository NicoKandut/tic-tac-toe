import React, { useCallback, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useRawInvite } from "../../main/useQuery";
import Card from "../common/Card";
import { Heading3 } from "../common/Headings";
import LinkButton from "../common/LinkButton";
import Main from "../common/Main";
import SubmitTextInput from "../common/SubmitTextInput";

const Grid2Col = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 20px;
`;

export function generateRoomId() {
  return btoa(new Date().getTime().toString().substr(6)).replace(/=+/, "");
}

export default function Welcome() {
  const invite = useRawInvite();

  const [code, setCode] = useState("");

  const redirectWithCode = useCallback(() => {
    window.location.search = `?i=${code}`;
  }, [code]);

  if (invite) {
    return <Redirect to={`/versus?i=${invite}`} />;
  }

  return (
    <Main>
      <Grid2Col>
        <Card title="Play online against your friends">
          <Grid2Col>
            <Heading3>Create Game</Heading3>
            <Heading3>Join Game</Heading3>
            <LinkButton to={"/versus"}>New Game</LinkButton>
            <SubmitTextInput
              value={code}
              setValue={setCode}
              submitText="Join"
              onSubmit={redirectWithCode}
            />
          </Grid2Col>
        </Card>
        <Card title="Play together on this PC">
          <LinkButton to={"/local"}>New Game</LinkButton>
        </Card>
      </Grid2Col>
    </Main>
  );
}
