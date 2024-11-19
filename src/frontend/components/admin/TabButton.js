import React from "react";

// TabButton component for navigation tabs
function TabButton({ label, isActive, onClick }) {
  return (
    <button
      className={`tab-button ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default TabButton;
