import Formsy from 'formsy-react';

import Address, { addressMapping, reverseAddressMapping, addressEqual } from './Address';
import Checkbox from './CheckBox';
import Input, { passwordValidation } from './Input';
import InputWrapper from './InputWrapper';
import Radio from './Radio';
import Select from './Select';
import SubmitButton from './SubmitButton';
import TextArea from './TextArea';
import SelectMultipleCheckbox from './SelectMultipleCheckbox';

Formsy.addValidationRule('minItems', (values, value, min) => (
  value && value.length && value.length >= min
));

export {
  Address,
  addressMapping,
  reverseAddressMapping,
  addressEqual,
  Checkbox,
  Input,
  passwordValidation,
  InputWrapper,
  Radio,
  Select,
  SubmitButton,
  TextArea,
  SelectMultipleCheckbox,
};
