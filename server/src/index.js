const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const dbo = require("./db/conn");
const port = process.env.EXPRESS_PORT;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(require("./routes/tile"));

app.use((err, _req, res) => {
  console.error(err.stack);
  res.status(500).send("Error");
});

dbo.connectToServer((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  app.listen(port, () => {
    console.log(`Tile server listening at http://localhost:${port}`);
  });
});
