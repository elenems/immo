import React from 'react';
import Header from '../shared/Header/index';
import LoadForm from '../components/LoadPage/LoadForm/index';

export default function Load() {
  return (
    <div className="load-page">
      <div className="overlay" />
      <Header />
      <LoadForm />
      <style jsx>
        {`
          .load-page {
            background-image: url('/images/auth-background.jpg');
            height: 100vh;
            background-repeat: no-repeat;
            background-size: cover;
          }

          .switch {
            display: flex;
            align-items: center;
          }

          .switch p {
            margin-right: 16px;
            font-size: 14px;
            color: #cac9c8;
          }

          .overlay {
            height: 100vh;
            width: 100%;
            background: rgba(0, 0, 0, 0.5);
            position: absolute;
          }
        `}
      </style>
    </div>
  );
}
