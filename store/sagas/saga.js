import { all, takeLatest } from 'redux-saga/effects';
import { actionTypes as T } from '../actions';
import {
  joinUserSaga,
  loginUserSaga,
  getUserSaga,
  likePhotoSaga,
  unlikePhotoSaga,
  logoutUserSaga,
  loadPhotoSaga,
} from './sagaActions/userSagas';

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
