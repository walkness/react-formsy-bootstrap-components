import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Input from '../Input';


configure({ adapter: new Adapter() });


describe('Input', () => {
  let props;
  let mountedInput;
  const getInput = () => {
    if (!mountedInput) {
      mountedInput = render(<Input {...props} />);
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
      const input = getInput().find('input');
      expect(input.attr('class')).toContain('form-control-lg');
    });

    test('small', () => {
      props.small = true;
      const input = getInput().find('input');
      expect(input.attr('class')).toContain('form-control-sm');
    });
  });

  describe('value', () => {
    it('is undefined when color', () => {
      props.type = 'color';
      const input = getInput().find('input');
      expect(input.attr('value')).toBeUndefined();
    });

    it('is empty string otherwise', () => {
      const input = getInput().find('input');
      expect(input.attr('value')).toBe('');
    });
  });

  describe('placeholder', () => {
    it('is placeholder if given', () => {
      props.placeholder = 'Test';
      const input = getInput().find('input');
      expect(input.attr('placeholder')).toBe(props.placeholder);
    });

    it('is label if no placeholder', () => {
      props.label = 'Test';
      const input = getInput().find('input');
      expect(input.attr('placeholder')).toBe(props.label);
    });

    it('is falsy otherwise', () => {
      const input = getInput().find('input');
      expect(input.attr('placeholder')).toBeFalsy();
    });
  });

  it('is unwrapped if hidden', () => {
    // if the input type is "hidden", then it shouldn't be wrapped with the extra divs
    props.type = 'hidden';
    const input = getInput()[0];
    expect(input.name).toBe('input');
  });

  describe('add-on', () => {
    it('has before span, if given', () => {
      props.addOnBefore = 'test';
      const component = getInput();
      const input = component.find('input');
      const span = component.find('span.input-group-addon');
      expect(input.prev().html()).toEqual(span.html());
      expect(span.html()).toBe(props.addOnBefore);
    });

    it('has after span, if given', () => {
      props.addOnAfter = 'test';
      const component = getInput();
      const input = component.find('input');
      const span = component.find('span.input-group-addon');
      expect(input.next().html()).toEqual(span.html());
      expect(span.html()).toBe(props.addOnAfter);
    });
  });
});
