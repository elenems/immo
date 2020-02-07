import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo/index';

function AuthHeader({ children }) {
  return (
    <div className="auth-header">
      <Logo />
      {children}
      <style jsx>
        {`
          .auth-header {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0px 20px;
            height: 60px;
            align-items: center;
            background-color: #070943;
            position: relative;
            z-index: 20;
          }
        `}
      </style>
    </div>
  );
}

AuthHeader.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AuthHeader;
