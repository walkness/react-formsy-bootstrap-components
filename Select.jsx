import React, { PropTypes, Component } from 'react';
import { HOC } from 'formsy-react';
import classNames from 'classnames';

import InputWrapper from './InputWrapper';


export class Select extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    options: PropTypes.array.isRequired,
    wrapperClasses: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    isPristine: PropTypes.func,
    isValid: PropTypes.func,
    getErrorMessage: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    onChange: () => {},
    isPristine: () => null,
    isValid: () => null,
    getErrorMessage: () => null,
  };

  constructor(props, context) {
    super(props, context);
    this._changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
    this.props.onChange(event.currentTarget.value);
  }

  render() {
    const { className, wrapperClasses, ...wrapperProps } = this.props;
    const { name, required, disabled } = this.props;
    const id = `id_${name}`;
    const inputOpts = { id, name, required, disabled };

    return (
      <InputWrapper
        {...wrapperProps}
        className={wrapperClasses}
        id={id}
        label={this.props.label}
      >

        <select
          className={classNames('form-control', className)}
          {...inputOpts}
          value={this.props.getValue()}
          onChange={this._changeValue}
        >

          { this.props.options.map(option => (
            <option key={option.key} value={option.key}>{ option.value }</option>
          )) }

        </select>

        <div className='feedback'>
          { this.props.getErrorMessage() }
        </div>

        { this.props.children }

      </InputWrapper>
    );
  }
}

export default HOC(Select); // eslint-disable-line new-cap
