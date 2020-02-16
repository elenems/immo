/* eslint-disable no-undef */
import { all, takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import Router from 'next/router';
import { actionTypes as T } from '../actions';

const { REACT_APP_API } = process.env;

function* handleCardDisppay(message, type) {
  yield put({
    type: T.SHOW_CARD,
    payload: { text: message, type },
  });
  yield delay(3500);
  yield put({ type: T.HIDE_CARD });
}

function* joinUserSaga(action) {
  try {
    const res = yield call(() =>
      axios.post(`${REACT_APP_API}/join`, action.payload.values),
    );
    const { token } = res.data;
    yield put({ type: T.JOIN_SUCCESS });
    yield put({ type: T.GET_USER, payload: action.payload.values.email });
    yield action.payload.setLoaderDisplay('none');
    if (process.browser) {
      // eslint-disable-next-line no-undef
      sessionStorage.setItem('token', token);
      Router.push('/profile');
    }
  } catch (e) {
    const error = e.response.data;
    action.payload.setJoinErrors(error);
    yield action.payload.setLoaderDisplay('none');
  }
}

function* loginUserSaga(action) {
  try {
    const res = yield call(() =>
      axios.post(`${REACT_APP_API}/login`, action.payload.values),
    );
    const { token } = res.data;
    yield put({ type: T.LOG_IN_SUCCESS });
    yield put({ type: T.GET_USER, payload: action.payload.values.email });
    yield action.payload.setLoaderDisplay('none');
    if (process.browser) {
      // eslint-disable-next-line no-undef
      sessionStorage.setItem('token', token);
      Router.push('/profile');
    }
  } catch (e) {
    const error = e.response.data;
    action.payload.setLoginErrors(error);
    yield action.payload.setLoaderDisplay('none');
  }
}

function* logoutUserSaga() {
  try {
    // eslint-disable-next-line no-undef
    yield sessionStorage.removeItem('token');
    yield put({ type: T.LOG_OUT_SUCCESS });
    Router.push('/');
  } catch (e) {
    yield put({ type: T.LOG_OUT_FAIL });
  }
}

function* getUserSaga(action) {
  try {
    const res = yield axios.get(
      `${REACT_APP_API}/getUser?userId=${action.payload}`,
    );
    yield put({ type: T.AUTHENTICATE, payload: res.data });
  } catch (e) {
    yield put({ type: T.GET_USER_FAIL });
  }
}

function* likePhotoSaga(action) {
  try {
    const res = yield call(() =>
      axios.post(`${REACT_APP_API}/likePhoto`, action.payload),
    );
    const { message } = res.data;
    yield put({
      type: T.ADD_PHOTO_TO_FAVOURITE_SUCCESS,
      payload: action.payload.photoId,
    });
    yield handleCardDisppay(message, 'success');
  } catch (e) {
    const { error } = e.response.data;
    yield handleCardDisppay(error, 'fail');
  }
}

function* unlikePhotoSaga(action) {
  try {
    const res = yield call(() =>
      axios.post(`${REACT_APP_API}/unlikePhoto`, action.payload),
    );
    const { message } = res.data;
    yield put({
      type: T.REMOVE_PHOTO_FROM_FAVOURITE_SUCCESS,
      payload: action.payload.photoId,
    });
    yield handleCardDisppay(message, 'success');
  } catch (e) {
    const { error } = e.response.data;
    yield handleCardDisppay(error, 'fail');
  }
}

function* loadPhotoSaga(action) {
  const { tags, name, file, owner } = yield action.payload.values;
  const data = new FormData();
  data.append('file', file);
  const link = `${REACT_APP_API}/uploadPhoto?name=${name}&tags=${tags}&owner=${owner}`;
  try {
    const res = yield call(() => axios.post(link, data));
    const { message } = res.data;
    yield put({ type: T.LOAD_PHOTO_SUCCESS, payload: message });
    action.payload.setLoaderDisplay('none');
    action.payload.setName('');
    action.payload.setTags([]);
    document.getElementById('file-input').value = '';
    action.payload.setloadErrors({});
    action.payload.setSelectedFile(null);
    yield handleCardDisppay(message, 'success');
  } catch (e) {
    yield put({ type: T.LOAD_PHOTO_FAIL, payload: e.response.data.error });
    action.payload.setSelectedFile(null);
    action.payload.setloadErrors(e.response.data.errors);
    action.payload.setLoaderDisplay('none');
    document.getElementById('file-input').value = '';
    yield handleCardDisppay("Couldn't upload photo", 'fail');
  }
}

function* rootSaga() {
  yield all([
    takeLatest(T.JOIN, joinUserSaga),
    takeLatest(T.LOG_IN, loginUserSaga),
    takeLatest(T.GET_USER, getUserSaga),
    takeLatest(T.ADD_PHOTO_TO_FAVOURITE, likePhotoSaga),
    takeLatest(T.REMOVE_PHOTO_FROM_FAVOURITE, unlikePhotoSaga),
    takeLatest(T.LOG_OUT, logoutUserSaga),
    takeLatest(T.LOAD_PHOTO, loadPhotoSaga),
  ]);
}

export default rootSaga;
