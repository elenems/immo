import React from 'react';
import AuthHeader from '../shared/AuthHeader/index';
import CustomLink from '../ui_components/CustomLink/index';
import LoginForm from '../components/LoginPage/LoginForm/index';
import { redirectFromAuthPage } from '../utils';

export default function Join() {
  redirectFromAuthPage();
  return (
    <div className="auth-page">
      <div className="overlay" />
      <AuthHeader>
        <div className="switch">
          <p>New to Immo?</p>
          <CustomLink href="/join" text="Join" />
        </div>
      </AuthHeader>
      <LoginForm />
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
