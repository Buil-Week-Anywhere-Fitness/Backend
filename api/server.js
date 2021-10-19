const path = require("path");

const express = require("express");
const server = express();
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./auth/auth-router");
const classesRouter = require("./classes/classes-router");

const errorHandler = require("./errorHandler");

server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

server.use("/api/auth", authRouter);
server.use("/api/classes", classesRouter);

server.get("/", (req, res, next) => {
    res.status(200).json({message: "Welcome to Anywhere Fitness!", time: new Date().toLocaleTimeString()})
})

server.use(express.static(path.join(__dirname, "../client")));
server.use(errorHandler); // error handler

module.exports = server;
