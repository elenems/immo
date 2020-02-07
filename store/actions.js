export const actionTypes = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
  JOIN: 'JOIN',
  JOIN_SUCCESS: 'JOIN_SUCCESS',
  JOIN_FAIL: 'JOIN_FAIL',
};

export const loginUserAction = () => ({ type: actionTypes.LOG_IN });
export const logoutUserAction = () => ({ type: actionTypes.LOG_OUT });
export const joinAction = (payload) => ({ type: actionTypes.JOIN, payload });
