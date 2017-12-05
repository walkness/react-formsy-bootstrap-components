import { addValidationRule, withFormsy } from 'formsy-react';

import _Checkbox from './Checkbox';
import _Input from './Input';
import _Radio from './Radio';
import _Select from './Select';
import _TextArea from './TextArea';

addValidationRule('minItems', (values, value, min) => (
  value && value.length && value.length >= min
));

export const Checkbox = withFormsy(_Checkbox);
export const Input = withFormsy(_Input);
export const Radio = withFormsy(_Radio);
export const Select = withFormsy(_Select);
export const TextArea = withFormsy(_TextArea);
