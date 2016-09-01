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
    const { name, label, required, disabled } = this.props;
    const id = `id_${name}`;
    const inputOpts = { id, name, required, disabled };

    return (
      <div
        className={classNames(
          'checkbox',
          this.props.wrapperClasses,
          { required },
          { disabled },
          { [`has-${this.props.isValid() ? 'success' : 'error'}`]: !this.props.isPristine() },
        )}
      >

        <label htmlFor={id}>

          <input
            type='checkbox'
            {...inputOpts}
            onChange={this._changeValue}
            checked={this.props.getValue()}
          />

          { label }

        </label>

      </div>
    );
  }
}

export default HOC(Checkbox); // eslint-disable-line new-cap
