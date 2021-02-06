import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useRawInvite } from "../../main/useQuery";
import Main from "../common/Main";

export default function Welcome() {
  const invite = useRawInvite();

  const [code, setCode] = useState("");

  return (
    <Main>
      {invite && <Redirect to={`/versus?i=${invite}`} />}
      <h2>Play online against your friends: </h2>
      <Link to={"/versus"}>New Game</Link>
      <h2>Join a game: </h2>
      <input
        type="text"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <Link to={`/versus?i=${code}`}>Join Game</Link>
      <h2>Play together on this pc: </h2>
      <Link to={"/local"}>New Game</Link>
    </Main>
  );
}
