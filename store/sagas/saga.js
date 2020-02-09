import { all, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import Router from 'next/router';

import { actionTypes as T } from '../actions';

const { REACT_APP_API } = process.env;

function* joinUserSaga(action) {
  try {
    const res = yield call(() =>
      axios.post(`${REACT_APP_API}/join`, action.payload.values),
    );
    const { token } = res.data;
    yield put({ type: T.JOIN_SUCCESS });
    yield action.payload.setLoaderDisplay('none');
    if (process.browser) {
      // eslint-disable-next-line no-undef
      sessionStorage.setItem('token', token);
      Router.push('/');
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
    yield action.payload.setLoaderDisplay('none');
    if (process.browser) {
      // eslint-disable-next-line no-undef
      sessionStorage.setItem('token', token);
      Router.push('/');
    }
  } catch (e) {
    const error = e.response.data;
    action.payload.setLoginErrors(error);
    yield action.payload.setLoaderDisplay('none');
  }
}

function* rootSaga() {
  yield all([takeLatest(T.JOIN, joinUserSaga), takeLatest(T.LOG_IN, loginUserSaga)]);
}

export default rootSaga;
