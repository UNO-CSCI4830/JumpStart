import React from "react";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search resources..."
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default SearchBar;
