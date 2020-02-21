import React from 'react';
import { render } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import BottomWall from './index';
import rootReducer from '../../../../store/reducers/rootReducer';

describe('BottomWall', () => {
  const store = createStore(rootReducer);
  it('Renders', () => {
    render(
      <Provider store={store}>
        <BottomWall tags={[]} photoId="0" views={0} />
      </Provider>,
    );
  });

  it('Hides views if views > 999', () => {
    render(
      <Provider store={store}>
        <BottomWall tags={[]} photoId="0" views={1000} />
      </Provider>,
    );
    const views = document.querySelector('.views');
    expect(views).not.toBeInTheDocument();
  });
});
