import { put } from 'redux-saga/effects';
import handleCardDisplay from './uiSagas';

describe('uiSagas', () => {
  it('Handles card display', () => {
    const gen = handleCardDisplay('text', 'type');
    expect(gen.next().value).toEqual(
      put({
        type: 'SHOW_CARD',
        payload: { text: 'text', type: 'type' },
      }),
    );
    gen.next();
    expect(gen.next().value).toEqual(put({ type: 'HIDE_CARD' }));
    expect(gen.next().done).toBe(true);
  });
});
