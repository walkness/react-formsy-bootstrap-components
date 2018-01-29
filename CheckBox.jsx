import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { autobind } from 'core-decorators';

import InputWrapper from './InputWrapper';
import HelpBlock from './HelpBlock';


class Checkbox extends Component {

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    formsy: PropTypes.shape({
      setValue: PropTypes.func,
    }),
    help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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
    help: null,
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
    const value = event.target.checked;
    if (setValue) setValue(value);
    if (onChange) onChange(value, event);
  }

  renderHelpBlock() {
    const { help } = this.props;
    if (!help) return null;
    if (typeof help === 'string') {
      return <HelpBlock dangerouslySetInnerHTML={{ __html: help }} />;
    }
    return <HelpBlock>{ help }</HelpBlock>;
  }

  render() {
    const {
      value, label, required, disabled, formsy, className, statusClassName,
      renderFeedback, wrapperClassName, help, ...inputOpts
    } = this.props;

    return (
      <div className={statusClassName('custom-form-check', wrapperClassName)}>

        <label htmlFor={this.props.id} className='custom-control custom-checkbox'>

          <input
            type='checkbox'
            {...inputOpts}
            className={classNames('custom-control-input', className)}
            onChange={this.changeValue}
            checked={value}
          />

          <span className='custom-control-label'>{ label }</span>

          { this.renderHelpBlock() }

        </label>

        { renderFeedback && renderFeedback() }

      </div>
    );
  }
}

export default InputWrapper(Checkbox);
