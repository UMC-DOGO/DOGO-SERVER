const express = require("./config/express");
const { logger } = require("./config/winston");
const socketEvents = require("./src/app/Chat/socket.js");

const port = 3000;
const server = express().listen(port);
const io = require("socket.io")(server);
socketEvents(io);
logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);
