import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import BottomWall from './BottomWall/index';

function Photo({ photo }) {
  return (
    <div className="photo">
      <Link href="/photo/[id]" as={`/photo/${photo.id}`}>
        <div>
          <img src={photo.url} alt={photo.name} />
          <div className="show-on-hover">
            <BottomWall
              views={photo.views}
              photoId={photo.id}
              tags={photo.tags}
            />
          </div>
        </div>
      </Link>
      <style jsx>
        {`

          .show-on-hover {
            position: absolute;
            display: block;
            bottom: 5px;
            width: 100%;
          }

          .photo:hover .show-on-hover {
            display: block;
          }

          .photo {
            margin: 4px;
            transition: transform 0.25s;
            display: flex;
            align-items: center;
            cursor: pointer;
          }

          .photo > div {
            position: relative;
          }

          .photo:hover {
            transform: scale(1.05);
          }

          img {
            width: 100%;
            height: auto;
            border-radius: 4px;
          }
        `}
      </style>
    </div>
  );
}

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
};

export default Photo;
