import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import FormGroup from '../FormGroup';


configure({ adapter: new Adapter() });


describe('FormGroup', () => {
  let props;
  let mountedComponent;

  const getComponent = () => {
    if (!mountedComponent) {
      mountedComponent = render(<FormGroup {...props} />);
    }
    return mountedComponent;
  };

  const childText = 'foo bar';

  beforeEach(() => {
    props = {
      type: undefined,
      label: undefined,
      id: 'id_test',
      children: <span>{ childText }</span>,
    };
    mountedComponent = undefined;
  });

  it('returns unwrapped children if type is hidden', () => {
    props.type = 'hidden';
    const component = getComponent();
    expect(component.html()).toBe(childText);
  });

  it('adds label element if provided', () => {
    props.label = 'Test';
    const component = getComponent();
    const label = component.find('label');
    expect(label.length).toBe(1);
    expect(label.html()).toBe(props.label);
  });

  it('adds help text block if provided', () => {
    props.helpText = 'Test';
    const component = getComponent();
    const block = component.find('div.help-text');
    expect(block.length).toBe(1);
    expect(block.html()).toBe(props.helpText);
  });

  it('uses statusClassName prop if provided', () => {
    props.statusClassName = jest.fn();
    getComponent();
    expect(props.statusClassName).toHaveBeenCalled();
  });
});
