import React from "react";
import { Link } from "react-router-dom";

function generateRoomId() {
  return btoa(new Date().getTime().toString()).replace(/=+/, "");
}

export default function Welcome() {
  return (
    <main>
      <span>Create a game: </span>
      <Link to={"/" + generateRoomId() + "/x"}>New Game</Link>
    </main>
  );
}
