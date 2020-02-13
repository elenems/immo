import React from 'react';
import PropTypes from 'prop-types';

function TagsList({ tags, color }) {
  return (
    <div>
      {tags.map((tag) => (
        <span key={tag}>{`#${tag}`}</span>
      ))}
      <style jsx>
        {`
          span {
            font-size: 16px;
            font-weight: 700;
            color: ${color};
            margin: 6px;
          }
          span:first-child {
            margin-left: 0px;
          }
        `}
      </style>
    </div>
  );
}

TagsList.defaultProps = {
  color: 'white',
};

TagsList.propTypes = {
  tags: PropTypes.array.isRequired,
  color: PropTypes.string,
};

export default TagsList;
