import React from "react";

const categories = [
  "Academic",
  "Financial Aid",
  "Career",
  "Health",
  "Social",
  "Student Submitted",
];

export default function ResourceCategories({
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="categories">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-btn ${
            activeCategory === category ? "active" : ""
          }`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
