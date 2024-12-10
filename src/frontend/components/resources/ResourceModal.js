import React from "react";

/* Behavior is similar to AdviceShareModal */
/* TODO: append submission time */
/* TODO: Submit data to DB */
const ResourceModal = ({
  isOpen,
  onClose,
  onSubmit,
  submission,
  handleInputChange,
  categories = [],
}) => {
  /*
   * @ properties
   * isOpen: boolean determining form state
   * onClose: function determining form behavior when closed
   * onSubmit: function determining form behavior when submit button is clicked
   * submission: resource object to be updated with contents of form
   * handleInputChange: function determining form behavior when form inputs change
   * categories: Array of categories for user to choose from
   */
  if (!isOpen) return null;

  return (
    /* HTML time */
    <div className="modal">
      <div className="modal-content">
        <h2>Submit a New Resource</h2>
        <p>
          Share a valuable resource with your fellow students. Please provide
          accurate information.
        </p>
        {/* Submission form! */}
        <form onSubmit={onSubmit}>
          {" "}
          {/* calls onSubmit */}
          <div className="form-group">
            <label htmlFor="uploader">Email:</label>
            <input
              type="uploader"
              id="uploader"
              name="uploader"
              value={submission.uploader} /* assigns value to a property of 
              submission */
              onChange={handleInputChange} /* calls handleInputChange */
              required
            />
          </div>
          {/* Resource title input field */}
          <div className="form-group">
            <label htmlFor="title">Resource Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={submission.title}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Resource description textarea */}
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={submission.description}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Resource link input field */}
          <div className="form-group">
            <label htmlFor="link">Resource Link:</label>
            <input
              type="url"
              id="link"
              name="link"
              value={submission.link}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Category selection dropdown */}
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={submission.category}
              onChange={handleInputChange}
              required
            >
              {/* array map to provide category options for users */}
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {/* Form action buttons */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Submit Resource
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose} /* call onClose */
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceModal;
