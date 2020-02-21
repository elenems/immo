/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { toHaveStyle } from '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PhotosGallery from './index';
import rootReducer from '../../store/reducers/rootReducer';

describe('PhotosGallery', () => {
  const store = createStore(rootReducer);
  it('Renders component', () => {
    render(
      <Provider store={store}>
        <PhotosGallery photos={[]} />
      </Provider>,
    );
  });

  it('Sets imageWidth', () => {
    render(
      <Provider store={store}>
        <PhotosGallery photos={[]} imageWidth={250} />
      </Provider>,
    );
    const container = document.querySelector('.photos-gallery');
    expect(container).toHaveStyle({
      'grid-template-columns': 'repeat( auto-fill, minmax(250px,1fr) )',
    });
  });

  it('Renders photo with correct props', () => {
    // eslint-disable-next-line object-curly-newline
    const photos = [{ id: '0', tags: ['cat'], photoId: '0', views: 0 }];
    render(
      <Provider store={store}>
        <PhotosGallery photos={photos} />
      </Provider>,
    );
    const photo = document.querySelector('.photo');
    const views = document.querySelector('.views span');
    const tags = document.querySelector('.bottom-wall-tags span');
    const tagsText = tags.textContent;
    expect(photo).toBeInTheDocument();
    expect(views).toHaveTextContent('0');
    expect(tags).toHaveTextContent(tagsText);
  });
});
