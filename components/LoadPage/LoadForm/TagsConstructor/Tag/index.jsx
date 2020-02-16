import React from 'react';
import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';

function Tag({ tag, removeTag }) {
  return (
    <button type="button" onClick={removeTag}>
      <span>{tag}</span>
      <span className="icon">
        <IoIosClose />
      </span>
      <style jsx>
        {`
          button {
            display: inline;
            border: 2px solid #070943;
            padding: 10px 16px;
            border-radius: 50px;
            position: relative;
            cursor: pointer;
            margin: 0px 10px 12px 0px;
            background: white;
          }

          button:hover .icon {
            opacity: 1;
          }

          .icon {
            position: absolute;
            opacity: 0;
            transition: opacity 0.3s;
            right: 4px;
            top: 0px;
            font-size: 18px;
            color: #d81b60;
          }
        `}
      </style>
    </button>
  );
}

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  removeTag: PropTypes.func.isRequired,
};

export default Tag;
