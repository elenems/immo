import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// eslint-disable-next-line no-unused-vars
import { toHaveAttribute } from '@testing-library/jest-dom';
import HeaderButton from './index';
import { dispatchShowCard } from '../../utils';
import * as Actions from '../../store/actions';

jest.mock('../../utils');
const like = jest.spyOn(Actions, 'likePhotoAction');
const unlike = jest.spyOn(Actions, 'unlikePhotoAction');

afterAll(() => {
  jest.clearAllMocks();
});

describe('HeartButton', () => {
  const reducer = (auth, favourites, userId = '') => ({
    auth: {
      user: {
        favourites,
        id: userId,
      },
      isAuthenticated: auth,
    },
    ui: {
      isInProcess: false,
    },
  });

  it('Renders with like title', () => {
    const store = createStore(() => reducer(false, {}));
    const { container } = render(
      <Provider store={store}>
        <HeaderButton id="1" />
      </Provider>,
    );
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('title', 'Like');
  });

  it('Renders with unlike title', () => {
    const store = createStore(() => reducer(true, { id: 'photoId' }));
    const { container } = render(
      <Provider store={store}>
        <HeaderButton id="id" />
      </Provider>,
    );
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('title', 'Unlike');
  });

  it('Dispatches card to sing in', () => {
    const store = createStore(() => reducer(false, { id: 'photoId' }));
    const { container } = render(
      <Provider store={store}>
        <HeaderButton id="id" />
      </Provider>,
    );
    const button = container.querySelector('button');
    fireEvent.click(button);
    expect(dispatchShowCard).toHaveBeenCalledTimes(1);
    expect(dispatchShowCard.mock.calls[0][2]).toBe('Sign in to like');
  });

  it('Dispatches like photo', () => {
    const store = createStore(() => reducer(true, {}, 'userId'));
    const { container } = render(
      <Provider store={store}>
        <HeaderButton id="id" />
      </Provider>,
    );
    const button = container.querySelector('button');
    fireEvent.click(button);
    expect(like).toHaveBeenCalledWith({ photoId: 'id', userId: 'userId' });
  });

  it('Dispatches unlike photo', async () => {
    const store = createStore(() => reducer(true, { id: 'asd' }, 'userId'));
    const { container } = render(
      <Provider store={store}>
        <HeaderButton id="id" />
      </Provider>,
    );
    const button = container.querySelector('button');
    fireEvent.click(button);
    expect(unlike).toHaveBeenCalledWith({ photoId: 'id', userId: 'userId' });
  });
});
