import React, { useState } from "react";

/* Launches submit form for the user to create a new entry */
export default function AdviceShareModal({ onClose }) {
  /*
   * @ properties
   * onClose: function to handle data when form closes
   */
  /* Starting state of fields in form */
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    postAs: "Anonymous",
    tags: [],
    advice: "",
  });

  /* Guessing handleChange stores the data provided by a user? */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; /* Field names for form */
    /* Determine which data to update */
    if (type === "checkbox") {
      /* type "checkbox", so update tags */
      setFormData((prev) => ({
        ...prev,
        tags: checked
          ? [...prev.tags, value]
          : prev.tags.filter((tag) => tag !== value),
      }));
    } else {
      /* They're not updating a tag */
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /* Upon form submission, handle data */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); /* !! Here we handle our new data !! */
    /* formData is an object! No need to create a new one!! */
    /* TODO: append submission time */
    /* TODO: SUBMIT NEW DATA TO DB */
    if (onClose) {
      onClose();
    }
  };

  return (
    /* HTML */
    <div className="modal">
      <div className="modal-content">
        <h2>Share Your Advice</h2>
        <form id="shareAdviceForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="postAs">Post as:</label>
            <select
              id="postAs"
              name="postAs"
              value={formData.postAs}
              onChange={handleChange}
            >
              <option value="Anonymous">Anonymous</option>
              <option value="Name">Name</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tags:</label>
            <div className="tag-container">
              <div>
                <input
                  type="checkbox"
                  id="studyTips"
                  name="tags"
                  value="Study tips"
                  onChange={handleChange}
                />
                <label htmlFor="studyTips" className="tag-label">
                  Study tips
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="timeManagement"
                  name="tags"
                  value="Time management"
                  onChange={handleChange}
                />
                <label htmlFor="timeManagement" className="tag-label">
                  Time management
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="examPrep"
                  name="tags"
                  value="Exam preparation"
                  onChange={handleChange}
                />
                <label htmlFor="examPrep" className="tag-label">
                  Exam preparation
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="careerAdvice"
                  name="tags"
                  value="Career advice"
                  onChange={handleChange}
                />
                <label htmlFor="careerAdvice" className="tag-label">
                  Career advice
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="campusLife"
                  name="tags"
                  value="Campus life"
                  onChange={handleChange}
                />
                <label htmlFor="campusLife" className="tag-label">
                  Campus life
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="advice">Your Advice:</label>
            <textarea
              id="advice"
              name="advice"
              value={formData.advice}
              onChange={handleChange}
              rows="6"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Submit Advice
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
      </div>
    </div>
  );
}
