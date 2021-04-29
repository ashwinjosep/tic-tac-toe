import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className={"square " + props.value} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  createGrid() {
    let grid = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        let cell = this.renderSquare(i * 3 + j);
        row.push(cell);
      }
      grid.push(
        <div className="board-row" key={i}>
          {row}
        </div>
      );
    }
    return grid;
  }

  render() {
    return <div>{this.createGrid()}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),

          // adding the index of the cell that was edited
          squareNumber: -1,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const [winner] = calculateWinner(squares);
    if (winner === "x" || winner === "o" || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "x" : "o";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          // set the index of the edited cell
          squareNumber: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const [winner] = calculateWinner(current.squares);

    // mapping history
    const moves = history.map((step, move) => {
      // changing label for buttons to include row and column number
      const moveButtonLabel =
        "Go to move #" +
        move +
        " ( Row : " +
        Math.floor(history[move].squareNumber / 3) +
        " , Column : " +
        (history[move].squareNumber % 3) +
        " )";
      const desc = move ? moveButtonLabel : "Go to game start";
      const btnClass =
        move === this.state.stepNumber
          ? "btn btn-primary btn-block"
          : "btn btn-secondary btn-block";
      return (
        <li key={move}>
          <button
            className={btnClass}
            type={"button"}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner === "x" || winner === "o") {
      status = "Winner : " + winner;
    }
    // Adding game drawn message
    else if (this.state.stepNumber === 9) {
      status = "Game Drawn";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "x" : "o");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// function to calculate if game is won
function calculateWinner(squares) {
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
      // todo return cell indices to highlight the boxes
      return squares[a];
    }
  }
  return "-";
}

ReactDOM.render(<Game />, document.getElementById("root"));
