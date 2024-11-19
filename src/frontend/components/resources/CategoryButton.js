import React from "react";

// CategoryButton component for filtering resources by category
// Props:
// - category: String representing the category name
// - isActive: Boolean indicating if the category is currently selected
// - onClick: Function to handle button click
const CategoryButton = ({ category, isActive, onClick }) => {
  return (
    <button
      className={`category-btn ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {category}
    </button>
  );
};

export default CategoryButton;
