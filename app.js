const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = module.exports = express();
const api = require('./server/api.js');
const logger = require('./server/logger.js');
const Scores = require('./server/scores.js');
const port = process.env.PORT || 7000;

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('short', {
    stream: { write: message => logger.info(message) }
  }));
}

app.use(express.static(path.join(__dirname, 'client/build')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/scores', api);
app.set('Scores', new Scores());
// Serve babel compiled build of triton
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    logger.info(`Now listening on ${port}`);
  });
}

module.exports = { App: app };
