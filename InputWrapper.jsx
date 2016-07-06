import React, { PropTypes } from 'react';

const InputWrapper = (props) => {
  let wrapperClasses = 'form-group';
  if (props.wrapperClasses)
    wrapperClasses += ' ' + props.wrapperClasses;
  return (
    <div className={ wrapperClasses }>

      { props.label ? <label className='control-label' htmlFor={props.id}>{ props.label }</label> : '' }

      <div className='control-wrapper'>
        { props.children }
      </div>

    </div>
  );
}

InputWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string
}

export default InputWrapper;
