import { useEffect } from 'react';
import fetch from 'unfetch';

const { REACT_APP_API } = process.env;

export const fetchPhotos = async (
  searchText,
  setDisplay,
  setSearchResults,
  setSearchError,
) => {
  const data = await fetch(`${REACT_APP_API}/getPhotosByTag?tag=${searchText}`);
  const fetchedSearchResults = await data.json();
  if (Array.isArray(fetchedSearchResults)) {
    setDisplay('block');
    setSearchResults(fetchedSearchResults);
  } else {
    setSearchError(fetchedSearchResults.error);
  }
};

export const useDebounce = (searchText, setIsUserTyping, time) => {
  useEffect(() => {
    if (searchText) {
      setIsUserTyping(true);
      setTimeout(() => {
        setIsUserTyping(false);
      }, time);
    }
  }, [searchText, setIsUserTyping, time]);
};

export const useFetchPhotosOnTyping = (
  searchText,
  isUserTyping,
  call,
  setDisplay,
) => {
  useEffect(() => {
    if (searchText) {
      if (!isUserTyping) {
        call();
      }
    } else {
      setDisplay('none');
    }
  }, [searchText, isUserTyping, call, setDisplay]);
};
