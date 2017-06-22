import React, { PropTypes, Component } from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';

import ErrorMessage from './ErrorMessage';


const formsyPropTypes = {
  getErrorMessage: PropTypes.func,
  getErrorMessages: PropTypes.func,
  getValue: PropTypes.func,
  hasValue: PropTypes.func,
  isFormDisabled: PropTypes.func,
  isFormSubmitted: PropTypes.func,
  isPristine: PropTypes.func,
  isRequired: PropTypes.func,
  isValid: PropTypes.func,
  isValidValue: PropTypes.func,
  resetValue: PropTypes.func,
  setValidations: PropTypes.func,
  setValue: PropTypes.func,
  showError: PropTypes.func,
  showRequired: PropTypes.func,
  validationError: PropTypes.string,
  validationErrors: PropTypes.object,
  validations: PropTypes.object,
};

export const statusClassName = (props, ...className) => {
  const { success, danger, warning, required, disabled, empty, helpText } = props;
  return classNames({
    'has-success': success,
    'has-danger': danger,
    'has-warning': warning,
    'has-help': !!helpText,
    required,
    disabled,
    empty,
  }, ...className);
};


export default function InputWrapper(WrappedComponent, Wrapper = null) {
  return class extends Component {
    static propTypes = Object.assign({}, formsyPropTypes, {
      highlightError: PropTypes.bool,
      highlightSuccess: PropTypes.bool,
      idPrefix: PropTypes.string,
      label: PropTypes.string,
      wrappedComponentRef: PropTypes.func,
      wrapperProps: PropTypes.object,
    });

    static defaultProps = {
      getErrorMessage: () => null,
      getErrorMessages: () => [],
      hasValue: () => true,
      highlightError: true,
      highlightSuccess: false,
      idPrefix: 'id',
      isFormDisabled: () => false,
      isFormSubmitted: () => {},
      isPristine: () => true,
      isRequired: () => false,
      isValid: () => true,
      isValidValue: () => true,
      label: null,
      resetValue: () => {},
      setValidations: () => {},
      showError: () => false,
      showRequired: () => false,
      validationError: null,
      validationErrors: null,
      wrappedComponentRef: () => {},
      wrapperProps: {},
    };

    @autobind
    statusClassName(...className) {
      const {
        horizontal, required, disabled, helpText, replaceStatusClass,
        isValid, isPristine, highlightSuccess, highlightError,
      } = this.props;
      const valid = isValid();
      const pristine = isPristine();
      return classNames(
        className, statusClassName({
          success: valid && !pristine && highlightSuccess && !replaceStatusClass,
          danger: !valid && !pristine && highlightError && !replaceStatusClass,
          required,
          disabled,
          empty: !this.getCurrentValue(),
          helpText,
        }), {
          row: horizontal,
        },
        replaceStatusClass,
      );
    }

    @autobind
    renderErrorMessages() {
      const { getErrorMessages } = this.props;
      return getErrorMessages().map((error, i) => {
        if (error.message) {
          return <ErrorMessage key={i} {...error} />;
        }
        return <ErrorMessage key={i} message={error} />;
      });
    }

    @autobind
    renderFeedback() {
      return (
        <ul className='form-control-feedback feedback help-block'>
          { this.renderErrorMessages() }
          { this.props.showRequired() && !this.props.isPristine() ?
            <ErrorMessage message='This field is required.' code='required' />
          : null }
        </ul>
      );
    }

    @autobind
    getCurrentValue() {
      const { getValue, value } = this.props;
      return (getValue ? getValue() : value) || null;
    }

    render() {
      const noFormsyProps = Object.assign({}, this.props);
      const formsyProps = {};
      Object.keys(formsyPropTypes).forEach((key) => {
        formsyProps[key] = this.props[key];
        delete noFormsyProps[key];
      });

      const {
        afterControl,
        heading,
        helpText,
        highlightError,
        highlightSuccess,
        horizontal,
        large,
        replaceStatusClass,
        value,
        wrappedComponentRef,
        wrapperClassName,
        wrapperProps,
        idPrefix,
        ...wrappedComponentProps
      } = noFormsyProps;
      const { required, disabled, label } = this.props;

      const currentValue = this.getCurrentValue();

      const id = this.props.id || `${idPrefix}_${this.props.name}`;

      const wrappedComponent = (
        <WrappedComponent
          id={id}
          renderFeedback={this.renderFeedback}
          statusClassName={this.statusClassName}
          value={currentValue}
          formsy={formsyProps}
          ref={wrappedComponentRef}
          {...wrappedComponentProps}
        />
      );

      if (Wrapper) {
        const formGroupProps = {
          afterControl,
          disabled,
          helpText,
          horizontal,
          id,
          label,
          replaceStatusClass,
          required,
          ...wrapperProps,
        };
        const valid = this.props.isValid();
        const pristine = this.props.isPristine();
        return (
          <Wrapper
            success={valid && !pristine && highlightSuccess}
            danger={!valid && !pristine && highlightError}
            empty={!currentValue}
            className={wrapperClassName}
            statusClassName={this.statusClassName}
            {...formGroupProps}
          >
            { wrappedComponent }
          </Wrapper>
        );
      }

      return wrappedComponent;
    }
  };
}
