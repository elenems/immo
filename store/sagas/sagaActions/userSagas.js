/* eslint-disable no-undef */
import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { actionTypes as T } from '../../actions';
import handleCardDisplay from './uiSagas';
import {
  addError,
  completeAuthIn,
  dispatchSuccess,
  completeAuthOut,
  dispatchSuccessWithCard,
  dispatchUploadSucceded,
  dispatchUploadFailed,
} from './functions';

const { REACT_APP_API } = process.env;

export const joinUserSaga = function* joinUserSaga(action) {
  try {
    const res = yield call(axios.post, `${REACT_APP_API}/join`, action.payload.values);
    yield dispatchSuccess(T.JOIN_SUCCESS, T.GET_USER, action);
    completeAuthIn(res.data.token);
  } catch (e) {
    yield addError(e.response.data, action.payload.setJoinErrors, action);
  }
};

export const loginUserSaga = function* loginUserSaga(action) {
  try {
    const res = yield call(axios.post, `${REACT_APP_API}/login`, action.payload.values);
    yield dispatchSuccess(T.LOG_IN_SUCCESS, T.GET_USER, action);
    completeAuthIn(res.data.token);
  } catch (e) {
    yield addError(e.response.data, action.payload.setLoginErrors, action);
  }
};

export const logoutUserSaga = function* logoutUserSaga() {
  try {
    yield completeAuthOut();
  } catch (e) {
    yield put({ type: T.LOG_OUT_FAIL });
  }
};

export const getUserSaga = function* getUserSaga(action) {
  try {
    const res = yield axios.get(`${REACT_APP_API}/getUser?userId=${action.payload}`);
    yield put({ type: T.AUTHENTICATE, payload: res.data });
  } catch (e) {
    yield put({ type: T.GET_USER_FAIL });
  }
};

export const likePhotoSaga = function* likePhotoSaga(action) {
  try {
    const res = yield call(axios.post, `${REACT_APP_API}/likePhoto`, action.payload);
    const ACTION = T.ADD_PHOTO_TO_FAVOURITE_SUCCESS;
    yield dispatchSuccessWithCard(res.data.message, ACTION, action.payload.photoId);
  } catch (e) {
    yield handleCardDisplay(e.response.data.error, 'fail');
  }
};

export const unlikePhotoSaga = function* unlikePhotoSaga(action) {
  try {
    const res = yield call(axios.post, `${REACT_APP_API}/unlikePhoto`, action.payload);
    const ACTION = T.REMOVE_PHOTO_FROM_FAVOURITE_SUCCESS;
    yield dispatchSuccessWithCard(res.data.message, ACTION, action.payload.photoId);
  } catch (e) {
    yield handleCardDisplay(e.response.data.error, 'fail');
  }
};

export const loadPhotoSaga = function* loadPhotoSaga(action) {
  const {
    tags,
    name,
    file,
    owner,
  } = yield action.payload.values;
  // eslint-disable-next-line no-undef
  const data = new FormData();
  data.append('file', file);
  const link = `${REACT_APP_API}/uploadPhoto?name=${name}&tags=${tags}&owner=${owner}`;
  try {
    const res = yield call(axios.post, link, data);
    dispatchUploadSucceded(action, res.data.message);
  } catch (e) {
    dispatchUploadFailed(action, e);
  }
};
