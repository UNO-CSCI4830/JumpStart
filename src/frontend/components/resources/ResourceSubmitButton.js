import React from "react";

const SubmitButton = ({ onClick }) => {
  return (
    <button className="submit-resource-btn" onClick={onClick}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
      Submit a Resource
    </button>
  );
};

export default SubmitButton;
