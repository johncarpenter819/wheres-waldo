const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:puzzleId", async (req, res) => {
  try {
    const { puzzleId } = req.params;
    const result = await pool.query(
      "SELECT * FROM characters WHERE puzzle_id = $1",
      [puzzleId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/validate", async (req, res) => {
  const { puzzleId, character, x, y } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM  characters WHERE puzzle_id = $1 AND name = $2",
      [puzzleId, character]
    );

    if (result.rows.length === 0) return res.json({ success: false });

    const loc = result.rows[0];
    const match =
      x >= loc.x_min && x <= loc.x_max && y >= loc.y_min && y <= loc.y_max;

    res.json({ success: match });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
