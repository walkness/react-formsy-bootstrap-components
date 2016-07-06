import React, { PropTypes } from 'react';


const SubmitButton = ({ enabled, label, isSubmitting, className, onClick, children }) => {

  const classes = ['btn', 'btn-primary']
  if (className)
    classes.push(className)
  if (isSubmitting)
    classes.push('loading')

  return (
    <button
      type='submit'
      className={ classes.join(' ') }
      disabled={ !enabled || isSubmitting }
      onClick={onClick}>

      <span className='loader-icon'/>

      { children || label }

    </button>
  );
}

SubmitButton.propTypes = {
  enabled: PropTypes.bool,
  label: PropTypes.string,
  isSubmitting: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

SubmitButton.defaultProps = {
  enabled: true,
  label: 'Submit',
  isSubmitting: false,
  className: '',
  onClick: (e) => {},
}

export default SubmitButton;
