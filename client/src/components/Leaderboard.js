import React from 'react';
import PropTypes from 'prop-types';
import './Leaderboard.css';

const Leaderboard = ({ scores }) => (
  <div className='Leaderboard'>
    <span className='Title'>Leaderboard</span>
    {scores.map((s, i) => (
      <div key={i}>
        <span className='Name'>{s.name}</span>
        <span className='Score'>{s.score}</span>
      </div>
    ))}
  </div>
);

Leaderboard.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Leaderboard;
