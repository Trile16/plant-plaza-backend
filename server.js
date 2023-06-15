const PORT = 4000;
const express = require("express");
const server = express();

const cors = require("cors");
server.use(cors());

const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json());

const client = require("./db/index.js");
client.connect();

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
