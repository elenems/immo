import React from 'react';
import { render } from '@testing-library/react';
import {
  toBeInTheDocument,
  toHaveTextContent,
} from '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Card from './index';
import rootReducer from '../../store/reducers/rootReducer';

describe('Card', () => {
  const store = createStore(rootReducer);
  it('Renders', () => {
    render(
      <Provider store={store}>
        <Card />
      </Provider>,
    );
  });

  it('Shows card with correct text', () => {
    const storeWithUi = createStore(() => ({
      ui: { text: 'Success operation', type: 'success' },
    }));
    render(
      <Provider store={storeWithUi}>
        <Card />
      </Provider>,
    );
    const card = document.querySelector('.card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveStyle('display: flex');
    expect(card).toHaveTextContent('Success operation');
  });
});
