import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutAction } from '../../../store/actions';
import CustomLink from '../../../ui_components/CustomLink/index';

function LogoutBlock({ logout }) {
  return (
    <div className="logout-block">
      <div className="logout-heading">
        <h1>Logout Immo</h1>
        <p>
          Are you sure you want to logout ?
          <br />
          There are still lots of photos you can discover!
        </p>
        <CustomLink
          href="/"
          text="Home page"
          title="Move to home page"
          color="black"
        />
        <br />
        <button onClick={logout} type="button">
          Logout
        </button>
      </div>
      <style jsx>
        {`
          .logout-block {
            min-width: 320px;
            max-width: 500px;
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 20;
            background: white;
            padding: 32px 32px;
            border-radius: 8px;
          }

          .logout-heading p {
            font-size: 18px;
            margin-top: 12px;
            color: #787878;
          }

          h1 {
            margin: 0px;
            font-size: 36px;
            text-align: center;
            font-weight: 600;
          }

          button {
            background: #070943;
            color: white;
            border: none;
            padding: 15px 20px;
            width: 100%;
            margin-top: 20px;
            display: block;
            font-size: 18px;
            font-weight: 600;
            border: 2px solid #070943;
            transition: background 0.2s;
          }

          button:hover {
            background: none;
            color: #070943;
          }
        `}
      </style>
    </div>
  );
}

LogoutBlock.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(null, mapDispatchToProps)(LogoutBlock);
