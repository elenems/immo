import React from 'react';
import PropTypes from 'prop-types';
import { TiHeartFullOutline } from 'react-icons/ti';
import { connect } from 'react-redux';

function HeartButton({ isAuthenticated }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (isAuthenticated) {
          alert('auth');
        } else {
          alert('not auth');
        }
      }}
      type="button"
    >
      <TiHeartFullOutline />
      <style jsx>
        {`
          button {
            background: none;
            border: none;
            color: white;
            font-size: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
            transition: transform 0.25s;
          }

          button:hover {
            transform: scale(1.2);
          }
        `}
      </style>
    </button>
  );
}

HeartButton.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(HeartButton);
