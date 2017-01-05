import React, { Component, PropTypes } from 'react';
import { HOC } from 'formsy-react';
import classNames from 'classnames';


class Radio extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    wrapperClasses: PropTypes.string,
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
    asButtons: PropTypes.bool,
    btnType: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'info']),
    ]),
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
    this.props.setValue(event.currentTarget.value);
    this.props.onChange(event.currentTarget.value);
  }

  render() {
    const { name, required, disabled, asButtons, btnType } = this.props;
    const inputOpts = { name, required, disabled };

    const value = this.props.getValue();

    const radios = this.props.options.map(option => {
      const id = `id_${name}_${option.key}`;
      const checked = value === option.key;
      let type = btnType;
      if (option.btnType) {
        type = option.btnType;
      } else if (btnType.constructor === {}.constructor) {
        type = btnType[value] || 'secondary';
      }
      return (
        <label
          key={id}
          htmlFor={id}
          className={classNames({
            [`btn btn-${type}`]: asButtons,
            'custom-control custom-radio': !asButtons,
            active: checked,
          })}
        >

          <input
            id={id}
            type='radio'
            {...inputOpts}
            value={option.key}
            checked={checked}
            onChange={this._changeValue}
            className={asButtons ? null : 'custom-control-input'}
          />

        { !asButtons ?
          <span className='custom-control-indicator' />
        : null }

        { !asButtons ?
          <span className='custom-control-description'>{ option.value }</span>
        : option.value }

        { option.help && typeof option.help === 'string' ?
          <div
            className='help-block'
            dangerouslySetInnerHTML={typeof option.help === 'string' ? {
              __html: option.help } : null}
          />
        : null }

        { option.help && typeof option.help !== 'string' ?
          <div className='help-block'>{ option.help }</div>
        : null }

        </label>
      );
    });

    return (
      <div
        className={classNames(
          'radio-group',
          this.props.wrapperClasses,
          { required, disabled },
          { [`has-${this.props.isValid() ? 'success' : 'error'}`]: !this.props.isPristine() },
        )}
      >

        <div className='control-label radio-group-label'>
          { this.props.label }
        </div>

        <div
          className={classNames('control-wrapper', { 'btn-group': asButtons })}
          data-toggle={asButtons ? 'buttons' : null}
        >
          { radios }
        </div>

        <div className='feedback'>
          { this.props.getErrorMessage() }
        </div>

        { this.props.children }

      </div>
    );
  }
}

export default HOC(Radio); // eslint-disable-line new-cap
