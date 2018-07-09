import React from 'react';
import PropTypes from 'prop-types';
import './ButtonGrid.css';

const ButtonGrid = ({ children }) => {
  return <div className='ButtonGrid'>{children}</div>;
};

ButtonGrid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ButtonGrid;
