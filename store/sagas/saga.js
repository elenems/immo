import { all, takeLatest } from 'redux-saga/effects';
import 'isomorphic-unfetch';

import { actionTypes } from '../actions';

function* loadDataSaga() {}

function* rootSaga() {
  yield all([takeLatest(actionTypes.LOG_IN, loadDataSaga)]);
}

export default rootSaga;
