import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { loginAction } from '../../../store/actions';

const inputStyle = {
  padding: '14px',
  border: '1px solid #b2b2b2',
  width: '100%',
};

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('*Required field'),
  password: Yup.string()
    .min(8, 'Too Short')
    .max(50, 'Too Long')
    .required('*Required field'),
});

function removeServerError(error, field, errorsObj, callback) {
  if (error && errorsObj[field]) {
    callback({ ...errorsObj, [field]: '' });
  }
}

function LoginForm({ login }) {
  const [loaderDisplay, setLoaderDisplay] = useState('none');
  const [loginErrors, setLoginErrors] = useState({});
  return (
    <div className="form-container">
      <div className="form-heading">
        <h1>Welcome!</h1>
        <p>Login to your profile</p>
        <div className="loader-container">
          <img
            style={{ display: loaderDisplay }}
            src="/svg/three-dots.svg"
            alt="Loading..."
          />
        </div>
      </div>

      <Formik
        initialValues={
          {
            email: '',
            password: '',
          }
        }
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting }) => {
          setLoaderDisplay('inline');
          login({ values, setLoaderDisplay, setLoginErrors });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="fields-container">
              <div className="input-wrapper">
                <Field
                  placeholder="Email"
                  style={inputStyle}
                  type="email"
                  name="email"
                  innerRef={() => {
                    removeServerError(
                      errors.email,
                      'emailError',
                      loginErrors,
                      setLoginErrors,
                    );
                  }}
                />
                <ErrorMessage
                  className="error-text"
                  name="email"
                  component="span"
                />
                <span className="error-text">{loginErrors.emailError}</span>
              </div>
              <div className="input-wrapper">
                <Field
                  placeholder="Password"
                  style={inputStyle}
                  type="password"
                  name="password"
                  innerRef={() => {
                    removeServerError(
                      errors.password,
                      'passwordError',
                      loginErrors,
                      setLoginErrors,
                    );
                  }}
                />
                <ErrorMessage
                  className="error-text"
                  name="password"
                  component="span"
                />
                <span className="error-text">{loginErrors.passwordError}</span>
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

          .loader-container {
            width: 100%;
            height: 20px;
            text-align: center;
            margin: 4px 0px 8px;
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

          .form-heading p {
            font-size: 18px;
            margin-top: 12px;
            color: #787878;
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

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(loginAction(payload)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
