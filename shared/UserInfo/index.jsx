import React from 'react';
import PropTypes from 'prop-types';

function UserInfo({ firstName, lastName, email }) {
  return (
    <div>
      <p className="user-creds">
        <span className="unsignificant-text">Photographer </span>
        <span className="highlight-text-accent">{`${firstName} ${lastName}`}</span>
      </p>
      <p className="user-email">
        <span className="unsignificant-text">Email </span>
        <span className="highlight-text-accent">{email}</span>
      </p>
      <style jsx>
        {`
          .unsignificant-text {
            margin-right: 6px;
          }
        `}
      </style>
    </div>
  );
}

UserInfo.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string,
  email: PropTypes.string.isRequired,
};

UserInfo.defaultProps = {
  lastName: '',
};

export default UserInfo;
