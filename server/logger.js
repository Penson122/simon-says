const winston = require('winston');

const formatter = options => (
  // eslint-disable-next-line max-len
  `${options.timestamp()} [${options.level.toUpperCase()}] ${options.message || ''}`);

const timeStamp = () => new Date().toISOString();
const consoleTransport = new winston.transports.Console({
  timestamp: timeStamp, formatter: formatter
});

const levels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
};

const logger = new winston.Logger({
  levels: levels,
  transports: [consoleTransport]
});

module.exports = logger;
