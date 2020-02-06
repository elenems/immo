import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../../../../../ui_components/Tag/index';

const tags = ['nature', 'architecture', 'cat', 'dog', 'people', 'art', 'space', 'food', 'sport'];

function TagsList({ setSearchText }) {
  return (
    <div>
      {tags.map((tag) => (
        <Tag
          key={tag}
          text={tag}
          clickHandler={() => {
            setSearchText(tag);
          }}
        />
      ))}
      <style jsx>
        {`
          div {
            margin-top: 24px;
            padding-top: 16px;
            border-top: 1px solid #777474;
          }
        `}
      </style>
    </div>
  );
}

TagsList.propTypes = {
  setSearchText: PropTypes.func.isRequired,
};

export default React.memo(TagsList);
