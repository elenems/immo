/* eslint-disable jsx-a11y/label-has-associated-control */
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
import { joinAction } from '../../../store/actions';
import { removeServerError } from '../../../utils';

const inputStyle = {
  padding: '14px',
  border: '1px solid #b2b2b2',
  width: '100%',
};

const joinSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .required('*Required field'),
  lastName: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long'),
  email: Yup.string()
    .email('Invalid email')
    .required('*Required field'),
  password: Yup.string()
    .min(8, 'Too Short')
    .max(50, 'Too Long')
    .required('*Required field'),
});

function JoinForm({ join }) {
  const [loaderDisplay, setLoaderDisplay] = useState('none');
  const [joinErrors, setJoinErrors] = useState({});
  return (
    <div className="form-container">
      <div className="form-heading">
        <h1>Join Immo</h1>
        <p>Discover thousands of free photos you can use everywhere.</p>
        <div className="loader-container">
          <img
            style={{ display: loaderDisplay }}
            src="/svg/three-dots.svg"
            alt="Loading..."
          />
        </div>
      </div>

      <Formik
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
        }}
        validationSchema={joinSchema}
        onSubmit={(values, { setSubmitting }) => {
          setLoaderDisplay('inline');
          join({ values, setLoaderDisplay, setJoinErrors });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="fields-container">
              <div className="two-inputs-container">
                <div className="input-wrapper">
                  <label htmlFor="first-name" className="hide-label-text">
                    Enter Firstname
                    <Field
                      placeholder="First name"
                      style={inputStyle}
                      type="text"
                      name="firstName"
                      autoComplete="on"
                      innerRef={() => {
                        removeServerError(
                          errors.firstName,
                          'firstNameError',
                          joinErrors,
                          setJoinErrors,
                        );
                      }}
                    />
                  </label>
                  <ErrorMessage
                    className="error-text"
                    name="firstName"
                    component="span"
                  />
                  <span className="error-text">
                    {joinErrors.firstNameError}
                  </span>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="last-name" className="hide-label-text">
                    Enter Lastname
                    <Field
                      id="last-name"
                      placeholder="Last name (Optinal)"
                      style={inputStyle}
                      type="text"
                      name="lastName"
                      autoComplete="on"
                      innerRef={() => {
                        removeServerError(
                          errors.lastName,
                          'lastNameError',
                          joinErrors,
                          setJoinErrors,
                        );
                      }}
                    />
                  </label>
                  <ErrorMessage
                    className="error-text"
                    name="lastName"
                    component="span"
                  />
                </div>
              </div>
              <div className="input-wrapper">
                <label htmlFor="email" className="hide-label-text">
                  Enter email
                  <Field
                    id="email"
                    placeholder="Email"
                    style={inputStyle}
                    type="email"
                    name="email"
                    autoComplete="on"
                    innerRef={() => {
                      removeServerError(
                        errors.email,
                        'emailError',
                        joinErrors,
                        setJoinErrors,
                      );
                    }}
                  />
                </label>
                <ErrorMessage
                  className="error-text"
                  name="email"
                  component="span"
                />
                <span className="error-text">{joinErrors.emailError}</span>
              </div>
              <div className="input-wrapper">
                <label htmlFor="password" className="hide-label-text">
                  Enter password
                  <Field
                    id="password"
                    placeholder="Password"
                    style={inputStyle}
                    type="password"
                    name="password"
                    autoComplete="cc-csc"
                    innerRef={() => {
                      removeServerError(
                        errors.password,
                        'passwordError',
                        joinErrors,
                        setJoinErrors,
                      );
                    }}
                  />
                </label>
                <ErrorMessage
                  className="error-text"
                  name="password"
                  component="span"
                />
                <span className="error-text">{joinErrors.passwordError}</span>
              </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Join
            </button>
          </Form>
        )}
      </Formik>
      <div className="form-footer">
        <strong>
          By joining, you agree to our
          <b>Terms of Service</b>
          and
          <b>Privacy Policy</b>
        </strong>
      </div>
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

          .two-inputs-container div:last-child {
            padding-left: 8px;
          }

          .two-inputs-container div:first-child {
            padding-right: 8px;
          }

          .two-inputs-container {
            display: flex;
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
            color: #737372;
          }

          strong {
            font-size: 14px;
            font-weight: 400;
            color: #595959;
          }

          strong b {
            padding-left: 4px;
            padding-right: 4px;
          }

          .form-footer {
            margin-top: 20px;
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

JoinForm.propTypes = {
  join: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  join: (payload) => dispatch(joinAction(payload)),
});

export default connect(null, mapDispatchToProps)(JoinForm);
