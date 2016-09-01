import React, { PropTypes } from 'react';
import classNames from 'classnames';


const SubmitButton = (props) => {
  const { isSubmitting } = props;
  return (
    <button
      type='submit'
      className={classNames(
        'btn',
        `btn${props.outline ? '-outline' : ''}-${props.style}`,
        props.className,
        { loading: isSubmitting },
      )}
      disabled={!props.enabled || isSubmitting}
      onClick={props.onClick}
    >

      <span className='loader-icon' />

      { props.children || props.label }

    </button>
  );
};

SubmitButton.propTypes = {
  style: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link']),
  outline: PropTypes.bool,
  enabled: PropTypes.bool,
  label: PropTypes.string,
  isSubmitting: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

SubmitButton.defaultProps = {
  style: 'primary',
  outline: false,
  enabled: true,
  label: 'Submit',
  isSubmitting: false,
  className: '',
  onClick: () => {},
};

export default SubmitButton;
