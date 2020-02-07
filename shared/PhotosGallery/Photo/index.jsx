import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import './index.scss';
import BottomWall from './BottomWall/index';

function Photo({ photo }) {
  return (
    <div className="photo">
      <Link href="/photo/[id]" as={`/photo/${photo.id}`}>
        <div>
          <img src={photo.url} alt={photo.name} />
          <BottomWall tags={photo.tags} />
        </div>
      </Link>
    </div>
  );
}

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
};

export default Photo;
