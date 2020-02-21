/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
  toBeInTheDocument,
  toHaveTextContent,
} from '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Tag from './index';
import rootReducer from '../../store/reducers/rootReducer';

describe('Tag', () => {
  const store = createStore(rootReducer);
  it('Renders', () => {
    const { container } = render(
      <Provider store={store}>
        <Tag text="Some text" />
      </Provider>,
    );
    fireEvent.click(container.querySelector('button'));
  });
  it('Clicks', () => {
    const fn = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <Tag text="Some text" clickHandler={fn} />
      </Provider>,
    );
    const button = container.querySelector('button');
    fireEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
