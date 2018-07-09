const express = require('express');
const router = express.Router();
router.use(express.json());

const app = require('../app.js');
const Score = require('./score.js');

router.get('/', (req, res, next) => {
  const scores = app.get('Scores');
  res.json(scores.list);
});

router.post('/', (req, res, next) => {
  const Scores = app.get('Scores');
  const { name, score } = req.body;
  let errors = [];

  if (name === undefined) {
    errors.push('Name not found');
  }
  if (score === undefined) {
    errors.push('Score not found');
  }
  if (errors.length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const newScore = new Score(name, score);
  Scores.add(newScore);
  return res.json({ ok: true });
});

module.exports = router;
