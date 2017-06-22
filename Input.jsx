import React, { Component, PropTypes } from 'react';
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
    formsy: PropTypes.shape({
      setValue: PropTypes.func,
    }),
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
    value: PropTypes.string,
  };

  static defaultProps = {
    addOnAfter: null,
    addOnBefore: null,
    btnBefore: null,
    children: null,
    className: null,
    disabled: false,
    formsy: {},
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

  @autobind
  changeValue(event) {
    const { formsy, onChange } = this.props;
    const { setValue } = formsy;
    if (setValue || onChange) {
      const value = this.props.prepValue(event.currentTarget.value);
      if (setValue) setValue(value);
      if (onChange) onChange(value, event);
    }
  }

  render() {
    const {
      className, value, label, addOnBefore, addOnAfter, btnBefore, large, small, renderFeedback,
      inputRef, prepValue, formsy, statusClassName, ...inputOpts
    } = this.props;

    if (this.props.type === 'hidden') {
      return (
        <input
          ref={this.props.inputRef}
          {...inputOpts}
          value={value || ''}
          placeholder={this.props.placeholder || label || ''}
          onChange={this.changeValue}
        />
      );
    }

    return (
      <div>

        <div className={classNames({ 'input-group': addOnBefore || addOnAfter || btnBefore })}>

          { addOnBefore ?
            <span className='input-group-addon'>{ addOnBefore }</span>
          : null }

          { btnBefore }

          <input
            className={classNames('form-control', className, {
              'form-control-lg': large,
              'form-control-sm': small,
            })}
            ref={inputRef}
            {...inputOpts}
            value={value || (this.props.type === 'color' ? undefined : '')}
            placeholder={this.props.placeholder || label || ''}
            onChange={this.changeValue}
          />

          { addOnAfter ?
            <span className='input-group-addon'>{ addOnAfter }</span>
          : null }

        </div>

        { renderFeedback && renderFeedback() }

        { this.props.children }

      </div>
    );
  }
}

export default InputWrapper(Input, FormGroup);
