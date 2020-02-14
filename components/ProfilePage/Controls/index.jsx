import React from 'react';
import './index.scss';
import CustomLink from '../../../ui_components/CustomLink/index';

export default function Controls() {
  return (
    <div className="profile-controls">
      <div>
        <CustomLink
          text="Load"
          color="#d81b60"
          title="Load"
          href="/Load"
        />
      </div>
      <div>
        <CustomLink
          text="Logout"
          color="#d81b60"
          title="Logout"
          href="/load"
        />
      </div>
      <style jsx>
        {`
          .profile-controls {
            display: flex;
            flex-direction: column;
            width: 200px;
          }

          .profile-controls > div {
            margin-bottom: 12px;
          }
        `}
      </style>
    </div>
  );
}
