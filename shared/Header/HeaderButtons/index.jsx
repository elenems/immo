import React from 'react';
import CustomLink from '../../../ui_components/CustomLink/index';
import Button from '../../../ui_components/Button/index';

export default function HeaderButtons() {
  return (
    <div>
      <div className="header-controls">
        <Button
          text="Load"
          title="Load your photo"
          callback={() => {}}
        />
        <CustomLink
          href="/login"
          text="Login"
          title="Login to your profile"
        />
      </div>
      <style jsx>
        {`
          .header-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 125px;
          }
        `}
      </style>
    </div>
  );
}
