const pool = require("./db");

const puzzles = [
  {
    puzzle_id: 1,
    x_min: 1575,
    y_min: 570,
    x_max: 1595,
    y_max: 615,
  },
  {
    puzzle_id: 2,
    x_min: 400,
    y_min: 500,
    x_max: 450,
    y_max: 560,
  },
  {
    puzzle_id: 3,
    x_min: 685,
    y_min: 980,
    x_max: 715,
    y_max: 1020,
  },
];

async function seed() {
  try {
    for (const p of puzzles) {
      await pool.query(
        `INSERT INTO public.characters (puzzle_id, name, x_min, y_min, x_max, y_max)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (puzzle_id, name) DO NOTHING`,
        [p.puzzle_id, "Waldo", p.x_min, p.y_min, p.x_max, p.y_max]
      );
    }
    console.log("Seeded database");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

seed();
