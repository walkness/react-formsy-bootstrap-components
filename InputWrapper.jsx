import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import classNames from 'classnames';

import ErrorMessage from './ErrorMessage';


const formsyPropTypes = {
  getErrorMessage: PropTypes.func,
  getErrorMessages: PropTypes.func,
  getValue: PropTypes.func,
  hasValue: PropTypes.func,
  innerRef: PropTypes.func,
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
    'has-error': danger,
    'has-warning': warning,
    'has-help': !!helpText,
    required,
    disabled,
    empty,
  }, ...className);
};


export default function InputWrapper(WrappedComponent, Wrapper = null, extraWrapperProps = {}) {
  return class extends Component {
    static propTypes = Object.assign({}, formsyPropTypes, {
      highlightError: PropTypes.bool,
      highlightSuccess: PropTypes.bool,
      idPrefix: PropTypes.string,
      label: PropTypes.string,
      requiredError: PropTypes.string,
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
      requiredError: 'This field is required.',
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
        /* eslint-disable react/no-array-index-key */
        if (error.message) {
          return <ErrorMessage key={i} {...error} />;
        }
        return <ErrorMessage key={i} message={error} />;
        /* eslint-enable react/no-array-index-key */
      });
    }

    @autobind
    renderFeedback() {
      return (
        <ul className='form-control-feedback feedback invalid-feedback help-block'>
          { this.renderErrorMessages() }
          { this.props.showRequired() && !this.props.isPristine() ?
            <ErrorMessage message={this.props.requiredError} code='required' />
          : null }
        </ul>
      );
    }

    @autobind
    getCurrentValue() {
      const { getValue, value } = this.props;
      return getValue ? getValue() : value;
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
        replaceStatusClass,
        value,
        wrappedComponentRef,
        wrapperClassName,
        wrapperProps,
        idPrefix,
        requiredError,
        labelClassName,
        controlWrapperClassName,
        ...wrappedComponentProps
      } = noFormsyProps;
      const { required, disabled, label, type } = this.props;

      if (!Wrapper) {
        wrappedComponentProps.wrapperClassName = wrapperClassName;
        wrappedComponentProps.helpText = helpText
      }

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
        const {
          className: extraWrapperClassName, ...classlessExtraWrapperProps
        } = extraWrapperProps;
        const formGroupProps = {
          afterControl,
          disabled,
          helpText,
          horizontal,
          id,
          label,
          replaceStatusClass,
          required,
          type,
          labelClassName,
          controlWrapperClassName,
          ...wrapperProps,
          ...classlessExtraWrapperProps,
        };
        const valid = this.props.isValid();
        const pristine = this.props.isPristine();
        return (
          <Wrapper
            success={valid && !pristine}
            danger={!valid && !pristine}
            empty={!currentValue}
            className={classNames(wrapperClassName, extraWrapperClassName)}
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
