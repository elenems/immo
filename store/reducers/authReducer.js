import { actionTypes as T } from '../actions';

const initState = {
  joinErrors: {},
  isAuthenticated: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case T.JOIN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case T.LOG_IN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case T.AUTHENTICATE: return { ...state, isAuthenticated: true };
    case T.LOG_OUT:
      return { ...state, isAuthenticated: false };
    default:
      return { ...state };
  }
};
