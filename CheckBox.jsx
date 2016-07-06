import React, { Component, PropTypes } from 'react';
import { HOC } from 'formsy-react';

class Checkbox extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange: (event) => {},
  }

  changeValue(event) {
    this.props.setValue(event.target.checked);
    this.props.onChange(event);
  }

  render() {
    const { name, value, label, checked } = this.props;

    const htmlId = `id_${name}`;

    let wrapperClasses = ['checkbox'];
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

    return (
      <div className={ wrapperClasses.join(' ') }>

        <label>

          <input id={ htmlId }
                 type='checkbox'
                 name={ name }
                 onChange={ this.changeValue.bind(this) }
                 checked={ this.props.getValue() }
                 {...opts}/>

          { label }

        </label>

      </div>
    )
  }
}

export default HOC(Checkbox);
