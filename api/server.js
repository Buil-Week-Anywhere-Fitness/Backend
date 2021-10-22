const path = require("path");

const express = require("express");
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./error-handler");
const authRouter = require("./auth/auth-router");
const classesRouter = require("./classes/classes-router");
const usersRouter = require("./users/users-router");

server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

server.use("/api/auth", authRouter);
server.use("/api/classes", classesRouter);
server.use("/api/users", usersRouter);

server.get("/status", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to Anywhere Fitness!",
    time: new Date().toLocaleTimeString(),
  });
});

server.use(express.static(path.join(__dirname, "../client")));
server.use(errorHandler); // error handler

module.exports = server;
