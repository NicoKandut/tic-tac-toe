import React from "react";
import Player from "../main/Player";
import "./Mark.css";

export default function Mark({ type }: { type: Player }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      className={`mark ${type}`}
    >
      {type === Player.X ? (
        <>
          <g className="shadow">
            <line x1="2" y1="2.5" x2="10" y2="10.5" strokeWidth="2" />
            <line x1="2" y1="10.5" x2="10" y2="2.5" strokeWidth="2" />
          </g>
          <g className="shape">
            <line x1="2" y1="2" x2="10" y2="10" strokeWidth="2" />
            <line x1="2" y1="10" x2="10" y2="2" strokeWidth="2" />
          </g>
        </>
      ) : (
        <>
          <g className="shadow">
            <circle cx="6" cy="6.5" r="4" strokeWidth="2" />
          </g>
          <g className="shape">
            <circle cx="6" cy="6" r="4" strokeWidth="2" />
          </g>
        </>
      )}
    </svg>
  );
}
