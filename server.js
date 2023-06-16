const PORT = 4000;
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const apiRouter = require("./api");
const server = express();
const client = require("./db");

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

client.connect();

server.use("/api", apiRouter);

// empty route error handler
server.get("*", (req, res) => {
  res.status(404).send({
    error: "404 - Not Found",
    message: "No route found for the requested URL",
  });
});

// error handler
server.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  console.log({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
