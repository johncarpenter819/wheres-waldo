const API_URL = import.meta.env.VITE_API_URL;

export const getCharacters = async (puzzleId) => {
  const res = await fetch(`${API_URL}/api/characters/${puzzleId}`);
  return res.json();
};

export const validateClick = async (puzzleId, character, x, y) => {
  const res = await fetch(`${API_URL}/api/characters/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ puzzleId, character, x, y }),
  });
  return res.json();
};

export const postScore = async (puzzleId, playerName, time) => {
  const res = await fetch(`${API_URL}/api/scores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ puzzleId, playerName, time }),
  });
  return res.json();
};

export const getLeaderboard = async (puzzleId) => {
  const res = await fetch(`${API_URL}/api/scores/${puzzleId}`);
  return res.json();
};

export const checkClick = async (puzzleId, x, y) => {
  const res = await fetch(`${API_URL}/api/check`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ puzzleId, x, y }),
  });
  return res.json();
};
