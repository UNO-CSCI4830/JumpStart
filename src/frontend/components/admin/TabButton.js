import React from "react";

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
