import React from "react";

import "./App.css";
import "./styles.css";

//components
import Game from "./components/Game";

import About from "./components/About";

function App() {
  return (
    <div className="front-page">
      <h1 className="heading">Conway's Game of Life</h1>
      <div className="game-box">
        <Game />
        <About />
      </div>
    </div>
  );
}

export default App;
