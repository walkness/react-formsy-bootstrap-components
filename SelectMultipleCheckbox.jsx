import React, { Component, PropTypes } from 'react';
import { HOC } from 'formsy-react';
import classNames from 'classnames';

import InputWrapper from './InputWrapper';


class SelectMultipleCheckbox extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    wrapperClasses: PropTypes.string,
    className: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired,
    isPristine: PropTypes.func.isRequired,
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
    let value = this.props.getValue() || [];
    value = value.slice(0);
    const curTarget = event.currentTarget;
    const index = value.indexOf(curTarget.value);
    if (curTarget.checked && index === -1) {
      value.push(curTarget.value);
    } else if (!curTarget.checked && index !== -1) {
      value.splice(index, 1);
    }
    this.props.setValue(value);
    this.props.onChange(value);
  }

  render() {
    const { className, wrapperClasses, ...wrapperProps } = this.props;
    const { name, disabled } = this.props;
    const inputOpts = { name, disabled };

    const value = this.props.getValue();

    return (
      <InputWrapper
        {...wrapperProps}
        id={`id_${name}`}
        className={wrapperClasses}
      >

      { this.props.options.map(option => {
        const id = `id_${name}_${option.key}`;
        return (
          <div className='form-check' key={option.key}>

            <label htmlFor={id} className='custom-control custom-checkbox'>

              <input
                id={id}
                type='checkbox'
                {...inputOpts}
                className={classNames('custom-control-input', className)}
                value={option.key}
                checked={value && value.indexOf(option.key) !== -1}
                onChange={this._changeValue}
              />

              <span className='custom-control-indicator' />

              <span className='custom-control-description'>{ option.value }</span>

              { option.help ?
                <div
                  className='help-block'
                  dangerouslySetInnerHTML={typeof option.help === 'string' ? {
                    __html: option.help } : null}
                >
                  { option.help }
                </div>
              : null }

            </label>

          </div>
        );
      }) }

      <div className='feedback help-block'>
        { this.props.getErrorMessage() }
        { this.props.showRequired() && !this.props.isPristine() ?
          'This field is required.' : null }
      </div>

      </InputWrapper>
    );
  }
}

export default HOC(SelectMultipleCheckbox); // eslint-disable-line new-cap
