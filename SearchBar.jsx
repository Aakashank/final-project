import React from 'react';

const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search by product name..."
    value={value}
    onChange={e => onChange(e.target.value)}
    className="search-bar"
  />
);

export default SearchBar;
