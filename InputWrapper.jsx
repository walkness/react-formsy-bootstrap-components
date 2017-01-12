import React, { PropTypes } from 'react';
import classNames from 'classnames';


const InputWrapper = (props) => {
  const { label, required, disabled, highlightSuccess, highlightError, replaceStatusClass,
    horizontal, getValue, helpText } = props;
  const isValid = props.isValid();
  const isPristine = props.isPristine();

  return (
    <div
      className={classNames(
        'form-group',
        props.className, {
          row: horizontal,
          'has-success': isValid && !isPristine && highlightSuccess && !replaceStatusClass,
          'has-danger': !isValid && !isPristine && highlightError && !replaceStatusClass,
          required,
          disabled,
          empty: !getValue(),
          'has-help': !!helpText,
        },
        replaceStatusClass,
      )}
    >

      { label ?
        <label
          className={classNames('control-label', { 'col-form-label': horizontal })}
          htmlFor={props.id}
        >
          { label }
        </label>
      : null }

      { helpText ?
        <div className='form-text help-text'>
          { helpText }
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
  horizontal: PropTypes.bool,
  getValue: PropTypes.func,
};

InputWrapper.defaultProps = {
  highlightSuccess: false,
  highlightError: true,
  isValid: () => true,
  isPristine: () => true,
  getValue: () => '',
};

export default InputWrapper;
