import React from 'react';
import PropTypes from 'prop-types';
import { TiEye } from 'react-icons/ti';
import convertViews from './functions';

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
