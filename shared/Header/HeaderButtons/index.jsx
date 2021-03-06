import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { redirectTo, usePageToRedirectTo } from './functions';
import CustomLink from '../../../ui_components/CustomLink/index';
import Button from '../../../ui_components/Button/index';

function HeaderButtons({ isAuthenticated }) {
  const page = usePageToRedirectTo(isAuthenticated);
  return (
    <div>
      <div className="header-controls">
        <Button text="Load" title="Load your photo" callback={redirectTo(page)} />
        {isAuthenticated ? <CustomLink href="/profile" text="Profile" title="Profile" /> : <CustomLink href="/join" text="Join" title="Join Immo" />}
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

const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
const getIsAuthenticated = createSelector(
  [selectIsAuthenticated],
  (isAuthenticated) => isAuthenticated,
);

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
});

export default connect(mapStateToProps)(HeaderButtons);
