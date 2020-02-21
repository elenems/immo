import { render } from '@testing-library/react';
import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../store/reducers/rootReducer';
import Index from './index';

jest.mock('isomorphic-unfetch');
fetch.mockReturnValueOnce({
  json() {
    return [];
  },
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('Main page', () => {
  const store = createStore(rootReducer);

  it('Returns photos', async () => {
    render(
      <Provider store={store}>
        <Index />
      </Provider>,
    );
    const data = await Index.getInitialProps();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API}/getPhotos`,
    );
    expect(data).toEqual({ photos: [] });
  });
});
