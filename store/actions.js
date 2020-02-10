export const actionTypes = {
  LOG_IN: 'LOG_IN',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_OUT: 'LOG_OUT',
  LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
  LOG_OUT_FAIL: 'LOG_OUT_FAIL',
  JOIN: 'JOIN',
  JOIN_SUCCESS: 'JOIN_SUCCESS',
  AUTHENTICATE: 'AUTHENTICATE',
  SHOW_CARD: 'SHOW_CARD',
  HIDE_CARD: 'HIDE_CARD',
  GET_USER: 'GET_USER',
  ADD_PHOTO_TO_FAVOURITE: 'ADD_PHOTO_TO_FAVOURITE',
  ADD_PHOTO_TO_FAVOURITE_SUCCESS: 'ADD_PHOTO_TO_FAVOURITE_SUCCESS',
  REMOVE_PHOTO_FROM_FAVOURITE: 'REMOVE_PHOTO_FROM_FAVOURITE',
  REMOVE_PHOTO_FROM_FAVOURITE_SUCCESS: 'REMOVE_PHOTO_FROM_FAVOURITE_SUCCESS',
  REMOVE_PHOTO_FROM_FAVOURITE_FAIL: 'REMOVE_PHOTO_FROM_FAVOURITE_FAIL',
};

export const logoutAction = () => ({ type: actionTypes.LOG_OUT });
export const joinAction = (payload) => ({ type: actionTypes.JOIN, payload });
export const loginAction = (payload) => ({ type: actionTypes.LOG_IN, payload });
export const authenticateAction = () => ({ type: actionTypes.AUTHENTICATE });
export const showCardAction = (payload) => ({
  type: actionTypes.SHOW_CARD,
  payload,
});
export const hideCardAction = () => ({ type: actionTypes.HIDE_CARD });
export const getUserAction = (payload) => ({
  type: actionTypes.GET_USER,
  payload,
});
export const likePhotoAction = (payload) => ({
  type: actionTypes.ADD_PHOTO_TO_FAVOURITE,
  payload,
});

export const unlikePhotoAction = (payload) => ({
  type: actionTypes.REMOVE_PHOTO_FROM_FAVOURITE,
  payload,
});
