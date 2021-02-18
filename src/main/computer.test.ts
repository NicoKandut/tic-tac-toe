import { evaluateBoard, getBestMove } from "./computer";
import Player from "./Player";

const xWins = {
  "1st row": [
    Player.X,
    Player.X,
    Player.X,
    Player.NONE,
    Player.NONE,
    Player.NONE,
    Player.NONE,
    Player.NONE,
    Player.NONE,
  ],
  "2nd Row": [
    Player.NONE,
    Player.NONE,
    Player.NONE,
    Player.X,
    Player.X,
    Player.X,
    Player.NONE,
    Player.NONE,
    Player.NONE,
  ],
  "1st Diagonal": [
    Player.X,
    Player.NONE,
    Player.NONE,
    Player.NONE,
    Player.X,
    Player.NONE,
    Player.NONE,
    Player.NONE,
    Player.X,
  ],
  "1st Diagonal with extras": [
    Player.X,
    Player.NONE,
    Player.O,
    Player.NONE,
    Player.X,
    Player.NONE,
    Player.O,
    Player.NONE,
    Player.X,
  ],
  "2nd Row with extras": [
    Player.O,
    Player.O,
    Player.NONE,
    Player.X,
    Player.X,
    Player.X,
    Player.NONE,
    Player.NONE,
    Player.NONE,
  ],
};

const xIn1 = {
  "2nd Row": [
    [
      Player.O,
      Player.O,
      Player.NONE,
      Player.X,
      Player.X,
      Player.NONE,
      Player.NONE,
      Player.NONE,
      Player.NONE,
    ],
    2,
  ],
};

const xForcedWins = {
  "1nd Row and 1st Column": [
    Player.X,
    Player.X,
    Player.NONE,
    Player.X,
    Player.NONE,
    Player.NONE,
    Player.X,
    Player.NONE,
    Player.NONE,
  ],
};

Object.entries(xWins).forEach(([key, board]) => {
  test(`Evaluates loss, ${key}`, () => {
    expect(evaluateBoard(board, Player.O)).toBe(-1);
  });
});

Object.entries(xWins).forEach(([key, board]) => {
  test(`Evaluates win, ${key}`, () => {
    expect(evaluateBoard(board, Player.X)).toBe(1);
  });
});

Object.entries(xIn1).forEach(([key, [board, winningMove]]) => {
  test(`Evaluates win in 1, ${key}`, () => {
    expect(evaluateBoard(board as Player[], Player.X)).toBe(1);
  });
});

Object.entries(xForcedWins).forEach(([key, board]) => {
  test(`Evaluates loss in 1, ${key}`, () => {
    expect(evaluateBoard(board, Player.O)).toBe(-1);
  });
});

Object.entries(xIn1).forEach(([key, [board, winningMove]]) => {
  test(`Correct Move, ${key}`, () => {
    expect(getBestMove(board as Player[], Player.X)).toBe(winningMove);
  });
});
