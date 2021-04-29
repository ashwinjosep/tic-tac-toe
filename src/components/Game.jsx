import React, { useState } from "react";
import Board from "./Board";
import "../index.css";

const Game = () => {
  const [history, setHistory] = useState({
    squares: Array(9).fill(null),
    squareNumber: -1,
  });

  const [step, setStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const squares = history.squares.slice();
    const winner = calculateWinner(squares);

    if (winner === "x" || winner === "o" || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "x" : "o";
    const historyUpdate = {
      squares: squares,
      squareNumber: i,
    };

    setHistory(historyUpdate);
    setXIsNext(!xIsNext);
    setStep(step + 1);
  };

  const getStatus = (winner) => {
    if (winner === "x" || winner === "o") {
      return "Winner : " + winner;
    } else if (step === 9) {
      return "Game Drawn";
    } else {
      return "Next player: " + (xIsNext ? "x" : "o");
    }
  };

  const winner = calculateWinner(history.squares);
  const status = getStatus(winner);

  return (
    <div className="game">
      <div className="game-info">
        <div>{status}</div>
      </div>
      <Board squares={history.squares} onClick={(i) => handleClick(i)} />
    </div>
  );
};

// function to calculate if game is won
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return "-";
};

export default Game;
