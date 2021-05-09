import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  function createBoard() {

    const lightOnOrOff = () => Math.random() < chanceLightStartsOn;

    const rows = Array.from({ length: nrows });

    const initialBoard = rows.map(row => Array.from({ length: ncols })
      .map(l => lightOnOrOff()));

    return initialBoard;
  }

  const hasWon = () => {
    return board.every(row => row.every(cell => !cell))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map(row => [...row]);


      flipCell(y, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);

      return boardCopy;
    });
  }

  const restart = () => setBoard(createBoard())

  if (hasWon()) {
    return (
      <>
      <h1 className='Board-winner'>You won!</h1>
      <button className='Board-restart' onClick={restart}>Play Again</button>
      </>
    )
  }

  let table = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    table.push(<tr key={y}>{row}</tr>);
  }

  return (
    <>
    <h1 className='Board-header'>LightsOut puzzle</h1>
    <button className='Board-restart' onClick={restart}>Restart Game</button>
    <table className='Board'>
      <tbody>
        {table}
      </tbody>
    </table>
    </>
  )
}

export default Board;
