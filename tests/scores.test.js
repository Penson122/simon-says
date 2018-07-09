const Scores = require('../server/Scores.js');
const Score = require('../server/score.js');
describe('Scores', () => {
  it('Can construct a new Scores', () => {
    const newScores = new Scores();
    expect(newScores.list).toEqual([]);
  });
  it('Can add a new Score to a Scores', () => {
    const newScore = new Score('Alice', 200);
    const newScores = new Scores();
    newScores.add(newScore);
    expect(newScores.list).toEqual([newScore]);
  });
  it('Scores are ordered by score descending', () => {
    const newScores = new Scores();
    const firstScore = new Score('Alice', 200);
    const secondScore = new Score('Bob', 500);
    newScores.add(firstScore);
    newScores.add(secondScore);
    expect(newScores.list).toEqual([secondScore, firstScore]);
  });
});
