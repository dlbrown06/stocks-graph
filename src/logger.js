const pino = require("pino");
const logger = pino({
  prettyPrint:
    process.env.NODE_ENV !== "production" ? { colorize: true } : false
});

module.exports = logger;
