const path = require("path");

const express = require("express");
const server = express();
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./errorHandler");

server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

server.use(express.static(path.join(__dirname, "../client")));
server.use(errorHandler); // error handler

module.exports = server;
