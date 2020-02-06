import React from 'react';
import PropTypes from 'prop-types';

function Tag({ clickHandler, text }) {
  return (
    <div className="tag">
      <button type="button" onClick={clickHandler}>
        {`#${text}`}
      </button>
      <style jsx>
        {`
          .tag {
            display: inline-block;
            margin-right: 20px;
            margin-bottom: 12px;
          }

          .tag::last-child {
            margin-right: 0px;
          }

          button {
            padding: 7px 9px;
            color: #777474;
            border-radius: 50px;
            font-size: 24px;
            font-weight: 600;
            border: 1px solid #777474;
            background: none;
            height: 50px;
          }

          button:hover {
            background-color: #f3f3f3;
          }
        `}
      </style>
    </div>
  );
}

Tag.propTypes = {
  clickHandler: PropTypes.func,
  text: PropTypes.string.isRequired,
};

Tag.defaultProps = {
  clickHandler: () => {},
};

export default Tag;
