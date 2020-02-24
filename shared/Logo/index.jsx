import React from 'react';
import Link from 'next/link';

export default function Logo() {
  return (
    <div className="logo-container">
      <Link href="/">
        <div
          className="logo"
          title="Stock photos"
        >
          <img
            src="/svg/logo.svg"
            alt="Move to home page"
          />
          <span>Immo</span>
        </div>
      </Link>
      <style jsx>
        {`
          .logo {
            cursor: pointer;
            display: flex;
            align-items: center;
          }

          .logo img {
            width: 40px;
            margin-right: 8px;
          }

          .logo span {
            font-size: 24px;
            font-weight: bold;
            color: #fff;
          }
        `}
      </style>
    </div>
  );
}
