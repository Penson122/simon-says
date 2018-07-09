const Score = require('../server/score.js');

describe('Score', () => {
  it('Can construct a new score', () => {
    const newScore = new Score('Alice', 200);
    expect(newScore.name).toEqual('Alice');
    expect(newScore.score).toEqual(200);
  });
  it('Throws error if name is not a string', () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const newScore = new Score(100, 'alice');
    } catch (e) {
      expect(e.name).toEqual('TypeError');
      expect(e.message).toEqual('Name should be a string');
    }
  });
  it('Throws error if score is not a number', () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const newScore = new Score('alice', 'alice');
    } catch (e) {
      expect(e.name).toEqual('TypeError');
      expect(e.message).toEqual('Score should be a number');
    }
  });
});
