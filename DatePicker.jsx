import React, { Component, PropTypes } from 'react';
import { HOC } from 'formsy-react';
import classNames from 'classnames';
import { default as BaseDatePicker } from 'react-datepicker';
import moment from 'moment';

import InputWrapper from './InputWrapper';


class DatePicker extends Component {

  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    wrapperClasses: PropTypes.string,
    replaceStatusClass: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    isPristine: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    showRequired: PropTypes.func.isRequired,
    selected: PropTypes.object,
  };

  static defaultProps = {
    type: 'text',
    required: false,
    disabled: false,
    onChange: () => {},
  };

  constructor(props, context) {
    super(props, context);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(date) {
    const formatted = date.format();
    this.props.setValue(formatted);
    this.props.onChange(formatted);
  }

  render() {
    const { type, name, required, disabled, label } = this.props;
    const id = `id_${name}`;
    const inputOpts = { id, type, name, required, disabled };

    let statusClass = null;
    if (this.props.replaceStatusClass) {
      statusClass = this.props.replaceStatusClass;
    } else if (!this.props.isPristine()) {
      statusClass = `has-${this.props.isValid() ? 'success' : 'error'}`;
    }

    const value = this.props.getValue();

    return (
      <InputWrapper
        id={id}
        label={label}
        wrapperClasses={classNames(this.props.wrapperClasses, { required, disabled }, statusClass)}
      >

        <BaseDatePicker
          className='form-control'
          selected={value ? moment(value) : null}
          onChange={this.changeValue}
          {...inputOpts}
        />

        <div className='feedback help-block'>
          { this.props.getErrorMessage() }
          { this.props.showRequired() && !this.props.isPristine() ?
            'This field is required.' : null }
        </div>

      </InputWrapper>
    );
  }
}

export default HOC(DatePicker); // eslint-disable-line new-cap
