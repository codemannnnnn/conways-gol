import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

const numRows = 30;
const numCols = 30;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const presetOne = () => {
  const rows = [];
  rows.push(Array.from(Array(numRows), () => 20));
  return rows;
};
const Game = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  // console.log(grid);

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, []);

  return (
    <>
      <div className="cta">
        <div className="buttons">
          <button
            className="btn"
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }}
          >
            {running ? "Stop" : "Start"}
          </button>
          <button
            className="btn"
            onClick={() => {
              const rows = [];
              for (let i = 0; i < numRows; i++) {
                rows.push(
                  Array.from(Array(numCols), () =>
                    Math.random() > 0.8 ? 1 : 0
                  )
                );
              }
              setGrid(rows);
            }}
          >
            Randomize
          </button>
          <button
            className="btn"
            onClick={() => {
              const rows = [];
              for (let i = 0; i < numRows; i++) {
                rows.push(
                  Array.from(Array(numCols), () =>
                    Math.random() > 0.8 ? 1 : 0
                  )
                );
              }
              setGrid(rows);
            }}
          >
            preset 1
          </button>
          <button
            className="btn"
            onClick={() => {
              setGrid(generateEmptyGrid());
            }}
          >
            Clear Grid
          </button>
        </div>
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, 20px)`,
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                key={`${i}-${k}`}
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    gridCopy[i][k] = grid[i][k] ? 0 : 1;
                  });
                  setGrid(newGrid);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[i][k] ? "dodgerblue" : "black",
                  border: "solid 1px dodgerblue",
                }}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Game;
