import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const ErrorMessage = ({ message, code, fieldName }) => (
  <li className={classNames('error', { [`code_${code}`]: !!code })}>
    { fieldName && <span className='field-name'>{ fieldName }: </span> }
    { message }
  </li>
);

ErrorMessage.propTypes = {
  message: PropTypes.node.isRequired,
  code: PropTypes.string,
  fieldName: PropTypes.string,
};

ErrorMessage.defaultProps = {
  code: null,
  fieldName: null,
};

export default ErrorMessage;
