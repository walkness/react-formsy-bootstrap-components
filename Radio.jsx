import React, { Component, PropTypes } from 'react';
import { HOC } from 'formsy-react';

import InputWrapper from './InputWrapper';

class Radio extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    options: PropTypes.array.isRequired,
  };

  static defaultProps = {
    serverError: '',
    onChange: function(event) {},
  };

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
    this.props.onChange(event.currentTarget.value);
  }

  render() {
    const { type, name, label, required, options } = this.props;

    let wrapperClasses = ['radio-group'];
    if (this.props.wrapperClasses)
      wrapperClasses.push(this.props.wrapperClasses)

    let opts = {};
    if (this.props.required) {
      opts['required'] = 'required';
      wrapperClasses.push('required')
    }
    if (this.props.disabled) {
      opts['disabled'] = 'disabled';
      wrapperClasses.push('disabled');
    }

    if (!this.props.isPristine())
      wrapperClasses.push(this.props.isValid() ? 'has-success' : 'has-error');

    const value = this.props.getValue();

    const radios = options.map(option => {

      return (
        <div className={`radio`} key={ option.key }>

          <label>

            <input
              id={ `id_${name}_${option.key}` }
              type='radio'
              name={ name }
              value={ option.key }
              checked={ value === option.key }
              onChange={ this.changeValue.bind(this) }
              { ...opts } />

              { option.value }

              { option.help ?
                <div className='help-block'>
                  { option.help }
                </div>
              : null }

          </label>

        </div>
      );
    });

    return (
      <div className={ wrapperClasses.join(' ') }>

        <div className='control-label radio-group-label'>
          { label }
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

export default HOC(Radio);
