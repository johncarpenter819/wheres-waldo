import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import PuzzleOne from "./pages/PuzzleOne";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<GamePage />} />
          <Route path="puzzle-one" element={<PuzzleOne />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
