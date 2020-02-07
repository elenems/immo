import React from 'react';
import PropTypes from 'prop-types';
import Photo from './Photo/index';
import './index.scss';

function PhotosGallery({ photos }) {
  return (
    <div className="photos-gallery">
      {photos.map((photo) => {
        return <Photo key={photo.id} photo={photo} />;
      })}
    </div>
  );
}

PhotosGallery.propTypes = {
  photos: PropTypes.array.isRequired,
};

export default PhotosGallery;
