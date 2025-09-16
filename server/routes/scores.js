const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  const { puzzleId, playerName, time } = req.body;
  try {
    await pool.query(
      "INSERT INTO scores (puzzle_id, player_name, time_seconds) VALUES ($1, $2, $3)",
      [puzzleId, playerName, time]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:puzzleId", async (req, res) => {
  const { puzzleId } = req.params;
  try {
    const result = await pool.query(
      "SELECT player_name, time_seconds, created_at FROM scores WHERE puzzle_id = $1 ORDER BY time_seconds ASC LIMIT 10",
      [puzzleId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
