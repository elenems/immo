import React from 'react';
import PropTypes from 'prop-types';
import UserInfo from '../../../shared/UserInfo/index';
import PhotoDescription from '../../../shared/PhotoDescription/index';
import ViewsDisplay from '../../../ui_components/ViewsDisplay/index';
import HeartButton from '../../../ui_components/HeartButton/index';

function PhotoContainer({
  photoUrl,
  name,
  firstName,
  lastName,
  email,
  tags,
  views,
  photoId,
}) {
  return (
    <div className="photo-container">
      <div className="photo">
        <img src={photoUrl} alt={name} />
      </div>
      <div className="block">
        <PhotoDescription name={name} tags={tags} />
        <UserInfo firstName={firstName} lastName={lastName} email={email} />
      </div>
      <div className="block">
        <ViewsDisplay views={views} />
        <HeartButton id={photoId} color="#000" />
      </div>
      <style jsx>
        {`
          .block {
            display: flex;
            justify-content: space-between;
          }
          .block:last-child {
            border-top: 2px solid #d81b60;
          }
          .photo-container {
            max-width: 430px;
            min-width: 200px;
            width: 100%;
            min-height: 220px;
          }
          .photo {
            cursor: default;
          }
          img {
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
}

PhotoContainer.propTypes = {
  photoUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string,
  tags: PropTypes.array.isRequired,
  email: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
  photoId: PropTypes.string.isRequired,
};

PhotoContainer.defaultProps = {
  lastName: '',
};

export default PhotoContainer;
