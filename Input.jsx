import React, { Component, PropTypes } from 'react';
import { HOC } from 'formsy-react';
import classNames from 'classnames';

import InputWrapper from './InputWrapper';

export const passwordValidation = {
  validations: {
    minLength: 8,
    matchRegexp: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).*$/,
  },
  validationErrors: {
    minLength: 'Must be at least 8 characters long.',
    matchRegexp: 'Must contain at least one uppercase letter, one lowercase letter, and one number.', // eslint-disable-line max-len
  },
};

export class Input extends Component {

  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    wrapperClasses: PropTypes.string,
    replaceStatusClass: PropTypes.string,
    className: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    step: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    addOnBefore: PropTypes.node,
    addOnAfter: PropTypes.node,
    onChange: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    isPristine: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    showRequired: PropTypes.func.isRequired,
    children: PropTypes.node,
    inputRef: PropTypes.func,
    prepValue: PropTypes.func,
  };

  static defaultProps = {
    type: 'text',
    required: false,
    disabled: false,
    getErrorMessage: () => null,
    showRequired: () => null,
    isPristine: () => null,
    onChange: () => {},
    inputRef: () => {},
    prepValue: v => v,
  };

  constructor(props, context) {
    super(props, context);
    this._changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    const value = this.props.prepValue(event.currentTarget.value);
    this.props.setValue(value);
    this.props.onChange(value);
  }

  render() {
    const { className, ...wrapperProps } = this.props;
    const { type, name, required, disabled, label, step, max, min, maxLength, minLength,
      addOnBefore, addOnAfter } = this.props;
    const id = `id_${name}`;
    const inputOpts = { id, type, name, required, disabled, step, max, min, maxLength, minLength };

    return (
      <InputWrapper
        {...wrapperProps}
        className={this.props.wrapperClasses}
        id={id}
        label={label}
      >

        <div className={classNames({ 'input-group': addOnBefore || addOnAfter })}>

          { addOnBefore ?
            <span className='input-group-addon'>{ addOnBefore }</span>
          : null }

          <input
            ref={this.props.inputRef}
            className={classNames('form-control', className)}
            {...inputOpts}
            value={this.props.getValue() || ''}
            placeholder={this.props.placeholder || label || ''}
            onChange={this._changeValue}
          />

          { addOnAfter ?
            <span className='input-group-addon'>{ addOnAfter }</span>
          : null }

        </div>

        <div className='feedback help-block'>
          { this.props.getErrorMessage() }
          { this.props.showRequired() && !this.props.isPristine() ?
            'This field is required.' : null }
        </div>

        { this.props.children }

      </InputWrapper>
    );
  }
}

export default HOC(Input); // eslint-disable-line new-cap
