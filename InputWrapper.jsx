import React, { PropTypes } from 'react';
import classNames from 'classnames';


const InputWrapper = (props) => {
  const { label, required, disabled, highlightSuccess, highlightError, replaceStatusClass } = props;
  const isValid = props.isValid();
  const isPristine = props.isPristine();

  return (
    <div
      className={classNames(
        'form-group',
        props.className, {
          'has-success': isValid && !isPristine && highlightSuccess && !replaceStatusClass,
          'has-danger': !isValid && !isPristine && highlightError && !replaceStatusClass,
          required,
          disabled,
        },
        replaceStatusClass,
      )}
    >

      { label ? <label className='control-label' htmlFor={props.id}>{ label }</label> : null }

    { props.helpText ?
      <div className='help-text'>
        { props.helpText }
      </div>
    : null }

      <div className='control-wrapper'>
        { props.children }
      </div>

      { props.afterControl }

    </div>
  );
};

InputWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  helpText: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
  afterControl: PropTypes.node,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  highlightSuccess: PropTypes.bool,
  highlightError: PropTypes.bool,
  replaceStatusClass: PropTypes.string,
  isValid: PropTypes.func,
  isPristine: PropTypes.func,
};

InputWrapper.defaultProps = {
  highlightSuccess: false,
  highlightError: true,
  isValid: () => true,
  isPristine: () => true,
};

export default InputWrapper;
