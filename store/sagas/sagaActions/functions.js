/* eslint-disable no-undef */
import Router from 'next/router';
import { put } from 'redux-saga/effects';
import { actionTypes as T } from '../../actions';
import handleCardDisplay from './uiSagas';

export const addError = function* addError(error, showError, action) {
  showError(error);
  yield action.payload.setLoaderDisplay('none');
};

export const dispatchSuccess = function* dispatchSuccess(
  successType,
  getType,
  action,
) {
  yield put({ type: successType });
  yield put({ type: getType, payload: action.payload.values.email });
  yield action.payload.setLoaderDisplay('none');
};

export const completeAuthIn = function completeAuth(token) {
  if (process.browser) {
    sessionStorage.setItem('token', token);
    Router.push('/profile');
  }
};

export const completeAuthOut = function* completeAuthOut() {
  yield sessionStorage.removeItem('token');
  yield put({ type: T.LOG_OUT_SUCCESS });
  Router.push('/');
};

export const dispatchSuccessWithCard = function* dispatchSuccessLike(
  message,
  type,
  payload,
) {
  yield put({
    type,
    payload,
  });
  yield handleCardDisplay(message, 'success');
};

export const dispatchUploadSucceded = function* dispatchUploadSucceded(action, message) {
  yield put({ type: T.LOAD_PHOTO_SUCCESS, payload: message });
  action.payload.setLoaderDisplay('none');
  action.payload.setName('');
  action.payload.setTags([]);
  document.getElementById('file-input').value = '';
  action.payload.setloadErrors({});
  action.payload.setSelectedFile(null);
  yield handleCardDisplay(message, 'success');
};

export const dispatchUploadFailed = function* dispatchUploadFailed(action, e) {
  yield put({ type: T.LOAD_PHOTO_FAIL, payload: e.response.data.error });
  action.payload.setSelectedFile(null);
  action.payload.setloadErrors(e.response.data.errors);
  action.payload.setLoaderDisplay('none');
  document.getElementById('file-input').value = '';
  yield handleCardDisplay("Couldn't upload photo", 'fail');
};
