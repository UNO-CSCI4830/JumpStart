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
  handleInputChange,
  isVerified,
  role,
}) {
  const handleTagChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    handleInputChange({
      target: {
        name: "tags",
        value: selectedOptions,
      },
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Share Your Advice</h2>
        {/* Show form only if the user is verified and has a role of 'user' */}
        {isVerified && role === "user" ? (
          <form id="shareAdviceForm" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="uploader">Email:</label>
              <input
                type="text"
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
              <label htmlFor="anon">Post as:</label>
              <select
                id="anon"
                name="anon"
                value={submission.anon}
                onChange={handleInputChange}
              >
                <option value="anon">Anonymous</option>
                <option value="name">Name</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags:</label>
              <select
                id="tags"
                name="tags"
                multiple
                value={submission.tags}
                onChange={handleTagChange}
                className="tag-select"
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
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
        ) : (
          <div>
            <p>You must be verified to share advice.</p>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
