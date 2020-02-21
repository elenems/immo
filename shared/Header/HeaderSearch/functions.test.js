import React from 'react';
import fetch from 'unfetch';
import { fetchPhotos, useDebounce, useFetchPhotosOnTyping } from './functions';

jest.mock('unfetch');
jest.useFakeTimers();

describe('Search panel functions', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const spy = jest.spyOn(React, 'useEffect').mockImplementation((fn) => fn());

  it('Fetches photos with passed tag', async () => {
    const fetchedPhotos = [{ id: 1, name: 'Cat', tags: ['cat'] }];
    fetch.mockResolvedValueOnce({
      json() {
        return fetchedPhotos;
      },
    });
    const display = jest.fn();
    const setSearchResults = jest.fn();
    await fetchPhotos('Cat', display, setSearchResults);
    expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API}/getPhotosByTag?tag=Cat`);
    expect(display).toHaveBeenCalledWith('block');
    expect(setSearchResults).toHaveBeenCalledWith(fetchedPhotos);
  });

  it('Set error on failed fetch', async () => {
    fetch.mockResolvedValueOnce({
      json() {
        return { error: 'Some error' };
      },
    });
    const setSearchError = jest.fn();
    await fetchPhotos('Cat', null, null, setSearchError);
    expect(setSearchError).toHaveBeenCalledWith('Some error');
  });

  it('Debounces', () => {
    jest.useFakeTimers();
    const setIsUserTyping = jest.fn();
    useDebounce('searchText', setIsUserTyping, 100);
    expect(setIsUserTyping).toHaveBeenCalledWith(true);
    jest.runAllTimers();
    expect(setIsUserTyping).toHaveBeenCalledWith(false);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
