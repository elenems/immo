import React from 'react';
import PropTypes from 'prop-types';
import { TiEye } from 'react-icons/ti';
import HeartButton from '../../../../ui_components/HeartButton/index';
import Tags from '../../../../ui_components/TagsList/index';

function BottomWall({ tags, photoId, views }) {
  return (
    <div className="photo-bottom-wall">
      <div className="bottom-wall-tags">
        <Tags tags={tags} />
      </div>
      <div className="views">
        <span>{views}</span>
        <i>
          <TiEye />
        </i>
      </div>
      <HeartButton id={photoId} />
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

          .views {
            display: flex;
            align-items: center;
            position: relative;
          }

          .views span {
            font-size: 16px;
            font-weight: 900;
            color: white;
            position: absolute;
            top: -2px;
            left: 4px;
          }

          .views i {
            font-size: 34px;
            color: black;
          }
        `}
      </style>
    </div>
  );
}

BottomWall.propTypes = {
  tags: PropTypes.array.isRequired,
  photoId: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
};

export default BottomWall;
