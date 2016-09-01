import React, { PropTypes } from 'react';
import classNames from 'classnames';


const InputWrapper = ({ wrapperClasses, id, label, children }) => (
  <div className={classNames('form-group', wrapperClasses)}>

    { label ? <label className='control-label' htmlFor={id}>{ label }</label> : null }

    <div className='control-wrapper'>
      { children }
    </div>

  </div>
);

InputWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  wrapperClasses: PropTypes.string,
  children: PropTypes.node,
};

export default InputWrapper;
