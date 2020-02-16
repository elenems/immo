import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function SearchResults({ searchResults, error, isUserTyping }) {
  const progress = isUserTyping ? (
    <span style={{ display: 'block', textAlign: 'center' }}>
      <img src="/svg/three-dots.svg" alt="Loading..." />
    </span>
  ) : (
    <span className="appear">No results</span>
  );
  return (
    <div>
      {searchResults.length ? (
        <ul>
          {searchResults.map((searchResult) => (
            <li className="search-result" key={searchResult.id}>
              <Link href="/photo/[id]" as={`/photo/${searchResult.id}`}>
                <div>
                  <img src={searchResult.url} alt={searchResult.name} />
                  <span>{searchResult.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>{error ? <span className="appear">{error}</span> : progress}</p>
      )}
      <style jsx>
        {`
          img {
            width: 50px;
            jeight: 50px;
          }

          p {
            margin-top: 10px;
          }

          .search-result {
            padding-bottom: 10px;
            padding-right: 20px;
          }

          li > div {
            display: flex;
            align-items: center;
            cursor: pointer;
          }

          span {
            margin-left: 8px;
          }

          span:hover {
            color: black;
          }
        `}
      </style>
    </div>
  );
}

SearchResults.propTypes = {
  searchResults: PropTypes.array,
  error: PropTypes.string,
  isUserTyping: PropTypes.bool.isRequired,
};

SearchResults.defaultProps = {
  searchResults: [],
  error: '',
};

export default SearchResults;
