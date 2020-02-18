import { put, delay } from 'redux-saga/effects';
import { actionTypes as T } from '../../actions';

export default function* handleCardDisplay(message, type) {
  yield put({
    type: T.SHOW_CARD,
    payload: { text: message, type },
  });
  yield delay(3500);
  yield put({ type: T.HIDE_CARD });
}
