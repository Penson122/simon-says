import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ color, action, style }) => (
  <button
    onClick={action}
    className={`Button ${color}`}
    style={style}
  />
);

Button.propTypes = ({
  color: PropTypes.string.isRequired,
  action: PropTypes.func,
  style: PropTypes.object.isRequired
});

export default Button;
