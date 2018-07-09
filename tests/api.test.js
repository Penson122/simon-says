const request = require('supertest');
const { App } = require('../app.js');
const Scores = require('../server/scores.js');

const port = process.env.PORT || 7000;

describe('Post new scores', () => {
  let server;
  beforeEach(() => {
    server = App.listen(port);
    App.set('Scores', new Scores());
  });
  afterEach(() => {
    server.close();
  });
  it('Should be able to send a new score', async () => {
    const scores = [{ name: 'Alice', score: 200 }];
    const sentScore = await request(App)
      .post('/scores')
      .send(scores[0]);
    const scoreList = await request(App)
      .get('/scores');
    expect(sentScore.body).toEqual({ ok: true });
    expect(scoreList.body).toEqual(scores);
  });
  it('Should return error for missing name', async () => {
    const missingName = await request(App)
      .post('/scores')
      .send({ score: 200 });
    const { body, status } = missingName;
    expect(status).toEqual(400);
    expect(body).toEqual({ ok: false, errors: ['Name not found'] });
  });
  it('Should return error for missing score', async () => {
    const missingScore = await request(App)
      .post('/scores')
      .send({ name: 'Alice' });
    const { body, status } = missingScore;
    expect(status).toEqual(400);
    expect(body).toEqual({ ok: false, errors: ['Score not found'] });
  });
});

describe('Retreive Scores', () => {
  let server;
  beforeEach(() => {
    server = App.listen(port);
    App.set('Scores', new Scores());
  });
  afterEach(() => {
    server.close();
  });
  it('First result should return an empty list', async () => {
    const res = await request(App)
      .get('/scores/');
    const { body, status } = res;
    expect(status).toEqual(200);
    expect(Array.isArray(body)).toBeTruthy();
  });
  it('Results should be ordered descending by score', async () => {
    const scores = [
      { name: 'Alice', score: 200 },
      { name: 'Bob', score: 500 }
    ];
    const sortedScores = scores.sort((a, b) => b.score - a.score);
    const firstScoreRes = await request(App)
      .post('/scores/')
      .send(scores[0]);
    const secondScoreRes = await request(App).post('/scores/')
      .send(scores[1]);
    const res = await request(App)
      .get('/scores/');

    expect(firstScoreRes.status).toEqual(200);
    expect(secondScoreRes.status).toEqual(200);
    const { body, status } = res;
    expect(status).toEqual(200);
    expect(Array.isArray(body)).toBeTruthy();
    expect(body).toEqual(sortedScores);
  });
});
