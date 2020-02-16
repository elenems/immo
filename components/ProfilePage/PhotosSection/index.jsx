import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PhotosGallery from '../../../shared/PhotosGallery/index';

function PhotosSection({ userPhotos, favouritePhotos, loading }) {
  const [tab, setTab] = useState(0);
  let content = null;
  if (!loading) {
    content = (
      tab === 0 ? (
        <PhotosGallery photos={userPhotos} />
      ) : (
        <PhotosGallery photos={favouritePhotos} />
      ));
  }
  return (
    <div className="photos-section">
      <div className="tabs">
        <button
          className={`${tab === 0 ? 'active' : ''}`}
          type="button"
          onClick={() => setTab(0)}
        >
          Your photos
        </button>
        <button
          className={`${tab === 1 ? 'active' : ''}`}
          type="button"
          onClick={() => setTab(1)}
        >
          Favourites
        </button>
      </div>
      <div className="photos-container">{content}</div>
      <style jsx>
        {`
          button {
            background: none;
            padding: 5px 6px;
            margin: 0px 8px;
            border: none;
            font-size: 16px;
            font-weight: 600;
          }

          .photos-section {
            width: 85%;
            text-align: center;
          }

          button.active {
            color: #d81b60;
            border-bottom: 4px solid #d81b60;
          }

          .photos-container {
            margin-top: 40px;
            padding: 0px 60px;
          }
        `}
      </style>
    </div>
  );
}

PhotosSection.propTypes = {
  userPhotos: PropTypes.array.isRequired,
  favouritePhotos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({ user: state.auth.user });

export default connect(mapStateToProps)(PhotosSection);
