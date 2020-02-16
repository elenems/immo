import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosAdd } from 'react-icons/io';
import Tag from './Tag/index';

const inputTag = (value, setName, setError) => {
  if (value.length > 24) {
    setError('Too long!');
  } else if (!value.match(/^[a-z]{0,24}$/)) {
    setError('Tag should contain only lowercase letters');
  } else {
    setName(value);
    setError('');
  }
};

const addTag = (tag, tags, handleChange, setError, clearTagText) => {
  if (tags.length >= 6) {
    setError('Can add only six tags');
  } else if (tags.includes(tag)) {
    setError('This tag already exists');
  } else if (tag.length > 0) {
    setError('');
    clearTagText();
    handleChange([...tags, tag]);
  }
};

const removeTag = (tagToRemove, tags, handleChange) => {
  const formatedTag = tagToRemove.replace(/[# ]/g, '');
  const newTags = tags.filter((tag) => tag !== formatedTag);
  handleChange([...newTags]);
};

function TagsConstructor({ tags, handleChange }) {
  const tagsWithHash = useMemo(() => tags.map((tag) => `#${tag} `), [tags]);
  const [tagName, setTagName] = useState('');
  const [error, setError] = useState('');
  return (
    <div>
      <div className="tags-container">
        {tagsWithHash.map((tag) => (
          <Tag
            key={tag}
            tag={tag}
            removeTag={() => removeTag(tag, tags, handleChange)}
          />
        ))}
      </div>
      <div className="input-with-button">
        <input
          name="tag-input"
          placeholder="Tag name"
          type="text"
          value={tagName}
          onChange={(e) => inputTag(e.target.value, setTagName, setError)}
        />
        <button
          title="Add"
          name="tags"
          onClick={() => addTag(tagName, tags, handleChange, setError, () => setTagName(''))}
          type="button"
        >
          <IoIosAdd />
        </button>
      </div>
      {error ? <span className="error-text">{error}</span> : null}

      <style jsx>
        {`
          .input-with-button {
              display: flex;
          }

          .tags-container {
              display: flex;
              flex-wrap: wrap;
          }

          input:disabled {
            padding: 4px 14px;
            border: none;
            width: 100%;
            background: white;
          }

           input[name="tag-input"] {
            padding: 14px;
            border: 1px solid #b2b2b2;
            width: 100%;
           }

           button {
            width: 54px;
            margin-left: 15px;
            font-size: 34px;
            display: flex;
            color: white;
            border: none;
            background: #070943;
        }
           }
          }
        `}
      </style>
    </div>
  );
}

TagsConstructor.propTypes = {
  tags: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TagsConstructor;
