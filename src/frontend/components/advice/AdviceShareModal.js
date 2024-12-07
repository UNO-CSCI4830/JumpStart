import React from "react";


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
export default function AdviceShareModal({ 
  onClose,
  onSubmit,
  submission,
  handleInputChange
}) {
  /*
   * @ properties
   * isOpen: boolean determining form state
   * onClose: function determining form behavior when closed
   * onSubmit: function determining form behavior when submit button is clicked
   * submission: resource object to be updated with contents of form
   * handleInputChange: function determining form behavior when form inputs change
   */
  /* Starting state of fields in form */

  return (
    /* HTML */
    <div className="modal">
      <div className="modal-content">
        <h2>Share Your Advice</h2>
        <form id="shareAdviceForm" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="uploader">Email:</label>
            <input
              type="uploader"
              id="uploader"
              name="uploader"
              value={submission.uploader}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Name:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={submission.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="postAs">Post as:</label>
            <select
              id="postAs"
              name="postAs"
              value={submission.postAs}
              onChange={handleInputChange}
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
              value={submission.tags} // Controlled component - reflects current selected tags
              onChange={handleInputChange}
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
            <label htmlFor="description">Your Advice:</label>
            <textarea
              id="description"
              name="description"
              value={submission.description}
              onChange={handleInputChange}
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
