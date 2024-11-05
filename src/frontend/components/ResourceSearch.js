import React from "react";

export default function ResourceSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} /* updating passed searchTerm with setSearchTerm */
      />
    </div>
  );
}
