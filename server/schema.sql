CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    puzzle_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    x_min INT NOT NULL,
    y_min INT NOT NULL,
    x_max INT NOT NULL,
    y_max INT NOT NULL
);

CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    time_seconds INT NOT NULL,
    puzzle_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);