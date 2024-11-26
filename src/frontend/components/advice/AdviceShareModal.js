import React, { useState } from "react";

const tags = [
  "Study tips",
  "Professors",
  "Housing & Dorm Life",
  "Financial Aid & Scholarships",
  "First-Year Experience",
  "Exam Preparation",
  "Career Advice",
  "Commuter Student Tips",
  "Study Abroad",
  "Alumni Insights",
  "Part-Time Jobs",
  "Internships",
  "Tech & Tools",
  "Off-Campus Life",
  "Networking",
];

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
            {/* Label for the tag selection dropdown */}
            <label htmlFor="tags">Tags:</label>
            <select
              id="tags"
              name="tags"
              multiple // Enables multiple tag selection
              value={formData.tags} // Controlled component - reflects current selected tags
              onChange={(e) => {
                // Convert HTMLOptionsCollection to array of selected tag values
                const selectedTags = Array.from(
                  e.target.selectedOptions, // Get all selected options
                  (option) => option.value // Extract just the value from each option
                );

                // Update form state with new array of selected tags
                setFormData((prev) => ({
                  ...prev, // Keep all other form data
                  tags: selectedTags, // Update only the tags array
                }));
              }}
              className="tag-select"
            >
              {/* Map each tag in our tags array to an option element */}
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>

            {/* Helper text to explain multiple selection functionality */}
            <small className="helper-text">
              Hold Ctrl (Cmd on Mac) to select multiple tags
            </small>
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
