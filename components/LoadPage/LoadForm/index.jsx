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
import { loadAction } from '../../../store/actions';
import TagsConstructor from './TagsConstructor/index';
import { removeServerError } from '../../../utils';

const inputStyle = {
  padding: '14px',
  border: '1px solid #b2b2b2',
  width: '100%',
};

const loadSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .required('*Required field'),
});

function LoadForm({ load, owner }) {
  const [loaderDisplay, setLoaderDisplay] = useState('none');
  const [loadErrors, setloadErrors] = useState({});
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');

  const onChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileError('');
  };

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
          name,
          tags,
          owner,
        }}
        validationSchema={loadSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          if (selectedFile !== null) {
            setLoaderDisplay('inline');
            load({
              values: { ...values, file: selectedFile },
              setLoaderDisplay,
              setloadErrors,
              setName,
              setTags,
              setSelectedFile,
            });
            setSubmitting(false);
          } else {
            setFileError('Choose an image');
          }
        }}
      >
        {({ isSubmitting, errors, values }) => (
          <Form>
            <div className="fields-container">
              <div className="input-wrapper">
                <label htmlFor="photo-name" className="hide-label-text">
                  Enter name of your photo
                  <Field
                    id="photo-name"
                    placeholder="Photo's name"
                    style={inputStyle}
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
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
                </label>
                <ErrorMessage
                  className="error-text"
                  name="name"
                  component="span"
                />
                <span className="error-text">{loadErrors.titleError}</span>
              </div>
              <div className="input-wrapper">
                <TagsConstructor handleChange={setTags} tags={values.tags} />
                <span className="error-text">{loadErrors.tagsError}</span>
              </div>
              <div className="input-container file-container">
                <label htmlFor="file-input" className="file-label">
                  Choose a photo
                  <input
                    className="inputfile"
                    id="file-input"
                    type="file"
                    name="file"
                    onChange={onChangeHandler}
                  />
                  <span className="show-file-info">
                    {selectedFile !== null
                      ? selectedFile.name
                      : 'Choose a file'}
                  </span>
                </label>
                <span style={{ display: 'block' }} className="error-text">
                  {loadErrors.photoError || fileError}
                </span>
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
          .inputfile {
            overflow: hidden;
            z-index: -1;
            font-size: 0px;
          }

          .show-file-info {
            position: absolute;
            left: 190px;
            color: #d81b60;
          }

          .file-label {
            cursor: pointer;
            font-size: 18px;
            font-weight: 600;
            color: white;
            background-color: #070943;
            align-items: center;
            justify-content: center;
            display: flex;
            height: 48px;
            width: 180px;
            padding: 8px 10px;
            border: 2px solid #070943;
            transition: background 0.25s;
          }

          .file-label * {
            pointer-events: none;
          }

          file-label:hover {
            background: white;
            color: #070943;
          }

          .file-container {
            position: relative;
            margin-top: 16px;
          }

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
            top: 53%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9;
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

LoadForm.propTypes = {
  load: PropTypes.func.isRequired,
  owner: PropTypes.string,
};

LoadForm.defaultProps = {
  owner: '',
};

const mapDispatchToProps = (dispatch) => ({
  load: (payload) => dispatch(loadAction(payload)),
});

const mapStateToProps = (state) => ({ owner: state.auth.user.id });

export default connect(mapStateToProps, mapDispatchToProps)(LoadForm);
