/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TagsList from './index';
import rootReducer from '../../../../../store/reducers/rootReducer';

describe('TagsList', () => {
  const store = createStore(rootReducer);
  it('Renders', () => {
    render(
      <Provider store={store}>
        <TagsList setSearchText={() => {}} />
      </Provider>,
    );
  });

  it('Sets search text', () => {
    const setSearchText = jest.fn();
    render(
      <Provider store={store}>
        <TagsList setSearchText={setSearchText} />
      </Provider>,
    );
    const button = document.querySelectorAll('.tag button')[0];
    fireEvent.click(button);
    const buttonsTag = button.textContent.slice(1);
    expect(setSearchText).toHaveBeenCalledTimes(1);
    expect(setSearchText).toHaveBeenCalledWith(buttonsTag);
  });
});
