const express = require("express");
const cors = require("cors");
require("dotenv").config();

const charactersRouter = require("./routes/characters");
const scoresRouter = require("./routes/scores");

const app = express();
app.use(cors());
app.use(express.json());

app.use("./api/characters", charactersRouter);
app.use("./api/scores", scoresRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
