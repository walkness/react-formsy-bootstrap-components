import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { autobind } from 'core-decorators';

import InputWrapper from './InputWrapper';
import FormGroup from './FormGroup';


class TextArea extends Component {

  static propTypes = {
    beforeField: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
    formsy: PropTypes.shape({
      setValue: PropTypes.func,
    }),
    label: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    renderFeedback: PropTypes.func,
    statusClassName: PropTypes.func,
    value: PropTypes.string,
  };

  static defaultProps = {
    beforeField: null,
    children: null,
    className: null,
    formsy: {},
    label: null,
    onChange: null,
    placeholder: '',
    renderFeedback: null,
    statusClassName: null,
    type: 'text',
    value: '',
  };

  @autobind
  changeValue(event) {
    const { formsy, onChange } = this.props;
    const { setValue } = formsy;
    const value = event.currentTarget.value;
    if (setValue) setValue(value);
    if (onChange) onChange(value);
  }

  render() {
    const {
      className, label, renderFeedback, beforeField, formsy, children, statusClassName, ...inputOpts
    } = this.props;

    return (
      <div>

        { beforeField }

        <textarea
          className={classNames('form-control', className)}
          {...inputOpts}
          value={this.props.value || ''}
          placeholder={this.props.placeholder || label || ''}
          onChange={this.changeValue}
        />

        { children }

        { renderFeedback && renderFeedback() }

      </div>
    );
  }
}

export default InputWrapper(TextArea, FormGroup); // eslint-disable-line new-cap
