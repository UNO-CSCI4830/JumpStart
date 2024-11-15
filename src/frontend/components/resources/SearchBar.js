import React from "react";

/* object that constructs SearchBar and gives it behavior */
const SearchBar = ({ searchTerm, onSearchChange }) => {
/*
 * @ properties
 * searchTerm: state variable to be assigned when user inputs string
 * onSearchChange: function determining behavior when input form has changed
 */
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
