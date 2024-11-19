import React from "react";

// SearchBar component for filtering resources
// Props:
// - searchTerm: String containing the current search term
// - onSearchChange: Function to handle changes in the search input
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container">
      {/* Search input field */}
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
