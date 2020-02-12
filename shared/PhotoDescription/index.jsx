import React from 'react';
import PropTypes from 'prop-types';
import TagsList from '../../ui_components/TagsList/index';

function PhotoDescription({ name, tags }) {
  return (
    <div>
      <p>{name}</p>
      <TagsList tags={tags} color="#767676" />
      <style jsx>
        {`
          p {
            font-size: 18px;
            font-weight: 700;
            color: #d81b60;
          }
        `}
      </style>
    </div>
  );
}

PhotoDescription.propTypes = {
  name: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

export default PhotoDescription;
