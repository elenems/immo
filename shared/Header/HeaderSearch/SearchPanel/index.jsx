import React from 'react';
import PropTypes from 'prop-types';
import SearchResults from './SearchResults/index';
import TagsList from './TagsList/index';

function SearchPanel({
  searchResults,
  searchError,
  display,
  setSearchText,
}) {
  return (
    <div className="search-panel">
      <SearchResults searchResults={searchResults} searchError={searchError} />
      <TagsList setSearchText={setSearchText} />
      <style jsx>
        {`
          z-index: 100;
          position: absolute;
          width: inherit;
          background: white;
          top: 40px;
          padding: 10px 10px;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          background: #f8f7f7;
          border: 1px solid #eae8e8;
          left: 0px;
          color: #777474;
          display: ${display};
        `}
      </style>
    </div>
  );
}

SearchPanel.propTypes = {
  searchResults: PropTypes.array.isRequired,
  searchError: PropTypes.string,
  display: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
};

SearchPanel.defaultProps = {
  searchError: '',
};

export default React.memo(SearchPanel);
