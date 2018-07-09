import React from 'react';
import PropTypes from 'prop-types';

const Username = ({ onChange }) => (
  <input type='text' onChange={onChange} placeholder='Username' />
);

Username.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Username;
