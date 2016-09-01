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
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    cols: PropTypes.number,
    rows: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    isPristine: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    showRequired: PropTypes.func.isRequired,
    children: PropTypes.node,
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
    const { name, label, required, disabled, cols, rows } = this.props;
    const id = `id_${name}`;
    const inputOpts = { id, name, required, disabled, cols, rows };

    return (
      <InputWrapper
        id={id}
        label={label}
        wrapperClasses={classNames(
          this.props.wrapperClasses, {
            required,
            disabled,
            [`has-${this.props.isValid() ? 'success' : 'error'}`]: !this.props.isPristine(),
          },
        )}
      >

        <textarea
          className='form-control'
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
