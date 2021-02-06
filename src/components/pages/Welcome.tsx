import React from "react";
import { Link, Redirect } from "react-router-dom";
import { stringify } from "../../main/invite";
import Player from "../../main/Player";
import { useRawInvite } from "../../main/useQuery";

export function generateRoomId() {
  return btoa(new Date().getTime().toString().substr(6)).replace(/=+/, "");
}

export default function Welcome() {
  const invite = useRawInvite();

  return (
    <main>
      {invite && <Redirect to={`/versus?i=${invite}`} />}
      <span>Create a game: </span>
      <Link
        to={`/versus?i=${stringify({
          roomId: generateRoomId(),
          playerId: Player.X,
        })}`}
      >
        New Game
      </Link>
    </main>
  );
}
