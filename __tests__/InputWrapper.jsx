import React from 'react';
import { configure, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import InputWrapper from '../InputWrapper';


configure({ adapter: new Adapter() });


describe('InputWrapper', () => {
  let props;
  let mountedHOC;

  const MockWrappedComponent = () => (<div />);

  const MockWrapper = () => (<div />);

  const getHOC = (Wrapper = null, extraProps = {}) => {
    if (!mountedHOC) {
      const Wrapped = InputWrapper(MockWrappedComponent, Wrapper, extraProps);
      mountedHOC = shallow(<Wrapped {...props} />);
    }
    return mountedHOC;
  };

  beforeEach(() => {
    props = {
      isValid: undefined,
      isPristine: undefined,
      highlightSuccess: undefined,
      highlightError: undefined,
      replaceStatusClass: undefined,
    };
    mountedHOC = undefined;
  });

  describe('statusClassName', () => {
    it('contains passed class names as argument', () => {
      const HOC = getHOC().instance();
      const passedClasses = ['test 1', 'test 2'];
      const className = HOC.statusClassName(...passedClasses);
      expect(passedClasses.reduce((prev, cur) => {
        if (className.indexOf(cur) !== -1) return prev + 1;
        return prev;
      }, 0)).toBe(2);
    });

    it('has success class when valid, not pristine, and highlightSuccess', () => {
      props.isValid = () => true;
      props.isPristine = () => false;
      props.highlightSuccess = true;
      const HOC = getHOC().instance();
      expect(HOC.statusClassName()).toContain('has-success');
    });

    it('does not have success class when pristine', () => {
      props.isPristine = () => true;
      props.isValid = () => true;
      props.highlightSuccess = true;
      const HOC = getHOC().instance();
      expect(HOC.statusClassName()).not.toContain('has-success');
    });

    it('does not have success class when not highlightSuccess', () => {
      props.isValid = () => true;
      props.isPristine = () => false;
      props.highlightSuccess = false;
      const HOC = getHOC().instance();
      expect(HOC.statusClassName()).not.toContain('has-success');
    });

    it('does not have success class when replaceStatusClass', () => {
      props.isPristine = () => false;
      props.isValid = () => true;
      props.highlightSuccess = true;
      props.replaceStatusClass = 'test';
      const HOC = getHOC().instance();
      expect(HOC.statusClassName()).not.toContain('has-success');
    });

    it('has danger class when invalid, not pristine, and highlightError', () => {
      props.isValid = () => false;
      props.isPristine = () => false;
      props.highlightError = true;
      const HOC = getHOC().instance();
      expect(HOC.statusClassName()).toContain('has-danger');
    });

    it('does not have danger class when pristine', () => {
      props.isPristine = () => true;
      props.isValid = () => false;
      props.highlightError = true;
      const HOC = getHOC().instance();
      expect(HOC.statusClassName()).not.toContain('has-danger');
    });

    it('does not have danger class when not highlightError', () => {
      props.isPristine = () => false;
      props.isValid = () => false;
      props.highlightError = false;
      const HOC = getHOC().instance();
      expect(HOC.statusClassName()).not.toContain('has-danger');
    });

    it('does not have danger class when replaceStatusClass', () => {
      props.isPristine = () => false;
      props.isValid = () => false;
      props.highlightError = false;
      props.replaceStatusClass = 'test';
      const HOC = getHOC().instance();
      expect(HOC.statusClassName()).not.toContain('has-danger');
    });

    it('has empty class when current value falsy', () => {
      props.value = '';
      const HOC = getHOC().instance();
      expect(HOC.statusClassName()).toContain('empty');
    });

    it('does not have empty class when current value truthy', () => {
      props.value = 'test';
      const HOC = getHOC().instance();
      expect(HOC.statusClassName()).not.toContain('empty');
    });
  });

  describe('renderErrorMessages', () => {
    it('always returns an array', () => {
      const message = 'test';
      props.getErrorMessages = () => [{ message }, message];
      const HOC = getHOC().instance();
      const errorMessages = HOC.renderErrorMessages();
      expect(errorMessages.length).toBe(props.getErrorMessages().length);
    });

    it('uses error.message when error is an object', () => {
      const message = 'test';
      props.getErrorMessages = () => [{ message }];
      const HOC = getHOC().instance();
      expect(HOC.renderErrorMessages()[0].props.message).toBe(message);
    });

    it('uses error as message when error is a string', () => {
      const message = 'test';
      props.getErrorMessages = () => [message];
      const HOC = getHOC().instance();
      expect(HOC.renderErrorMessages()[0].props.message).toBe(message);
    });
  });

  describe('renderFeedback', () => {
    it('always returns a ul with correct classes', () => {
      const HOC = getHOC().instance();
      const element = shallow(HOC.renderFeedback());
      expect(element.name()).toBe('ul');
      expect(element.hasClass('form-control-feedback')).toBe(true);
      expect(element.hasClass('feedback')).toBe(true);
      expect(element.hasClass('help-block')).toBe(true);
    });

    it('renders errors as list items', () => {
      const message = 'test';
      props.getErrorMessages = () => [message];
      const HOC = getHOC().instance();
      const element = render(HOC.renderFeedback());
      expect(element.children().length).toBe(1);
      const firstChild = element.children().first();
      expect(firstChild[0].name).toBe('li');
      expect(firstChild.html()).toBe(message);
    });

    it('displays required message when showRequired and not pristine', () => {
      props.showRequired = () => true;
      props.isPristine = () => false;
      props.requiredError = 'required message';
      const HOC = getHOC().instance();
      const element = render(HOC.renderFeedback());
      expect(element.children().length).toBe(1);
      const firstChild = element.children().first();
      expect(firstChild[0].name).toBe('li');
      expect(firstChild.html()).toBe(props.requiredError);
    });

    it('does not display required message when not showRequired', () => {
      props.showRequired = () => false;
      props.isPristine = () => false;
      const HOC = getHOC().instance();
      const element = render(HOC.renderFeedback());
      expect(element.children().length).toBe(0);
    });

    it('does not display required message when pristine', () => {
      props.showRequired = () => true;
      props.isPristine = () => true;
      const HOC = getHOC().instance();
      const element = render(HOC.renderFeedback());
      expect(element.children().length).toBe(0);
    });
  });

  describe('getCurrentValue', () => {
    it('uses Formsy getValue if provided', () => {
      props.getValue = () => 'getValue';
      props.value = 'value';
      const HOC = getHOC().instance();
      expect(HOC.getCurrentValue()).toBe(props.getValue());
    });

    it('otherwise uses value', () => {
      props.getValue = undefined;
      props.value = 'value';
      const HOC = getHOC().instance();
      expect(HOC.getCurrentValue()).toBe(props.value);
    });
  });

  describe('WrappedComponent', () => {
    it('has wrapperClassName if no Wrapper provided', () => {
      props.wrapperClassName = 'test';
      const wrappedProps = getHOC().props();
      expect(wrappedProps.wrapperClassName).toBe(props.wrapperClassName);
    });

    it('does not have wrapperClassName if Wrapper provided', () => {
      props.wrapperClassName = 'test';
      const wrappedProps = getHOC(MockWrapper).props();
      expect(wrappedProps.wrapperClassName).toBeUndefined();
    });

    it('has computed ID if no ID provided', () => {
      props.idPrefix = 'id';
      props.name = 'test';
      const wrappedProps = getHOC().props();
      expect(wrappedProps.id).toBe(`${props.idPrefix}_${props.name}`);
    });
  });

  describe('Wrapper', () => {
    it('wraps component if provided', () => {
      const element = getHOC(MockWrapper);
      expect(element.first().type()).toBe(MockWrapper);
      expect(element.first().children().first().type()).toBe(MockWrappedComponent);
    });

    it('does not wrap component if not provided', () => {
      const element = getHOC();
      expect(element.first().type()).toBe(MockWrappedComponent);
    });

    describe('props', () => {
      it('has success if valid and not pristine', () => {
        props.isValid = () => true;
        props.isPristine = () => false;
        const wrapperProps = getHOC(MockWrapper).props();
        expect(wrapperProps.success).toBe(true);
      });

      it('does not have success if invalid', () => {
        props.isValid = () => false;
        props.isPristine = () => false;
        const wrapperProps = getHOC(MockWrapper).props();
        expect(wrapperProps.success).toBe(false);
      });

      it('does not have success if pristine', () => {
        props.isValid = () => true;
        props.isPristine = () => true;
        const wrapperProps = getHOC(MockWrapper).props();
        expect(wrapperProps.success).toBe(false);
      });

      it('has danger if invalid and not pristine', () => {
        props.isValid = () => false;
        props.isPristine = () => false;
        const wrapperProps = getHOC(MockWrapper).props();
        expect(wrapperProps.danger).toBe(true);
      });

      it('does not have danger if valid', () => {
        props.isValid = () => true;
        props.isPristine = () => false;
        const wrapperProps = getHOC(MockWrapper).props();
        expect(wrapperProps.danger).toBe(false);
      });

      it('does not have danger if pristine', () => {
        props.isValid = () => false;
        props.isPristine = () => true;
        const wrapperProps = getHOC(MockWrapper).props();
        expect(wrapperProps.danger).toBe(false);
      });

      it('has empty if no value', () => {
        props.value = '';
        const wrapperProps = getHOC(MockWrapper).props();
        expect(wrapperProps.empty).toBe(true);
      });

      it('does not have empty if value', () => {
        props.value = 'test';
        const wrapperProps = getHOC(MockWrapper).props();
        expect(wrapperProps.empty).toBe(false);
      });
    });
  });
});
