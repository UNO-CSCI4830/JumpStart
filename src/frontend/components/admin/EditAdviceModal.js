import React, { useState } from "react";

// EditAdviceModal component for editing advice details
function EditAdviceModal({ advice, onSave, onClose }) {
  // State to hold the edited advice data
  const [editedAdvice, setEditedAdvice] = useState(advice);

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAdvice((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes in tags input
  const handleTagsChange = (e) => {
    // Split tags by comma and trim whitespace
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setEditedAdvice((prev) => ({ ...prev, tags }));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Advice</h2>
        {/* Form fields for editing advice details */}
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={editedAdvice.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={editedAdvice.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Tags:
          <input
            type="text"
            name="tags"
            value={editedAdvice.tags.join(", ")}
            onChange={handleTagsChange}
            placeholder="Enter tags separated by commas"
          />
        </label>
        {/* Action buttons */}
        <div class="form-actions">
          <button class="btn-save" onClick={() => onSave(editedAdvice)}>
            Save Changes
          </button>
          <button class="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditAdviceModal;
