import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { autobind } from 'core-decorators';

import InputWrapper from './InputWrapper';
import FormGroup from './FormGroup';


const Option = ({ label, ...props }) => (
  <option {...props}>{ label }</option>
);

Option.propTypes = {
  label: PropTypes.node.isRequired,
};


class Select extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    custom: PropTypes.bool,
    formsy: PropTypes.shape({
      setValue: PropTypes.func,
    }),
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
    })).isRequired,
    renderFeedback: PropTypes.func.isRequired,
    statusClassName: PropTypes.func.isRequired,
    value: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    className: '',
    custom: false,
    formsy: {},
    onChange: null,
    value: null,
  };

  @autobind
  changeValue(event) {
    const { formsy, onChange } = this.props;
    const { setValue } = formsy;
    if (setValue || onChange) {
      let value = event.currentTarget.value;
      if (value === 'null') value = null;
      if (setValue) setValue(value);
      if (onChange) onChange(value, event);
    }
  }

  render() {
    const {
      className, renderFeedback, statusClassName, custom, formsy, options, onChange, ...inputOpts
    } = this.props;
    return (
      <div>

        <select
          className={classNames('form-control', className, { 'custom-select': custom })}
          {...inputOpts}
          value={this.props.value}
          onChange={this.changeValue}
        >

          { this.props.options.map(({ key, value, label, id, ...optionProps }) => {
            let optionValue = key || value;
            if (key === null) {
              optionValue = 'null';
            }
            const optionId = id || `${this.props.id}_${value}`;
            return (
              <Option
                key={optionId}
                {...optionProps}
                id={optionId}
                value={optionValue}
                label={key ? value : label}
              />
            );
          }) }

        </select>

        { renderFeedback && renderFeedback() }

        { this.props.children }

      </div>
    );
  }
}

export default InputWrapper(Select, FormGroup); // eslint-disable-line new-cap
