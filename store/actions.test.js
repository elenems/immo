import * as actions from './actions';

describe('Actions', () => {
  it('Logout returns correct action', () => {
    expect(actions.logoutAction()).toEqual({
      type: actions.actionTypes.LOG_OUT,
    });
  });

  it('Join returns correct action', () => {
    expect(actions.joinAction({})).toEqual({
      type: actions.actionTypes.JOIN,
      payload: {},
    });
  });

  it('Login returns correct action', () => {
    expect(actions.loginAction({})).toEqual({
      type: actions.actionTypes.LOG_IN,
      payload: {},
    });
  });

  it('Authenticate returns correct action', () => {
    expect(actions.authenticateAction()).toEqual({
      type: actions.actionTypes.AUTHENTICATE,
    });
  });

  it('Show card returns correct action', () => {
    expect(actions.showCardAction({})).toEqual({
      type: actions.actionTypes.SHOW_CARD,
      payload: {},
    });
  });

  it('Hide card returns correct action', () => {
    expect(actions.hideCardAction()).toEqual({
      type: actions.actionTypes.HIDE_CARD,
    });
  });

  it('Get user returns correct action', () => {
    expect(actions.getUserAction({})).toEqual({
      type: actions.actionTypes.GET_USER,
      payload: {},
    });
  });

  it('Like photo returns correct action', () => {
    expect(actions.likePhotoAction({})).toEqual({
      type: actions.actionTypes.ADD_PHOTO_TO_FAVOURITE,
      payload: {},
    });
  });

  it('Unlike photo returns correct action', () => {
    expect(actions.unlikePhotoAction({})).toEqual({
      type: actions.actionTypes.REMOVE_PHOTO_FROM_FAVOURITE,
      payload: {},
    });
  });

  it('Load photo returns correct action', () => {
    expect(actions.loadAction({})).toEqual({
      type: actions.actionTypes.LOAD_PHOTO,
      payload: {},
    });
  });
});
