"use strict";
const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const fs = require("fs");

const logDir = `${process.cwd()}/logs`;

if (fs.existsSync(logDir) == false) {
    fs.mkdirSync(logDir);
}

const infoTransport = new transports.DailyRotateFile({
    filename: `${logDir}/info-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    level: "info"
});

const errorTransport = new transports.DailyRotateFile({
    filename: `${logDir}/error-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    level: "error"
});

const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.printf(
            info => `${info.level} ${info.timestamp} : ${info.message}`
        )
    ),
    transports: [infoTransport, errorTransport]
});

module.exports = logger;
