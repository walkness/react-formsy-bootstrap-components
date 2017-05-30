import React, { PropTypes } from 'react';
import classNames from 'classnames';


const ErrorMessage = ({ message, code }) => (
  <li className={classNames('error', { [`code_${code}`]: !!code })}>
    { message }
  </li>
);

ErrorMessage.propTypes = {
  message: PropTypes.node.isRequired,
  code: PropTypes.code,
};

ErrorMessage.defaultProps = {
  code: null,
};

export default ErrorMessage;
