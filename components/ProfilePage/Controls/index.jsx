import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import './index.scss';
import CustomLink from '../../../ui_components/CustomLink/index';

function Controls({ firstName, lastName, loading }) {
  return (
    <div className="profile-controls">
      <div className="user-greeting">
        <span>{!loading ? `Hello ${firstName} ${lastName}` : null}</span>
      </div>
      <div>
        <CustomLink
          text="Load photo"
          color="#d81b60"
          title="Load photo"
          href="/load"
        />
      </div>
      <div>
        <CustomLink
          text="Logout"
          color="#d81b60"
          title="Logout"
          href="/logout"
        />
      </div>
      <style jsx>
        {`
          .profile-controls {
            display: flex;
            flex-direction: column;
            width: 15%;
            border-right: 1px solid #d81b60;
          }

          .profile-controls > div {
            margin-bottom: 12px;
          }

          .profile-controls .user-greeting {
            margin-bottom: 30px;
            font-size: 18px;
            font-weight: 500;
          }
        `}
      </style>
    </div>
  );
}

Controls.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

Controls.defaultProps = {
  lastName: '',
  firstName: '',
};

const selectFirstName = (state) => state.auth.user.firstName;
const selectLastName = (state) => state.auth.user.lastName;
const getFirstName = createSelector([selectFirstName], (firstName) => firstName);
const getLastName = createSelector([selectLastName], (lastName) => lastName);

const mapStateToProps = (state) => ({
  firstName: getFirstName(state),
  lastName: getLastName(state),
});

export default connect(mapStateToProps)(Controls);
