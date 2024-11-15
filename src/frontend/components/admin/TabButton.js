import React from "react";

/* button that allows us to toggle between different entry types */
function TabButton({ label, isActive, onClick }) {
/*
 * @ properties
 * label: string for description
 * isActive: boolean that helps CSS formatting (?)
 * onClick: function that is activated on button event
 */
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
