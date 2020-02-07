import React from 'react';
import PropTypes from 'prop-types';
import { TiHeartFullOutline, TiEye, TiHeartOutline } from 'react-icons/ti';

function BottomWall({ tags }) {
  return (
    <div className="photo-bottom-wall">
      <div className="bottom-wall-tags">
        {tags.map((tag) => (
          <span key={tag}>{`#${tag}`}</span>
        ))}
      </div>
      <div className="views">
        <span>102</span>
        <i>
          <TiEye />
        </i>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
        type="button"
      >
        <TiHeartFullOutline />
      </button>
      <style jsx>
        {`
          .photo-bottom-wall {
            bottom: 5px;
            padding: 12px;
            width: 100%;
            background: rgba(25, 25, 25, 0.25);
            justify-content: flex-end;
            align-items: center;
          }

          .bottom-wall-tags span {
            color: white;
            margin-right: 8px;
          }

          .views {
            display: flex;
            align-items: center;
          }

          .views span {
            font-size: 18px;
            font-weight: 500;
            color: white;
          }

          .views i {
            font-size: 28px;
            color: white;
            margin-left: 6px;
          }

          button {
            background: none;
            border: none;
            color: white;
            font-size: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
            transition: transform 0.25s;
          }

          button:hover {
            transform: scale(1.2);
          }
        `}
      </style>
    </div>
  );
}

BottomWall.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default BottomWall;
