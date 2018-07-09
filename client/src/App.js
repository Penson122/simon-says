import React, { Component } from 'react';
import Simon from './components/Simon.js';
import Leaderboard from './components/Leaderboard.js';
import './App.css';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      scores: []
    };
    this.usernameHandler = this.usernameHandler.bind(this);
    this.saveScore = this.saveScore.bind(this);
  }

  async componentWillMount () {
    const res = await fetch('/scores', {
      method: 'GET',
      headers: headers
    });
    const json = await res.json();
    this.setState({ scores: json });
  }

  usernameHandler (event) {
    this.setState({ username: event.target.value });
  }

  saveScore (score) {
    // TODO: implement error handling
    const newScore = {
      name: this.state.username,
      score: score
    };
    let scores = [newScore, ...this.state.scores];
    scores = scores.sort((a, b) => b.score - a.score);
    this.setState({ scores: scores });
    fetch('/scores', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(newScore)
    });
  }

  render () {
    return (
      <div style={{ marginTop: '50px' }}>
        <div className='GameContainer'>
          <h1>SIMON SAYS</h1>
          <Simon
            usernameHandler={this.usernameHandler}
            saveScore={this.saveScore}
          />
        </div>
        <div className='LeaderboardContainer'>
          <Leaderboard scores={this.state.scores} />
        </div>
      </div>
    );
  }
}

export default App;
