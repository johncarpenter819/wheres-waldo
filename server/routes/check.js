const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  const { puzzleId, x, y } = req.body;

  try {
    const result = await pool.query(
      `SELECT x_min, y_min, x_max, y_max
            FROM characters
            WHERE puzzle_id = $1 AND name = 'Waldo`,
      [puzzleId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ found: false, message: "Puzzle not found" });
    }

    const { x_min, y_min, x_max, y_max } = result.rows[0];

    const found = x >= x_min && x <= x_max && y >= y_min && y <= y_max;

    res.json({ found });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
