import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Index from '../pages/index';
import rootReducer from '../store/reducers/rootReducer';

describe('Main page', () => {
  it('Renders', () => {
    const store = createStore(rootReducer, {});
    render(
      <Provider store={store}>
        <Index />
      </Provider>,
    );
  });
});
