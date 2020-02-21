/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { render, getByAltText } from '@testing-library/react';
import {
  toBeInTheDocument,
  toHaveAttribute,
  toHaveStyle,
  toBeVisible,
  toHaveTextContent,
} from '@testing-library/jest-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SearchResults from './index';

import rootReducer from '../../../../../store/reducers/rootReducer';

describe('SearchResults', () => {
  const store = createStore(rootReducer, {});
  it('Renders component', () => {
    render(
      <Provider store={store}>
        <SearchResults isUserTyping={false} />
      </Provider>,
    );
  });
  it('Displays loading when user is typing', () => {
    const { container } = render(
      <Provider store={store}>
        <SearchResults isUserTyping />
      </Provider>,
    );
    const loading = getByAltText(container, /loading/i);
    expect(loading).toBeVisible();
  });

  it('Shows error', () => {
    render(
      <Provider store={store}>
        <SearchResults error="Some error" isUserTyping={false} />
      </Provider>,
    );
    const errorElement = document.querySelector('.appear');
    expect(errorElement).toHaveTextContent('Some error');
  });

  it('Renders search results', () => {
    const searchResults = [{ id: 0, name: 'Bird', url: 'urlforbird' }];
    render(
      <Provider store={store}>
        <SearchResults searchResults={searchResults} isUserTyping={false} />
      </Provider>,
    );
    const renderedElement = document.querySelector('.search-result');
    const renderedImg = document.querySelector('.search-result img');
    const renderedText = document.querySelector('.search-result span');
    expect(renderedElement).toBeInTheDocument();
    expect(renderedImg).toHaveAttribute('alt', 'Bird');
    expect(renderedImg).toHaveAttribute('src', 'urlforbird');
    expect(renderedText).toHaveTextContent('Bird');
  });
});
