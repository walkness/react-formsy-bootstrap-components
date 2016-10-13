import React, { Component, PropTypes } from 'react';
import { HOC } from 'formsy-react';
import classNames from 'classnames';

class Checkbox extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    label: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    wrapperClasses: PropTypes.string,
    onChange: PropTypes.func,
    setValue: PropTypes.func,
    isValid: PropTypes.func,
    isPristine: PropTypes.func,
    getValue: PropTypes.func,
  };

  static defaultProps = {
    wrapperClasses: '',
    onChange: () => {},
    required: false,
    disabled: false,
  };

  constructor(props, context) {
    super(props, context);
    this._changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    this.props.setValue(event.target.checked);
    this.props.onChange(event);
  }

  render() {
    const { name, label, required, disabled, isPristine, isValid } = this.props;
    const id = `id_${name}`;
    const inputOpts = { id, name, required, disabled };

    return (
      <div
        className={classNames(
          'form-check',
          this.props.wrapperClasses,
          { required },
          { disabled },
          { 'has-success': !isPristine() && isValid() && this.props.showSuccess },
          { 'has-error': !isPristine() && !isValid() },
        )}
      >

        <label htmlFor={id} className='custom-control custom-checkbox'>

          <input
            type='checkbox'
            {...inputOpts}
            className='custom-control-input'
            onChange={this._changeValue}
            checked={this.props.getValue()}
          />

          <span className='custom-control-indicator' />

          <span className='custom-control-description'>{ label }</span>

        </label>

      </div>
    );
  }
}

export default HOC(Checkbox); // eslint-disable-line new-cap
