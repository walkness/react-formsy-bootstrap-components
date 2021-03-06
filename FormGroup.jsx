import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { statusClassName as statusOverrideClassName } from './InputWrapper';


const FormGroup = (props) => {
  const {
    label, helpText, success, danger, warning, required, disabled, empty, horizontal,
    replaceStatusClass, statusClassName, className, children, id, afterControl, type,
    labelClassName, controlWrapperClassName, ...extraProps
  } = props;

  if (type === 'hidden') {
    return children;
  }

  const baseClasses = ['form-group', className];
  return (
    <div
      className={(
        statusClassName ?
        statusClassName(baseClasses) :
        statusOverrideClassName(props, baseClasses)
      )}
      {...extraProps}
    >

      { label ?
        <label
          className={classNames('control-label', { 'col-form-label': horizontal }, labelClassName)}
          htmlFor={id}
        >
          { label }
        </label>
      : null }

      { helpText ?
        <div className='form-text help-text'>
          { helpText }
        </div>
      : null }

      <div className={classNames('control-wrapper', controlWrapperClassName)}>
        { children }
      </div>

      { afterControl }

    </div>
  );
};

FormGroup.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  helpText: PropTypes.node,
  success: PropTypes.bool,
  danger: PropTypes.bool,
  warning: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  empty: PropTypes.bool,
  horizontal: PropTypes.bool,
  replaceStatusClass: PropTypes.string,
  className: PropTypes.string,
  afterControl: PropTypes.node,
  id: PropTypes.string.isRequired,
  statusClassName: PropTypes.func,
  labelClassName: PropTypes.string,
  controlWrapperClassName: PropTypes.string,
};

FormGroup.defaultProps = {
  type: undefined,
  label: '',
  helpText: '',
  success: false,
  danger: false,
  warning: false,
  required: false,
  disabled: false,
  empty: false,
  horizontal: false,
  replaceStatusClass: '',
  className: '',
  afterControl: null,
  statusClassName: null,
  labelClassName: null,
  controlWrapperClassName: null,
};

export default FormGroup;
