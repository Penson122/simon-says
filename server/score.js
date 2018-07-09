class Score {
  constructor (name, score) {
    if (typeof name !== 'string') {
      throw new TypeError('Name should be a string');
    } else {
      this.name = name;
    }
    if (typeof score !== 'number') {
      throw new TypeError('Score should be a number');
    } else {
      this.score = score;
    }
  }
}

module.exports = Score;
