import React, { Component, PropTypes } from 'react';
import { HOC } from 'formsy-react';
import classNames from 'classnames';
import Select, { Creatable, Async, AsyncCreatable } from 'react-select';

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
    minimumInput: PropTypes.number,
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
    this.completedTerms = {};
    this.changeValue = this.changeValue.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  changeValue(date) {
    this.props.setValue(date);
    this.props.onChange(date);
  }

  getOptions(input) {
    if (input.length < this.props.minimumInput) {
      return Promise.resolve({ options: [] });
    }
    const completedTerms = Object.keys(this.completedTerms).filter(term => input.startsWith(term));
    if (completedTerms.length > 0) {
      const re = new RegExp(`(?:^|\\s)${input}`, 'i');
      const options = this.completedTerms[completedTerms[0]].filter(term => term.label.match(re));
      return Promise.resolve({ options });
    }
    return this.props.loadOptions(input).then(({ options, completed }) => {
      if (completed) {
        this.completedTerms[input.toLowerCase()] = options;
      }
      return { options };
    });
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
      loadOptions: this.getOptions,
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

    /* eslint-disable no-nested-ternary */
    return (
      <InputWrapper
        id={id}
        label={label}
        wrapperClasses={classNames(this.props.wrapperClasses, { required, disabled }, statusClass)}
      >

      { this.props.async && this.props.creatable ?
        <AsyncCreatable {...inputOpts} />
      : this.props.async ?
        <Async {...inputOpts} />
      : this.props.creatable ?
        <Creatable {...inputOpts} />
      :
        <Select {...inputOpts} />
      }

      </InputWrapper>
    );
    /* eslint-enable no-nested-ternary */
  }
}

export default HOC(TypedSelect); // eslint-disable-line new-cap
