import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <h1>Tic Tac Toe React App</h1>
      </Link>
      <nav></nav>
    </header>
  );
}
