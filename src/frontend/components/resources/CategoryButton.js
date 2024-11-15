import React from "react";

/* Button that toggles category that filters posts displayed */
const CategoryButton = ({ category, isActive, onClick }) => {
    /*
     * @ parameters
     * category: string representing our category
     * isActive: boolean stating if category is active to determine appropriate
     * CSS
     * onClick: function to page's category ours
     */
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
