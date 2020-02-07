import { all, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { actionTypes as T } from '../actions';

const { REACT_APP_API } = process.env;

function* joinUserSaga(action) {
  try {
    const res = yield call(() =>
      axios.post(`${REACT_APP_API}/join`, action.payload),
    );
    const { token } = res.data;
    yield put({ type: T.JOIN_SUCCESS, payload: token });
  } catch (e) {
    const error = e.response.data;
    yield put({ type: T.JOIN_FAIL, payload: error });
  }
}

function* rootSaga() {
  yield all([takeLatest(T.JOIN, joinUserSaga)]);
}

export default rootSaga;
