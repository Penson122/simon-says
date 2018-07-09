import React from 'react';
import PropTypes from 'prop-types';
import './Score.css';

const Score = ({ score }) => (
  <div className='Score'>
    <span>{score}</span>
  </div>
);

Score.propTypes = {
  score: PropTypes.number.isRequired
};

export default Score;
