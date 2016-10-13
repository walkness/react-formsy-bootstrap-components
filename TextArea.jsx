import React, { Component, PropTypes } from 'react';
import { HOC } from 'formsy-react';
import classNames from 'classnames';

import InputWrapper from './InputWrapper';


class TextArea extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    wrapperClasses: PropTypes.string,
    className: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    cols: PropTypes.number,
    rows: PropTypes.number,
    onChange: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    isPristine: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    showRequired: PropTypes.func.isRequired,
    children: PropTypes.node,
    beforeField: PropTypes.node,
  };

  static defaultProps = {
    type: 'text',
  };

  constructor(props, context) {
    super(props, context);
    this._changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    const { className, wrapperClasses, ...wrapperProps } = this.props;
    const { name, label, required, disabled, cols, rows } = this.props;
    const id = `id_${name}`;
    const inputOpts = { id, name, required, disabled, cols, rows };

    return (
      <InputWrapper
        {...wrapperProps}
        className={wrapperClasses}
        id={id}
        label={label}
      >

        { this.props.beforeField }

        <textarea
          className={classNames('form-control', className)}
          {...inputOpts}
          value={this.props.getValue() || ''}
          placeholder={this.props.placeholder || label || ''}
          onChange={this._changeValue}
        />

        { this.props.children }

        <div className='feedback help-block'>
          { this.props.getErrorMessage() }
          { this.props.showRequired() && !this.props.isPristine() ? 'This field is required.' : '' }
        </div>

      </InputWrapper>
    );
  }
}

export default HOC(TextArea); // eslint-disable-line new-cap
