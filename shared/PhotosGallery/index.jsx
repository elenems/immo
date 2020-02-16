import React from 'react';
import PropTypes from 'prop-types';
import Photo from './Photo/index';
import './index.scss';

function PhotosGallery({ photos, imageWidth }) {
  const photosList = photos.map((photo) => (
    <Photo key={photo.id} photo={photo} />
  ));
  return (
    <div className="photos-gallery">
      {photos.length ? photosList : <div className="empty-list">No photos</div>}
      <style jsx>
        {`
          div {
            grid-template-columns: repeat(
              auto-fill,
              minmax(${imageWidth}px, 1fr)
            );
          }

          .empty-list {
            font-weight: 600;
            font-size: 20px;
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
