import React, { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import fetch from 'unfetch';
import OutsideClickHandler from 'react-outside-click-handler';
import SearchPanel from './SearchPanel/index';

const { REACT_APP_API } = process.env;

export default function HeaderSearch() {
  const [searchText, setSearchText] = useState('');
  const [display, setDisplay] = useState('none');
  const [searchError, setSearchError] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchText) {
      fetch(`${REACT_APP_API}/getPhotosByTag?tag=${searchText}`)
        .then((data) => data.json())
        .then((fetchedSearchResults) => {
          if (Array.isArray(fetchedSearchResults)) {
            setDisplay('block');
            setSearchResults(fetchedSearchResults);
          } else {
            setSearchError(fetchedSearchResults.error);
          }
        });
    } else {
      setDisplay('none');
    }
  }, [searchText]);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setDisplay('none');
      }}
    >
      <div className="header-search">
        <div className="search-field">
          <input
            type="text"
            value={searchText}
            placeholder="Search for photos"
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => {
              setDisplay('block');
            }}
          />
          <button type="button">
            <MdSearch />
          </button>
        </div>
        <SearchPanel
          display={display}
          searchError={searchError}
          searchResults={searchResults}
          setSearchText={setSearchText}
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
