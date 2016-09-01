import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Input from './Input';


class Email extends Component {
  render() {
    const { verified, unverified } = this.props;

    let status = null;
    if (unverified) {
      status = 'unverified';
    } else if (verified) {
      status = 'verified';
    }

    let replaceStatusClass = null;

    if (this.input) {
      const value = this.input.getValue();
      status = null;
      if (value) {
        status = value === verified ? 'verified' : 'unverified';
      }

      if (this.input.isValid() && status === 'unverified') {
        replaceStatusClass = 'has-warning';
      }
    }

    return (
      <Input
        type='email'
        ref={(c) => { this.input = c; }}
        value={unverified || verified || ''}
        addOnAfter={status}
        wrapperClasses={status}
        replaceStatusClass={replaceStatusClass}
        validations='isEmail'
        validationErrors={{
          isEmail: 'Must be a valid email.',
        }}
        {...this.props}
      >

        { unverified && verified && unverified !== verified ?
          <div className='unverified text-muted small'>
            <FormattedMessage
              id='email.unverified'
              values={{ verified, unverified }}
              defaultMessage="You haven't verified the email address {unverified} yet. We'll send notifications to {verified} until you do." // eslint-disable-line max-len
            />
          </div>
        : null }

      </Input>
    );
  }
}

Email.propTypes = {
  verified: PropTypes.string,
  unverified: PropTypes.string,
};

export default Email;
