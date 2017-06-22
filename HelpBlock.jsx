import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const HelpBlock = ({ children, className, ...props }) => (
  <div className={classNames('help-block', className)} {...props}>
    { children }
  </div>
);

HelpBlock.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

HelpBlock.defaultProps = {
  children: null,
  className: null,
};

export default HelpBlock;
