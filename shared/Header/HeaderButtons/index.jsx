import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import CustomLink from '../../../ui_components/CustomLink/index';
import Button from '../../../ui_components/Button/index';

const redirectTo = (page) => {
  Router.push(page);
};

function HeaderButtons({ isAuthenticated }) {
  const page = isAuthenticated ? '/profile' : '/login';
  return (
    <div>
      <div className="header-controls">
        <Button text="Load" title="Load your photo" callback={() => redirectTo(page)} />
        {isAuthenticated ? <CustomLink href="/logout" text="Logout" title="Logout" /> : <CustomLink href="/join" text="Join" title="Join Immo" />}
      </div>
      <style jsx>
        {`
          .header-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: ${isAuthenticated ? '135' : '125'}px;
          }
        `}
      </style>
    </div>
  );
}

HeaderButtons.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(mapStateToProps)(HeaderButtons);
