import { actionTypes as T } from '../actions';

const initState = {
  joinErrors: {},
  isAuthenticated: false,
  user: {
    favourites: {},
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case T.JOIN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case T.LOG_IN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case T.AUTHENTICATE:
      return { ...state, isAuthenticated: true, user: action.payload };
    case T.LOG_OUT:
      return { ...initState };
    case T.ADD_PHOTO_TO_FAVOURITE_SUCCESS: {
      const newFavourites = { ...state.user.favourites, [action.payload]: action.payload };
      return { ...state, user: { ...state.user, favourites: newFavourites } };
    }
    case T.REMOVE_PHOTO_FROM_FAVOURITE_SUCCESS: {
      const newFavourites = { ...state.user.favourites };
      delete newFavourites[action.payload];
      return { ...state, user: { ...state.user, favourites: newFavourites } };
    }
    default:
      return { ...state };
  }
};
