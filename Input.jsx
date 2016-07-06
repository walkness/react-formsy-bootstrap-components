import React, { Component, PropTypes } from 'react';
import { HOC } from 'formsy-react';

import InputWrapper from './InputWrapper';

export const passwordValidation = {
  validations: {
    minLength: 8,
    matchRegexp: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).*$/,
  },
  validationErrors: {
    minLength: 'Must be at least 8 characters long.',
    matchRegexp: 'Must contain at least one uppercase letter, one lowercase letter, and one number.',
  },
}

class Input extends Component {

  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    type: 'text',
    onChange: (value) => {},
  };

  changeValue(event) {
    const value = event.currentTarget.value;
    this.props.setValue(value);
    this.props.onChange(value);
  }

  render() {
    const { type, name, value, label, placeholder, required, maxLength, addOnBefore, addOnAfter } = this.props;

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

    for (const opt of ['minLength', 'maxLength', 'min', 'max', 'step']) {
      if (this.props[opt])
        opts[opt] = this.props[opt]
    }

    if (this.props.replaceStatusClass) {
      wrapperClasses.push(this.props.replaceStatusClass);
    } else {
      if (!this.props.isPristine())
        wrapperClasses.push(this.props.isValid() ? 'has-success' : 'has-error');
    }

    return (
      <InputWrapper id={`id_${name}`} label={label} wrapperClasses={ wrapperClasses.join(' ') }>

        <div className={addOnBefore || addOnAfter ? 'input-group' : ''}>
          
          { addOnBefore ?
            <span className='input-group-addon'>{ addOnBefore }</span>
          : null }

          <input 
            className='form-control'
            id={ `id_${name}` }
            type={type}
            name={name}
            value={this.props.getValue() || ''}
            placeholder={ placeholder ? placeholder : (label ? label : '') }
            onChange={this.changeValue.bind(this)}
            {...opts}/>
          
          { addOnAfter ?
            <span className='input-group-addon'>{ addOnAfter }</span>
          : null }

        </div>

        <div className='feedback help-block'>
          { this.props.getErrorMessage() }
          { this.props.showRequired() && !this.props.isPristine() ? 'This field is required.' : '' }
        </div>

        { this.props.children }

      </InputWrapper>
    );
  }
}

export default HOC(Input);
