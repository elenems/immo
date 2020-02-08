export const actionTypes = {
  LOG_IN: 'LOG_IN',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_OUT: 'LOG_OUT',
  JOIN: 'JOIN',
  JOIN_SUCCESS: 'JOIN_SUCCESS',
};

export const logoutUserAction = () => ({ type: actionTypes.LOG_OUT });
export const joinAction = (payload) => ({ type: actionTypes.JOIN, payload });
export const loginAction = (payload) => ({ type: actionTypes.LOG_IN, payload });
