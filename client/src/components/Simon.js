import React from 'react';
import PropTypes from 'prop-types';
import ButtonGrid from './ButtonGrid.js';
import Button from './Button.js';
import Score from './Score.js';
import Username from './Username.js';
import './Simon.css';

const baseColors = {
  green: '#5dff05',
  red: '#ff0c0c',
  blue: '#0c54ff',
  yellow: '#fffb11'
};

class Simon extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      presses: 0,
      score: 0,
      allCorrect: true,
      currentTurn: 0,
      currentPattern: [],
      pressPattern: [],
      flashColors: {
        green: '#9cfc67',
        red: '#fc646a',
        blue: '#5bb8ff',
        yellow: '#fffdad'
      },
      buttonColors: baseColors,
      styles: {
        greenButton: {
          backgroundColor: baseColors.green
        },
        redButton: {
          backgroundColor: baseColors.red
        },
        blueButton: {
          backgroundColor: baseColors.blue
        },
        yellowButton: {
          backgroundColor: baseColors.yellow
        }
      }
    };
    this.nextTurn = this.nextTurn.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this);
  }

  nextTurn () {
    const presses = this.state.presses + 1;
    if (presses === 1) {
      this.setState({ score: 0 });
    }
    const flashTime = 1000;
    const turnTime = 3000 + (flashTime * presses * 2);
    const nextPattern = this.generatePattern(presses);
    const currentTurn = setTimeout(() => this.gameOver(), turnTime);
    this.setState({
      currentTurn: currentTurn,
      currentPattern: nextPattern.slice(0),
      presses
    });
    this.playPattern(nextPattern, flashTime);
  }

  gameOver () {
    this.setState({
      currentPattern: [],
      pressPattern: [],
      currentTurn: 0,
      allCorrect: true,
      presses: 0
    });
    this.playPattern([0, 1, 2, 3], 400);
  }

  playPattern (pattern, flashTime) {
    setInterval(() => this.playColor(pattern.shift()), flashTime);
  }

  playColor (nextColor) {
    const { flashColors, buttonColors } = this.state;
    const t = 800;
    switch (nextColor) {
      case 0:
        this.flash('greenButton', flashColors.green);
        setTimeout(() => this.flash('greenButton', buttonColors.green), t);
        break;
      case 1:
        this.flash('redButton', flashColors.red);
        setTimeout(() => this.flash('redButton', buttonColors.red), t);
        break;
      case 2:
        this.flash('blueButton', flashColors.blue);
        setTimeout(() => this.flash('blueButton', buttonColors.blue), t);
        break;
      case 3:
        this.flash('yellowButton', flashColors.yellow);
        setTimeout(() => this.flash('yellowButton', buttonColors.yellow), t);
        break;
      default:
        break;
    }
  }

  flash (key, color) {
    const style = Object.assign({}, this.state.styles[key]);
    style.backgroundColor = color;
    const styles = Object.assign({}, this.state.styles);
    styles[key] = style;
    this.setState({ styles });
  }

  generatePattern (size) {
    return Array.apply(null, Array(size)).map(this.chooseButton);
  }

  chooseButton () {
    return Math.floor(Math.random() * Math.floor(4));
  }

  buttonHandler (which) {
    const pressPattern = this.state.pressPattern.concat([which]);
    this.setState({ pressPattern });
    pressPattern.forEach((p, i) => {
      if (pressPattern[i] !== this.state.currentPattern[i]) {
        this.setState({ allCorrect: false });
        clearTimeout(this.state.currentTurn);
        this.gameOver();
      } else {
        this.setState({ score: this.state.score + 10 });
      }
    });
    if (pressPattern.length === this.state.currentPattern.length) {
      this.setState({
        currentPattern: 0,
        pressPattern: []
      });
      clearTimeout(this.state.currentTurn);
      this.nextTurn();
    }
  }

  render () {
    const { styles } = this.state;
    return (
      <div className='Simon'>
        <ButtonGrid>
          <Button
            color='Green'
            style={styles.greenButton}
            action={() => this.buttonHandler(0)}
          />
          <Button
            color='Red'
            style={styles.redButton}
            action={() => this.buttonHandler(1)}
          />
          <Button
            color='Yellow'
            style={styles.yellowButton}
            action={() => this.buttonHandler(3)}
          />
          <Button
            color='Blue'
            style={styles.blueButton}
            action={() => this.buttonHandler(2)}
          />
        </ButtonGrid>
        <div className='ScoreContainer'>
          <button
            onClick={this.nextTurn}
            className='StartButton'>
            START
          </button>
          <Score score={this.state.score} />
        </div>
        <div className='UsernameContainer'>
          <Username onChange={this.props.usernameHandler} />
          <button onClick={() => this.props.saveScore(this.state.score)}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

Simon.propTypes = {
  usernameHandler: PropTypes.func.isRequired,
  saveScore: PropTypes.func.isRequired
};

export default Simon;
