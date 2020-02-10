import { actionTypes as T } from '../actions';

const initState = {
  text: '',
  type: '',
  isInProcess: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case T.SHOW_CARD:
      return {
        ...state,
        isInProcess: true,
        text: action.payload.text,
        type: action.payload.type,
      };
    case T.HIDE_CARD:
      return { ...initState, isInProcess: false };
    default:
      return { ...state };
  }
};
