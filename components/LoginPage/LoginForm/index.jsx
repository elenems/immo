import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const inputStyle = {
  padding: '14px',
  border: '1px solid #b2b2b2',
  width: '100%',
};

export default function LoginForm() {
  return (
    <div className="form-container">
      <div className="form-heading">
        <h1>Welcome back!</h1>
        <p>Login to your profile.</p>
      </div>

      <Formik
        initialValues={{ email: '', password: '' }}
        validate={() => {
          const errors = {};
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="fields-container">
              <div className="input-wrapper">
                <Field
                  placeholder="Email"
                  style={inputStyle}
                  type="email"
                  name="email"
                />
                <ErrorMessage name="email" component="span" />
              </div>
              <div className="input-wrapper">
                <Field
                  placeholder="Password"
                  style={inputStyle}
                  type="password"
                  name="password"
                />
                <ErrorMessage name="password" component="span" />
              </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
      <style jsx>
        {`
          .fields-container {
            display: flex;
            flex-direction: column;
          }

          button[type='submit'] {
            background: #070943;
            color: white;
            border: none;
            padding: 15px 20px;
            width: 100%;
            margin-top: 20px;
            display: block;
            font-size: 18px;
            font-weight: 600;
            border: 2px solid #070943;
            transition: background 0.2s;
          }

          button[type='submit']:hover {
            background: none;
            color: #070943;
          }

          .input-wrapper {
            width: 100%;
            width: 100%;
            padding: 8px 0px;
          }

          .form-container {
            min-width: 320px;
            max-width: 500px;
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 20;
            background: white;
            padding: 32px 32px;
            border-radius: 8px;
          }

          .form-heading {
            margin-bottom: 30px;
          }

          .form-heading p {
            font-size: 18px;
            margin-top: 12px;
            color: #787878;
          }

          strong {
            font-size: 14px;
            font-weight: 400;
            color: #595959;
          }

          h1 {
            margin: 0px;
            font-size: 36px;
            text-align: center;
            font-weight: 600;
          }
        `}
      </style>
    </div>
  );
}
