import React from 'react';
import PropTypes from 'prop-types';
import PhotosGallery from '../../../shared/PhotosGallery/index';

function ImagesContainer({ photos }) {
  return (
    <div>
      <h2>Free stock photos</h2>
      <PhotosGallery photos={photos} />
    </div>
  );
}

ImagesContainer.propTypes = {
  photos: PropTypes.array,
};

ImagesContainer.defaultProps = {
  photos: [],
};

export default ImagesContainer;
