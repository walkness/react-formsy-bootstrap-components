import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { autobind } from 'core-decorators';

import InputWrapper from './InputWrapper';
import FormGroup from './FormGroup';


class Input extends Component {

  static propTypes = {
    addOnAfter: PropTypes.node,
    addOnBefore: PropTypes.node,
    btnBefore: PropTypes.element,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    formsy: PropTypes.shape({ setValue: PropTypes.func }),
    inputComponent: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    inputRef: PropTypes.func,
    label: PropTypes.string,
    large: PropTypes.bool,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    prepValue: PropTypes.func,
    renderFeedback: PropTypes.func,
    required: PropTypes.bool,
    small: PropTypes.bool,
    statusClassName: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    addOnAfter: null,
    addOnBefore: null,
    btnBefore: null,
    children: null,
    className: null,
    disabled: false,
    formsy: {},
    inputComponent: 'input',
    inputRef: () => {},
    label: '',
    large: false,
    onChange: null,
    placeholder: '',
    prepValue: v => v,
    renderFeedback: null,
    required: false,
    small: false,
    statusClassName: null,
    type: 'text',
    value: '',
  };

  constructor(...args) {
    super(...args);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    const { inputRef } = this.props;
    if (inputRef && this.inputRef) {
      inputRef(this.inputRef.current);
    }
  }

  @autobind
  changeValue(event) {
    const { formsy, onChange } = this.props;
    const { setValue } = formsy;
    if (setValue || onChange) {
      const value = this.props.prepValue((event.currentTarget || event.target).value);
      if (setValue) setValue(value);
      if (onChange) onChange(value, event);
    }
  }

  @autobind
  focus() {
    if (this.inputRef && this.inputRef.current && this.inputRef.current.focus) {
      this.inputRef.current.focus();
    }
  }

  @autobind
  blur() {
    if (this.inputRef && this.inputRef.current && this.inputRef.current.blur) {
      this.inputRef.current.blur();
    }
  }

  render() {
    const {
      className, value: rawValue, label, addOnBefore, addOnAfter, btnBefore, large, small,
      renderFeedback, inputRef, prepValue, formsy, statusClassName, inputComponent, ...inputOpts
    } = this.props;

    let value = rawValue;
    if (!(value === 0 || value === '0')) {
      value = value || '';
    }
    if (this.props.type === 'color' && !value) {
      value = undefined;
    }
    if (value) {
      value = `${value}`;
    }

    const component = React.createElement(inputComponent, {
      className: classNames('form-control', className, {
        'form-control-lg': large,
        'form-control-sm': small,
      }),
      ref: this.inputRef,
      ...inputOpts,
      value,
      placeholder: this.props.placeholder === undefined ? label || '' : this.props.placeholder,
      onChange: this.changeValue,
    });

    if (this.props.type === 'hidden') {
      return component;
    }

    return (
      <div className='input'>

        <div
          className={classNames('not-input-group', {
            'input-group': addOnBefore || addOnAfter || btnBefore,
          })}
        >

          { addOnBefore ?
            <div className='input-group-addon input-group-prepend'>{ addOnBefore }</div>
          : null }

          { btnBefore }

          { component }

          { addOnAfter ?
            <div className='input-group-addon input-group-append'>{ addOnAfter }</div>
          : null }

        </div>

        { renderFeedback && renderFeedback() }

        { this.props.children }

      </div>
    );
  }
}

export default InputWrapper(Input, FormGroup);
