import React, { useState } from "react";
import "../styles/AuthenticationModal.css";

// AuthenticationModal component handles UNO student email verification
// Props:
// - onClose: Function to close the modal
// - onVerification: Function to handle successful verification
export default function AuthenticationModal({ onClose, onVerification }) {
  /* Starting state of form: Empty */
  // State for email input
  const [email, setEmail] = useState("");
  // State for verification code input
  const [verificationCode, setVerificationCode] = useState("");
  // State to track current step (email input or verification code input)
  const [step, setStep] = useState("email");

  // Handler for email input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handler for verification code input changes
  /* Upon state change, save new value to email */
  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  // Handler for email form submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("Sending verification code to:", email);
    // TODO: Add logic to send verification code here
    setStep("verification"); // Move to verification code step
  };

  // Handler for verification code form submission
  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    console.log("Verifying code:", verificationCode);
    // TODO: Add logic to verify the code here
    const username = email.split("@")[0]; // Extract username from email
    onVerification(username); // Pass username to parent component
    if (onClose) {
      onClose(); // Close modal after successful verification
    }
  };

  return ( /* HTML time! */
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">UNO Student Access</h2>
        {/* Conditional rendering based on current step */}
        {step === "email" ? (
          // Email input step
          <>
            <p className="modal-description">Sign in with your UNO email</p>
            <form onSubmit={handleEmailSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
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
          </>
        ) : (
          // Verification code input step
          <>
            <p className="modal-description">
              Enter the verification code sent to your email
            </p>
            <form onSubmit={handleVerificationSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="verificationCode" className="form-label">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={handleVerificationCodeChange}
                  placeholder="Enter 6-digit code"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Verify
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStep("email")}
                >
                  Back
                </button>
              </div>
            </form>
          </>
        )}
        <p className="modal-footer">
          Only for University of Nebraska Omaha students
        </p>
      </div>
    </div>
  );
}
