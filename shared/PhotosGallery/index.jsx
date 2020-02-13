import React from 'react';
import PropTypes from 'prop-types';
import Photo from './Photo/index';
import './index.scss';

function PhotosGallery({ photos, imageWidth }) {
  return (
    <div className="photos-gallery">
      {photos.map((photo) => <Photo key={photo.id} photo={photo} />)}
      <style jsx>
        {`
          div {
            grid-template-columns: repeat(
              auto-fill,
              minmax(${imageWidth}px, 1fr)
            );
          }
        `}
      </style>
    </div>
  );
}

PhotosGallery.defaultProps = {
  imageWidth: 320,
};

PhotosGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  imageWidth: PropTypes.number,
};

export default PhotosGallery;
