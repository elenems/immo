/* eslint-disable no-unused-vars */
import { render } from '@testing-library/react';
import {
  toBeInTheDocument,
  toHaveAttribute,
  toHaveTextContent,
} from '@testing-library/jest-dom';
import { getByText } from '@testing-library/dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import HeaderButtons from './index';
import rootReducer from '../../../store/reducers/rootReducer';

describe('SearchResults', () => {
  const store = createStore(rootReducer, {});
  it('Renders component', () => {
    render(
      <Provider store={store}>
        <HeaderButtons />
      </Provider>,
    );
  });
  it('Shows link to join', () => {
    const { container } = render(
      <Provider store={store}>
        <HeaderButtons />
      </Provider>,
    );
    const link = getByText(container, /join/i);
    expect(link).toHaveAttribute('href', '/join');
    expect(link).toHaveAttribute('title', 'Join Immo');
    expect(link).toHaveTextContent('Join');
  });

  it('Shows link for profile', () => {
    const storeWithAuth = createStore(() => ({
      auth: { isAuthenticated: true },
    }));
    const { container } = render(
      <Provider store={storeWithAuth}>
        <HeaderButtons isAuthenticated />
      </Provider>,
    );
    const link = getByText(container, /profile/i);
    const controls = container.querySelector('.header-controls');
    expect(link).toHaveAttribute('href', '/profile');
    expect(link).toHaveAttribute('title', 'Profile');
    expect(link).toHaveTextContent('Profile');
    expect(controls).toHaveStyle('min-width: 135px');
  });
});
