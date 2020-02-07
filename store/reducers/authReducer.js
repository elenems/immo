import { actionTypes as T } from '../actions';

const initState = {
  token: null,
  joinErrors: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case T.JOIN_SUCCESS:
      return { ...state, token: action.payload };
    case T.JOIN_FAIL:
      return { ...state, joinErrors: action.payload };
    default:
      return { ...state };
  }
};
