import React, { useState } from "react";
import "../styles/AuthenticationModal.css";

export default function AuthenticationModal({ onClose, onVerification }) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState("email"); // Step 1: email input
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleVerificationCodeChange = (e) => setVerificationCode(e.target.value);

  // Handle email submit (send verification code)
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.endsWith("@unomaha.edu")) {
      alert("Please use a valid @unomaha.edu email address.");
      return;
    }
    setLoading(true);
<<<<<<< HEAD
    try { // TODO: Conver to Axios POST
      const response = await fetch("/api/send-verification-code", {
=======
    setErrorMessage(""); // Reset error message
    try { // TODO: Convert to Axios POST
      const response = await fetch("/api/register", {
>>>>>>> Yolvin
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      alert(result.message); // Success message
      setStep("verification"); // Move to verification step
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message); // Set error message
    } finally {
      setLoading(false);
    }
  };

  // Handle verification code submit
  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
<<<<<<< HEAD
    try { // TODO: Convert to Axios POST
=======
    setErrorMessage(""); // Reset error message
    try {
>>>>>>> Yolvin
      const response = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      alert(result.message);
      onVerification(email.split("@")[0]); // Pass the username to the parent component
      if (onClose) {
        onClose(); // Close the modal after successful verification
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">UNO Student Access</h2>
        {loading && <p className="loading-message">Processing...</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {step === "email" ? (
          <>
            <p className="modal-description">Sign in with your UNO email</p>
            <form onSubmit={handleEmailSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
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
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  Send Verification Code
                </button>
                <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className="modal-description">Enter the verification code sent to your email</p>
            <form onSubmit={handleVerificationSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="verificationCode" className="form-label">Verification Code</label>
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
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  Verify
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setStep("email")} disabled={loading}>
                  Back
                </button>
              </div>
            </form>
          </>
        )}
        <p className="modal-footer">Only for University of Nebraska Omaha students</p>
      </div>
    </div>
  );
}
