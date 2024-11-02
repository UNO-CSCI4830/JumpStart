import React from "react";

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
