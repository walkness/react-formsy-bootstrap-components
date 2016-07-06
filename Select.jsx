import React, { Component } from 'react';
import { HOC } from 'formsy-react';

import InputWrapper from './InputWrapper';

class Select extends Component {

  static defaultProps = {
    type: 'text',
    serverError: '',
    onChange: function(event) {},
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
    this.props.onChange(event.currentTarget.value);
  }

  render() {
    const { type, name, value, label, required, options } = this.props;

    let wrapperClasses = []
    if (this.props.wrapperClasses)
      wrapperClasses.push(this.props.wrapperClasses)

    let opts = {};
    if (this.props.required) {
      opts['required'] = 'required';
      wrapperClasses.push('required');
    }
    if (this.props.disabled) {
      opts['disabled'] = 'disabled';
      wrapperClasses.push('disabled');
    }

    if (!this.props.isPristine())
      wrapperClasses.push(this.props.isValid() ? 'has-success' : 'has-error');

    return (
      <InputWrapper id={`id_${name}`} label={label} wrapperClasses={ wrapperClasses.join(' ') }>

        <select
          className='form-control'
          id={ `id_${name}` }
          name={name}
          value={this.props.getValue()}
          onChange={this.changeValue.bind(this)}
          {...opts}>

            { options.map(option => (
              <option key={ option.key } value={ option.key }>{ option.value }</option>
            )) }

        </select>

        <div className='feedback'>
          { this.props.getErrorMessage() }
        </div>

        { this.props.children }

      </InputWrapper>
    );
  }
}

export default HOC(Select);
