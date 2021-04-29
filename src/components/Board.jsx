import React from "react";
import Square from "./Square";

const Board = (props) => {
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  };

  const createGrid = () => {
    let grid = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        let cell = renderSquare(i * 3 + j);
        row.push(cell);
      }
      grid.push(
        <div className="board-row" key={i}>
          {row}
        </div>
      );
    }
    return grid;
  };

  return <div className="game-board">{createGrid()}</div>;
};

export default Board;
