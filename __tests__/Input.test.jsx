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
    };
    mountedInput = undefined;
  });

  it('is unwrapped if hidden', () => {
    props.type = 'hidden';
    const input = getInput();
    expect(input[0].name).toBe('input');
  });
});
