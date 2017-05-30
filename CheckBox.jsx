import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { autobind } from 'core-decorators';

import InputWrapper from './InputWrapper';

class Checkbox extends Component {

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    formsy: PropTypes.shape({
      setValue: PropTypes.func,
    }),
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    renderFeedback: PropTypes.func,
    required: PropTypes.bool,
    statusClassName: PropTypes.func,
    value: PropTypes.bool,
    wrapperClassName: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    disabled: false,
    formsy: {},
    id: null,
    label: null,
    onChange: () => null,
    renderFeedback: null,
    required: false,
    statusClassName: v => classNames(v),
    value: null,
    wrapperClassName: null,
  };

  @autobind
  changeValue(event) {
    const { formsy, onChange } = this.props;
    const { setValue } = formsy;
    if (setValue) setValue(event.target.checked);
    if (onChange) onChange(event);
  }

  render() {
    const {
      value, label, required, disabled, formsy, className, statusClassName,
      renderFeedback, wrapperClassName, ...inputOpts
    } = this.props;

    return (
      <div className={statusClassName('form-check', wrapperClassName)}>

        <label htmlFor={this.props.id} className='custom-control custom-checkbox'>

          <input
            type='checkbox'
            {...inputOpts}
            className={classNames('custom-control-input', className)}
            onChange={this.changeValue}
            checked={value}
          />

          <span className='custom-control-indicator' />

          <span className='custom-control-description'>{ label }</span>

        </label>

        { renderFeedback && renderFeedback() }

      </div>
    );
  }
}

export default InputWrapper(Checkbox); // eslint-disable-line new-cap
