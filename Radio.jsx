import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

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

  return (
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
        <span className='custom-control-indicator' />
      : null }

      { !asButton ?
        <span className='custom-control-description'>{ label }</span>
      : label }

      { helpComponent() }

    </label>
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

  constructor(props, context) {
    super(props, context);
    this._changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    const { formsy, onChange } = this.props;
    const { setValue } = formsy;
    const value = event.currentTarget.value;
    if (setValue) setValue(value);
    if (onChange) onChange(event);
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
      const id = `id_${name}_${key}`;
      return (
        <Radio
          key={id}
          {...radioProps}
          id={id}
          value={key || value}
          label={key ? value : label}
          btnType={type}
          asButton={asButtons}
          required={this.props.required}
          disabled={this.props.disabled || disabled}
        />
      );
    });
  }

  render() {
    const {
      name, value, label, wrapperClassName, required, disabled, onChange, children, asButtons,
      btnType, renderFeedback, statusClassName, options, formsy, ...wrapperProps
    } = this.props;
    return (
      <div
        className={statusClassName('radio-group', wrapperClassName)}
        {...wrapperProps}
      >

        <div className='control-label radio-group-label'>
          { label }
        </div>

        <div
          className={classNames('control-wrapper', { 'btn-group': asButtons })}
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
