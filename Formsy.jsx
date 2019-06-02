import Formsy, { HOC } from 'formsy-react';

import _Checkbox from './CheckBox';
import _Input from './Input';
import _Radio from './Radio';
import _Select from './Select';
import _TextArea from './TextArea';

Formsy.addValidationRule('minItems', (values, value, min) => (
  value && value.length && value.length >= min
));

export const Checkbox = HOC(_Checkbox);
export const Input = HOC(_Input);
export const Radio = HOC(_Radio);
export const Select = HOC(_Select);
export const TextArea = HOC(_TextArea);
