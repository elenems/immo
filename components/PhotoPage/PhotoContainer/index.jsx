import React from 'react';
import PropTypes from 'prop-types';
import UserInfo from '../../../shared/UserInfo/index';
import PhotoDescription from '../../../shared/PhotoDescription/index';

function PhotoContainer({
  photoUrl,
  name,
  firstName,
  lastName,
  email,
  tags,
}) {
  return (
    <div>
      <img src={photoUrl} alt={name} />
      <div className="block">
        <PhotoDescription name={name} tags={tags} />
        <UserInfo firstName={firstName} lastName={lastName} email={email} />
      </div>
      <style jsx>
        {`
          .block {
            display: flex;
            justify-content: space-between;
          }
          div {
            max-width: 430px;
            min-width: 200px;
            width: 100%;
            max-height: 530px;
            min-height: 220px;
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
};

PhotoContainer.defaultProps = {
  lastName: '',
};

export default PhotoContainer;
