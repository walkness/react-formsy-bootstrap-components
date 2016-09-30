import React, { Component, PropTypes } from 'react';
import { HOC } from 'formsy-react';
import classNames from 'classnames';
import { default as BaseTypedSelect } from '../TypedSelect';

import InputWrapper from './InputWrapper';


class TypedSelect extends Component {

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
    async: PropTypes.bool,
    creatable: PropTypes.bool,
    loadOptions: PropTypes.func,
    selectOptions: PropTypes.object,
  };

  static defaultProps = {
    type: 'text',
    required: false,
    disabled: false,
    onChange: () => {},
    minimumInput: 0,
  };

  constructor(props, context) {
    super(props, context);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(v) {
    this.props.setValue(v);
    this.props.onChange(v);
  }

  render() {
    const { type, name, required, disabled, label, selectOptions } = this.props;
    const id = `id_${name}`;
    const inputOpts = {
      id,
      type,
      name,
      required,
      disabled,
      value: this.props.getValue(),
      onChange: this.changeValue,
      ...selectOptions,
    };

    let statusClass = null;
    if (this.props.replaceStatusClass) {
      statusClass = this.props.replaceStatusClass;
    } else if (!this.props.isPristine()) {
      statusClass = `has-${this.props.isValid() ? 'success' : 'error'}`;
    }

    return (
      <InputWrapper
        id={id}
        label={label}
        wrapperClasses={classNames(this.props.wrapperClasses, { required, disabled }, statusClass)}
      >

        <BaseTypedSelect {...inputOpts} />

        <div className='feedback help-block'>
          { this.props.getErrorMessage() }
          { this.props.showRequired() && !this.props.isPristine() ?
            'This field is required.' : null }
        </div>

      </InputWrapper>
    );
  }
}

export default HOC(TypedSelect); // eslint-disable-line new-cap
