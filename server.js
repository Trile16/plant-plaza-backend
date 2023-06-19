const PORT = process.env.PORT || 3000;
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const apiRouter = require("./api");
const server = express();
const client = require("./db");

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

client.connect();

server.use(express.static("static"));

server.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/static/index.html"))
);

server.use("/api", apiRouter);

// empty route error handler
server.get("*", (req, res) => {
  res.status(404).send({
    success: false,
    error: {
      name: "404 - Not Found",
      message: "No route found for the requested URL",
    },
    data: null,
  });
});

// error handler
server.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  res.send({
    success: false,
    error: { name: error.name, message: error.message },
    data: null,
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
