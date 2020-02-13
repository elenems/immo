import React from 'react';
import PropTypes from 'prop-types';

import { TiEye } from 'react-icons/ti';

function convertViews(views) {
  if (views === 0) return 'No views';
  if (views === 1) return '1 views';
  if (views > 0 && views < 100000) return `${views} views`;
  if (views >= 100000 && views < 1000000) return `${String(views).slice(3)}k views`;
  if (views >= 1000000) return `${String(views).slice(0, 1)},${String(views).slice(1, 2)}m views`;
  return `${views} views`;
}

function ViewsDisplay({ views }) {
  return (
    <div>
      <i>
        <TiEye />
      </i>
      <span>{convertViews(views)}</span>
      <style jsx>
        {`
          i {
            font-size: 40px;
          }
          div {
            display: flex;
            align-items: center;
          }
          span {
            margin-left: 10px;
            color: #767676;
          }
        `}
      </style>
    </div>
  );
}

ViewsDisplay.propTypes = {
  views: PropTypes.number.isRequired,
};

export default ViewsDisplay;
