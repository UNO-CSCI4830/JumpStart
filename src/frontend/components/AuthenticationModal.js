import React, { useState } from "react";
import "../styles/AuthenticationModal.css";

export default function AuthenticationModal({ onClose }) {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending verification code to:", email);
    // Add logic to send verification code here
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">UNO Student Access</h2>
        <p className="modal-description">Sign in with your UNO email</p>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="your.name@unomaha.edu"
              required
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Send Verification Code
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
        <p className="modal-footer">
          Only for University of Nebraska Omaha students
        </p>
      </div>
    </div>
  );
}
