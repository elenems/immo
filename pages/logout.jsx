import React from 'react';
import Head from 'next/head';
import { guardAuthPage } from '../utils';
import LogoutBlock from '../components/LogoutPage/LogoutBlock/index';
import Header from '../shared/Header/index';

export default function Join() {
  guardAuthPage();
  return (
    <div className="auth-page">
      <Head>
        <title>Immo | Logout</title>
        <meta name="Description" content="Logout Immo" />
      </Head>
      <div className="overlay" />
      <Header />
      <LogoutBlock />
      <style jsx>
        {`
          .auth-page {
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
