import React, { Component, PropTypes } from 'react';
import { HOC } from 'formsy-react';

import InputWrapper from './InputWrapper';


class TextArea extends Component {

  static propTypes: {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    cols: PropTypes.number,
    rows: PropTypes.number,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    type: 'text',
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    const { name, label, placeholder } = this.props

    let wrapperClasses = []
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

    for (const opt of ['cols', 'rows']) {
      if (this.props[opt])
        opts[opt] = this.props[opt]
    }

    if (!this.props.isPristine())
      wrapperClasses.push(this.props.isValid() ? 'has-success' : 'has-error');

    const htmlId = `id_${name}`;

    return (
      <InputWrapper id={htmlId} label={label} wrapperClasses={ wrapperClasses.join(' ') }>

        <textarea className='form-control'
               id={htmlId}
               name={name}
               value={ this.props.getValue() || '' }
               placeholder={ placeholder ? placeholder : (label ? label : '') }
               onChange={this.changeValue.bind(this)}
               {...opts} />

        { this.props.children }

        <div className='feedback help-block'>
          { this.props.getErrorMessage() }
          { this.props.showRequired() && !this.props.isPristine() ? 'This field is required.' : '' }
        </div>

      </InputWrapper>
    );
  }
}

export default HOC(TextArea);
