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
  };

  static defaultProps = {
    onChange: () => {},
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
    const { name, required, disabled } = this.props;
    const inputOpts = { name, required, disabled };

    const value = this.props.getValue();

    const radios = this.props.options.map(option => {
      const id = `id_${name}_${option.key}`;
      return (
        <div className='radio' key={option.key}>

          <label htmlFor={id}>

            <input
              id={id}
              type='radio'
              {...inputOpts}
              value={option.key}
              checked={value === option.key}
              onChange={this._changeValue}
            />

            { option.value }

            { typeof option.help === 'string' ?
              <div
                className='help-block'
                dangerouslySetInnerHTML={{ __html: option.help }}
              />
            :
              <div className='help-block'>
                { option.help }
              </div>
            }

          </label>

        </div>
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

        <div className='control-wrapper'>
          { radios }

          <div className='feedback'>
            { this.props.getErrorMessage() }
          </div>

          { this.props.children }
        </div>

      </div>
    );
  }
}

export default HOC(Radio); // eslint-disable-line new-cap
