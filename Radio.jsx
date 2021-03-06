import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { autobind } from 'core-decorators';

import InputWrapper from './InputWrapper';


const btnTypePropType = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'info']),
]);


const HelpBlock = ({ ...props }) => (
  <div className='form-text help-block' {...props} />
);


const Radio = (props) => {
  const { id, label, btnType, help, selected, asButton, ...inputOpts } = props;

  const helpComponent = () => {
    if (!help) return null;

    if (typeof help === 'string') {
      return <HelpBlock dangerouslySetInnerHTML={{ __html: help }} />;
    }

    return <HelpBlock>{ help }</HelpBlock>;
  };

  const content = (
    <label
      key={id}
      htmlFor={id}
      className={classNames({
        [`btn btn-${btnType}`]: asButton,
        'custom-control custom-radio': !asButton,
        active: selected,
      })}
    >

      <input
        id={id}
        type='radio'
        {...inputOpts}
        checked={selected}
        className={asButton ? null : 'custom-control-input'}
      />

      { !asButton ?
        <div className='custom-control-label'>
          { label }
          { helpComponent() }
        </div>
      : label }

    </label>
  );

  if (asButton) return content;

  return (
    <div className='radio'>
      { content }
    </div>
  );
};

Radio.propTypes = {
  asButton: PropTypes.bool,
  btnType: btnTypePropType,
  help: PropTypes.node,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

Radio.defaultProps = {
  asButton: false,
  btnType: null,
  selected: false,
};


class RadioGroup extends Component {

  static propTypes = {
    asButtons: PropTypes.bool,
    btnType: btnTypePropType,
    btnSize: PropTypes.oneOf(['sm', 'lg']),
    children: PropTypes.node,
    disabled: PropTypes.bool,
    formsy: PropTypes.shape({
      setValue: PropTypes.func,
    }),
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
    })).isRequired,
    renderFeedback: PropTypes.func,
    required: PropTypes.bool,
    statusClassName: PropTypes.func,
    value: PropTypes.string,
    wrapperClassName: PropTypes.string,
  };

  static defaultProps = {
    onChange: () => {},
    btnType: 'primary',
  };

  optionsContainsValue(v) {
    const { options } = this.props;
    return options.reduce((prev, cur) => {
      return cur.value === v || prev;
    }, false);
  }

  @autobind
  changeValue(event) {
    const { formsy, onChange } = this.props;
    const { setValue } = formsy;
    let { value } = event.currentTarget;
    if (value === 'true' && this.optionsContainsValue(true)) {
      value = true;
    } else if (value === 'false' && this.optionsContainsValue(false)) {
      value = false;
    }
    if (setValue) setValue(value);
    if (onChange) onChange(value, event);
  }

  renderRadios() {
    const { name, options, asButtons } = this.props;
    return options.map(({ btnType, key, value, label, disabled, ...radioProps }) => {
      let type = this.props.btnType;
      if (btnType) {
        type = btnType;
      } else if (this.props.btnType.constructor === {}.constructor) {
        type = this.props.btnType[this.props.value] || 'secondary';
      }
      const id = `id_${name}_${key || value}`;
      return (
        <Radio
          key={id}
          {...radioProps}
          name={name}
          id={id}
          value={key || value}
          label={key ? value : label}
          selected={(key || value) === this.props.value}
          btnType={type}
          asButton={asButtons}
          required={this.props.required}
          disabled={this.props.disabled || disabled}
          onChange={this.changeValue}
        />
      );
    });
  }

  render() {
    const {
      name, value, label, wrapperClassName, required, disabled, onChange, children, asButtons,
      btnType, btnSize, renderFeedback, statusClassName, options, formsy, helpText, ...wrapperProps
    } = this.props;
    return (
      <div
        className={statusClassName('radio-group', wrapperClassName)}
        {...wrapperProps}
      >

        <div className='control-label radio-group-label'>
          { label }
        </div>

        { helpText &&
          <div className='form-text help-text'>
            { helpText }
          </div>
        }

        <div
          className={classNames('control-wrapper', {
            'btn-group btn-group-toggle': asButtons,
            [`btn-group-${btnSize}`]: !!btnSize,
          })}
          data-toggle={asButtons ? 'buttons' : null}
        >
          { this.renderRadios() }
        </div>

        { renderFeedback && renderFeedback() }

        { children }

      </div>
    );
  }
}

export default InputWrapper(RadioGroup);
