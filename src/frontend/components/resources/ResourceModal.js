import React from "react";

// ResourceModal component for submitting new resources
// Props:
// - isOpen: Boolean to control modal visibility
// - onClose: Function to close the modal
// - onSubmit: Function to handle form submission
// - newResource: Object containing new resource data
// - handleInputChange: Function to handle input changes
// - categories: Array of available resource categories
const ResourceModal = ({
  isOpen,
  onClose,
  onSubmit,
  newResource,
  handleInputChange,
  categories = [],
}) => {
  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Submit a New Resource</h2>
        <p>
          Share a valuable resource with your fellow students. Please provide
          accurate information.
        </p>
        <form onSubmit={onSubmit}>
          {/* Email input field */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newResource.email}
              onChange={handleInputChange}
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
              value={newResource.title}
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
              value={newResource.description}
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
              value={newResource.link}
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
              value={newResource.category}
              onChange={handleInputChange}
              required
            >
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
              onClick={onClose}
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
