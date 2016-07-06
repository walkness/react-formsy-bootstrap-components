import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Input from './Input';


class Email extends Component {
  render() {
    const { verified, unverified } = this.props;

    let status = unverified ? 'unverified' : verified ? 'verified' : null;

    let replaceStatusClass = null;

    if (this.refs.input) {
      const value = this.refs.input.getValue();
      if (value)
        status = value === verified ? 'verified' : 'unverified';
      else
        status = null;

      if (this.refs.input.isValid() && status === 'unverified')
        replaceStatusClass = 'has-warning';
    }

    return (
      <Input
        type='email'
        ref='input'
        value={unverified || verified || ''}
        addOnAfter={status}
        wrapperClasses={`${status}`}
        replaceStatusClass={replaceStatusClass}
        validations='isEmail'
        validationErrors={{
          isEmail: 'Must be a valid email.',
        }}
        {...this.props}>

        { unverified && verified && unverified !== verified ?
          <div className='unverified text-muted small'>
            <FormattedMessage
              id='email.unverified'
              values={{
                verified: verified,
                unverified: unverified,
              }}
              defaultMessage="You haven't verified the email address {unverified} yet. We'll send notifications to {verified} until you do."/>
          </div>
        : null }

      </Input>
    );
  }
}

export default Email;
