import React, { useEffect, useState } from "react";
import {
  getCharacters,
  validateClick,
  postScore,
  getLeaderboard,
} from "../api/api";
import "../styles/GamePage.css";
import { useNavigate } from "react-router-dom";

const GamePage = () => {
  const [characters, setCharacters] = useState([]);
  const [found, setFound] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [time, setTime] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  const puzzles = [1, 2, 3];

  useEffect(() => {
    puzzles.forEach(async (puzzleId) => {
      const chars = await getCharacters(puzzleId);
      setCharacters((prev) => ({ ...prev, [puzzleId]: chars }));
      setFound((prev) => ({ ...prev, [puzzleId]: [] }));
      setTime((prev) => ({ ...prev, [puzzleId]: 0 }));
    });
    fetchLeaderBoard();
  }, []);

  useEffect(() => {
    const intervals = puzzles.map((puzzleId) =>
      setInterval(() => {
        setTime((prev) => ({ ...prev, [puzzleId]: prev[puzzleId] + 1 }));
      }, 1000)
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  const handleClick = async (puzzleId, e) => {
    if (!playerName.trim()) {
      alert("Please enter you name before starting the puzzle!");
      return;
    }

    switch (puzzleId) {
      case 1:
        navigate("/puzzle-one", { state: { playerName } });
        break;
      case 2:
        navigate("/puzzle-two", { state: { playerName } });
        break;
      case 3:
        navigate("/puzzle-three", { state: { playerName } });
        break;
      default:
        break;
    }
  };

  const fetchLeaderBoard = async () => {
    const data = {};
    for (const puzzleId of puzzles) {
      const scores = await getLeaderboard(puzzleId);
      data[puzzleId] = scores;
    }
    setLeaderboard(data);
  };

  return (
    <div className="game-page">
      <div className="section leaderboard">
        <h1>Leaderboard</h1>
        {puzzles.map((puzzleId) => (
          <div key={puzzleId}>
            <h2>Puzzle {puzzleId}</h2>
            <ul>
              {leaderboard[puzzleId]?.map((score, idx) => (
                <li key={idx}>
                  {score.player_name}: {score.time_seconds}s
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {puzzles.map((puzzleId) => (
        <div className="puzzle-section" key={puzzleId}>
          <h2>Puzzle {puzzleId}</h2>
          <div className="puzzle-container">
            <img
              src={`/puzzle${puzzleId}.jpg`}
              alt={`Puzzle ${puzzleId}`}
              onClick={(e) => handleClick(puzzleId, e)}
            />
            {found[puzzleId]?.length > 0 && (
              <div className="message">You found Waldo!</div>
            )}
          </div>
          <div className="score-input">
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamePage;
