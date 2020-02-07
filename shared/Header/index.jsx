import React from 'react';
import Logo from '../Logo/index';
import HeaderSearch from './HeaderSearch/index';
import HeaderButtons from './HeaderButtons/index';

export default function Header() {
  return (
    <header>
      <div>
        <Logo />
        <HeaderSearch />
      </div>
      <HeaderButtons />
      <style jsx>
        {`
          header {
            display: flex;
            z-index: 10;
            align-items: center;
            justify-content: space-between;
            background: #070943;
            height: 60px;
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            padding: 0px 20px;
          }

          header > div {
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </header>
  );
}
