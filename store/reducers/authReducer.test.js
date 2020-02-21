import authReducer from './authReducer';

const initState = {
  joinErrors: {},
  isAuthenticated: false,
  user: {
    favourites: {},
  },
};

describe('authReducer', () => {
  it('JOIN_SUCCESS', () => {
    const action = { type: 'JOIN_SUCCESS' };
    const returnedState = authReducer(initState, action);
    expect(returnedState).toEqual({
      ...initState,
      isAuthenticated: true,
    });
  });

  it('LOG_IN_SUCCESS', () => {
    const action = { type: 'LOG_IN_SUCCESS' };
    const returnedState = authReducer(initState, action);
    expect(returnedState).toEqual({
      ...initState,
      isAuthenticated: true,
    });
  });

  it('AUTHENTICATE', () => {
    const user = { name: 'Bob' };
    const action = { type: 'AUTHENTICATE', payload: user };
    const returnedState = authReducer(initState, action);
    expect(returnedState).toEqual({
      ...initState,
      isAuthenticated: true,
      user,
    });
  });

  it('LOG_OUT_SUCCESS', () => {
    const action = { type: 'LOG_OUT_SUCCESS' };
    const returnedState = authReducer(initState, action);
    expect(returnedState).toEqual({
      ...initState,
    });
  });

  it('LOG_OUT_FAIL', () => {
    const action = { type: 'LOG_OUT_FAIL' };
    const returnedState = authReducer(initState, action);
    expect(returnedState).toEqual({
      ...initState,
    });
  });

  it('ADD_PHOTO_TO_FAVOURITE_SUCCESS', () => {
    const action = { type: 'ADD_PHOTO_TO_FAVOURITE_SUCCESS', payload: '1' };
    const returnedState = authReducer(initState, action);
    expect(returnedState).toEqual({
      ...initState,
      user: { ...initState.user, favourites: { 1: '1' } },
    });
  });

  it('REMOVE_PHOTO_FROM_FAVOURITE_SUCCESS', () => {
    const action = {
      type: 'REMOVE_PHOTO_FROM_FAVOURITE_SUCCESS',
      payload: '1',
    };
    const returnedState = authReducer(
      { ...initState, user: { favourites: { 1: '1' } } },
      action,
    );
    expect(returnedState).toEqual({
      ...initState,
    });
  });
});
