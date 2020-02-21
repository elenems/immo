import uiReducer from './uiReducer';

const initState = {
  text: '',
  type: '',
  isInProcess: false,
};

describe('uiReducer', () => {
  it('SHOW_CARD', () => {
    const action = {
      type: 'SHOW_CARD',
      payload: { text: 'Text', type: 'Suссess' },
    };
    const returnedState = uiReducer(initState, action);
    expect(returnedState).toEqual({
      isInProcess: true,
      text: 'Text',
      type: 'Suссess',
    });
  });

  it('HIDE_CARD', () => {
    const action = {
      type: 'HIDE_CARD',
    };
    const returnedState = uiReducer(initState, action);
    expect(returnedState).toEqual({
      ...initState,
      isInProcess: false,
    });
  });
});
