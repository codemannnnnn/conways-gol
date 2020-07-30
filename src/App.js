import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

//components
import Game from "./components/Game";
import Dark from "./components/Dark";
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
