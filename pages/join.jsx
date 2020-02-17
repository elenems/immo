import React from 'react';
import Head from 'next/head';
import AuthHeader from '../shared/AuthHeader/index';
import CustomLink from '../ui_components/CustomLink/index';
import JoinForm from '../components/JoinPage/JoinForm/index';
import { redirectFromAuthPage } from '../utils';

export default function Join() {
  redirectFromAuthPage();
  return (
    <div className="auth-page">
      <Head>
        <title>Immo | Join for free</title>
        <meta
          name="Description"
          content="Join Immo for free. You will be able to load uour photos and access all site's functionality."
        />
      </Head>
      <div className="overlay" />
      <AuthHeader>
        <div className="switch">
          <p>Already using Immo?</p>
          <CustomLink href="/login" text="Sign in" />
        </div>
      </AuthHeader>
      <JoinForm />
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
