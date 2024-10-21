import React from "react";

export default function ShareAdviceModal() {
  return (
    <div id="shareAdviceModal" className="modal">
      <div className="modal-content">
        <h2>Share Your Advice</h2>
        <form id="shareAdviceForm">
          {/* Add form fields here */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Submit Advice
            </button>
            <button type="button" className="btn btn-secondary" id="cancelBtn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
