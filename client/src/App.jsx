import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import PuzzleOne from "./pages/PuzzleOne";
import PuzzleTwo from "./pages/PuzzleTwo";
import PuzzleThree from "./pages/PuzzleThree";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<GamePage />} />
          <Route path="puzzle-one" element={<PuzzleOne />} />
          <Route path="puzzle-two" element={<PuzzleTwo />} />
          <Route path="puzzle-three" element={<PuzzleThree />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
