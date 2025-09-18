import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { validateClick, postScore } from "../api/api";
import "../styles/PuzzleOne.css";

const PuzzleOne = () => {
  const location = useLocation();
  const playerName = location.state?.playerName || "Anonymous";

  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [found, setFound] = useState(false);

  const imgRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const delay = setTimeout(() => setTimerActive(true), 5000);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (!timerActive || found) return;
    intervalRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(intervalRef.current);
  }, [timerActive, found]);

  const handleClick = async (e) => {
    if (found) return;

    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();

    const scaleX = imgRef.current.naturalWidth / rect.width;
    const scaleY = imgRef.current.naturalHeight / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    console.log("Scaled clicked cords:", x, y);

    const result = await validateClick(1, "Waldo", x, y);
    if (result.success) {
      setFound(true);
      clearInterval(intervalRef.current);
      await postScore(1, playerName, time);
      alert(`You found Waldo in ${time} seconds!`);
    }
  };

  return (
    <div className="puzzle-page">
      <h1 className="puzzle-title">Puzzle One</h1>
      <p className="player-name">Player: {playerName}</p>
      <p className="timer">Timer: {time}s</p>
      <img
        ref={imgRef}
        className="puzzle-image"
        src="/puzzle1.jpg"
        alt="Puzzle One"
        onClick={handleClick}
      />
    </div>
  );
};

export default PuzzleOne;
