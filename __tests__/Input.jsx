import React from 'react';
import { configure, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Input from '../Input';


configure({ adapter: new Adapter() });


describe('Input', () => {
  let props;
  let mountedInput;
  const getInput = (html) => {
    if (!mountedInput) {
      mountedInput = (html ? render : mount)(<Input {...props} />);
    }
    return mountedInput;
  };

  beforeEach(() => {
    props = {
      type: undefined,
      large: undefined,
      small: undefined,
      placeholder: undefined,
      label: undefined,
      addOnBefore: undefined,
      addOnAfter: undefined,
    };
    mountedInput = undefined;
  });

  describe('has form-control classes', () => {
    test('large', () => {
      props.large = true;
      const input = getInput(true).find('input');
      expect(input.attr('class')).toContain('form-control-lg');
    });

    test('small', () => {
      props.small = true;
      const input = getInput(true).find('input');
      expect(input.attr('class')).toContain('form-control-sm');
    });
  });

  describe('value', () => {
    it('is undefined when color', () => {
      props.type = 'color';
      const input = getInput(true).find('input');
      expect(input.attr('value')).toBeUndefined();
    });

    it('is empty string otherwise', () => {
      const input = getInput(true).find('input');
      expect(input.attr('value')).toBe('');
    });
  });

  describe('placeholder', () => {
    it('is placeholder if given', () => {
      props.placeholder = 'Test';
      const input = getInput(true).find('input');
      expect(input.attr('placeholder')).toBe(props.placeholder);
    });

    it('is label if no placeholder', () => {
      props.label = 'Test';
      const input = getInput(true).find('input');
      expect(input.attr('placeholder')).toBe(props.label);
    });

    it('is falsy otherwise', () => {
      const input = getInput(true).find('input');
      expect(input.attr('placeholder')).toBeFalsy();
    });
  });

  it('is unwrapped if hidden', () => {
    // if the input type is "hidden", then it shouldn't be wrapped with the extra divs
    props.type = 'hidden';
    const input = getInput(true)[0];
    expect(input.name).toBe('input');
  });

  describe('add-on', () => {
    it('has before span, if given', () => {
      props.addOnBefore = 'test';
      const component = getInput(true);
      const input = component.find('input');
      const span = component.find('span.input-group-addon');
      expect(input.prev().html()).toEqual(span.html());
      expect(span.html()).toBe(props.addOnBefore);
    });

    it('has after span, if given', () => {
      props.addOnAfter = 'test';
      const component = getInput(true);
      const input = component.find('input');
      const span = component.find('span.input-group-addon');
      expect(input.next().html()).toEqual(span.html());
      expect(span.html()).toBe(props.addOnAfter);
    });
  });

  describe('onChange', () => {
    it('does nothing if no onChange or Formsy.setValue hooks provided', () => {
      const component = getInput();
      const input = component.find('input');
      input.simulate('change');
    });

    const prepValueTest = () => {
      props.prepValue = jest.fn();
      const component = getInput();
      const input = component.find('input');
      const value = 'test';
      input.instance().value = value;
      input.simulate('change');
      expect(props.prepValue).toBeCalledWith(value);
    };

    it('calls prepValue with raw value if onChange provided', () => {
      props.onChange = jest.fn();
      prepValueTest();
    });

    it('calls prepValue with raw value if Formsy.setValue provided', () => {
      props.formsy = {};
      props.formsy.setValue = jest.fn();
      prepValueTest();
    });

    it('calls onChange if provided', () => {
      props.onChange = jest.fn();
      const component = getInput();
      const input = component.find('input');
      const value = 'test';
      input.instance().value = value;
      input.simulate('change');
      expect(props.onChange).toBeCalledWith(value, expect.objectContaining({
        target: expect.anything(),
      }));
    });

    it('calls Formsy.setValue if provided', () => {
      props.formsy = {};
      props.formsy.setValue = jest.fn();
      const component = getInput();
      const input = component.find('input');
      const value = 'test';
      input.instance().value = value;
      input.simulate('change');
      expect(props.formsy.setValue).toBeCalledWith(value);
    });
  });
});
