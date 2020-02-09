export const actionTypes = {
  LOG_IN: 'LOG_IN',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_OUT: 'LOG_OUT',
  JOIN: 'JOIN',
  JOIN_SUCCESS: 'JOIN_SUCCESS',
  AUTHENTICATE: 'AUTHENTICATE',
  SHOW_CARD: 'SHOW_CARD',
  HIDE_CARD: 'HIDE_CARD',
};

export const logoutAction = () => {
  // eslint-disable-next-line no-undef
  sessionStorage.removeItem('token');
  return { type: actionTypes.LOG_OUT };
};
export const joinAction = (payload) => ({ type: actionTypes.JOIN, payload });
export const loginAction = (payload) => ({ type: actionTypes.LOG_IN, payload });
export const authenticateAction = () => ({ type: actionTypes.AUTHENTICATE });
export const showCardAction = (payload) => ({ type: actionTypes.SHOW_CARD, payload });
export const hideCardAction = () => ({ type: actionTypes.HIDE_CARD });
