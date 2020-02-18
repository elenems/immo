import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import OutsideClickHandler from 'react-outside-click-handler';
import SearchPanel from './SearchPanel/index';
import { fetchPhotos, useDebounce, useFetchPhotosOnTyping } from './functions';

export default function HeaderSearch() {
  const [searchText, setSearchText] = useState('');
  const [display, setDisplay] = useState('none');
  const [searchError, setSearchError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isUserTyping, setIsUserTyping] = useState(true);

  const fetchSearch = React.useCallback(
    async () => fetchPhotos(searchText, setDisplay, setSearchResults, setSearchError),
    [searchText],
  );

  useDebounce(searchText, setIsUserTyping, 1200);
  useFetchPhotosOnTyping(searchText, isUserTyping, fetchSearch, setDisplay);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setDisplay('none');
      }}
    >
      <div className="header-search">
        <div className="search-field">
          <label className="hide-label-text" htmlFor="search-input">
            Enter a tag to load matched photos
            <input
              id="search-input"
              type="text"
              value={searchText}
              placeholder="Search for photos"
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => { setDisplay('block'); }}
            />
          </label>
          <button
            aria-label="Load search results"
            onClick={fetchSearch}
            type="button"
          >
            <MdSearch />
          </button>
        </div>
        <SearchPanel
          display={display}
          searchError={searchError}
          searchResults={searchResults}
          setSearchText={setSearchText}
          isUserTyping={isUserTyping && searchText.length > 0}
        />
        <style jsx>
          {`
            .header-search {
              position: relative;
              margin: 0px 20px;
              background-color: white;
              min-width: 200px;
              width: 50vw;
              max-width: 900px;
              padding: 6px;
              border-radius: 4px;
            }

            .search-field {
              justify-content: space-between;
              display: flex;
              align-items: center;
            }

            input {
              padding: 6px 4px;
              border: none;
              background: none;
              width: 100%;
              font-size: 16px;
            }

            button {
              padding: 0px 4px 0px 8px;
              font-size: 24px;
              border: none;
              border-left: 1px solid #bbbbbb;
              background: none;
              display: flex;
              cursor: pointer;
            }
          `}
        </style>
      </div>
    </OutsideClickHandler>
  );
}
