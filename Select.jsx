import React, { PropTypes, Component } from 'react';
import { HOC } from 'formsy-react';
import classNames from 'classnames';

import InputWrapper from './InputWrapper';


class Select extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    options: PropTypes.array.isRequired,
    wrapperClasses: PropTypes.string,
    onChange: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    isPristine: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    onChange: () => {},
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
    const { name, required, disabled } = this.props;
    const id = `id_${name}`;
    const inputOpts = { id, name, required, disabled };

    return (
      <InputWrapper
        id={id}
        label={this.props.label}
        wrapperClasses={classNames(
          this.props.wrapperClasses,
          { required, disabled },
          { [`has-${this.props.isValid() ? 'success' : 'error'}`]: !this.props.isPristine() }
        )}
      >

        <select
          className='form-control'
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
