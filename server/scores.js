class Scores {
  constructor () {
    this.list = [];
  }
  add (score) {
    this.list.push(score);
    this.list = this.list.sort((a, b) => b.score - a.score);
  }
}

module.exports = Scores;
