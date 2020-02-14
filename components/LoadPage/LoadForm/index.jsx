import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { loadAction } from '../../../store/actions';

const inputStyle = {
  padding: '14px',
  border: '1px solid #b2b2b2',
  width: '100%',
};

const loadSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .required('*Required field'),
  // tags: Yup.array().of(Yup.string().min(1)),
});

function removeServerError(error, field, errorsObj, callback) {
  if (error && errorsObj[field]) {
    callback({ ...errorsObj, [field]: '' });
  }
}

function LoadForm({ load }) {
  const [loaderDisplay, setLoaderDisplay] = useState('none');
  const [loadErrors, setloadErrors] = useState({});
  return (
    <div className="form-container">
      <div className="form-heading">
        <h1>Load photo</h1>
        <p>Load your photo and make it popular all over the world!</p>
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
          title: '',
        }}
        validationSchema={loadSchema}
        onSubmit={(values, { setSubmitting }) => {
          setLoaderDisplay('inline');
          load({ values, setLoaderDisplay, setloadErrors });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="fields-container">
              <div className="input-wrapper">
                <Field
                  placeholder="Photo's title"
                  style={inputStyle}
                  type="text"
                  name="title"
                  autoComplete="on"
                  innerRef={() => {
                    removeServerError(
                      errors.title,
                      'titleError',
                      loadErrors,
                      setloadErrors,
                    );
                  }}
                />
                <ErrorMessage
                  className="error-text"
                  name="title"
                  component="span"
                />
                <span className="error-text">{loadErrors.titleError}</span>
              </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Load
            </button>
          </Form>
        )}
      </Formik>
      <div className="form-footer">
        <strong>
          By loading your photo, you agree to our
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

LoadForm.propTypes = {
  load: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  load: (payload) => dispatch(loadAction(payload)),
});

const mapStateToProps = (state) => ({ owner: state.auth.user.id });

export default connect(mapStateToProps, mapDispatchToProps)(LoadForm);
