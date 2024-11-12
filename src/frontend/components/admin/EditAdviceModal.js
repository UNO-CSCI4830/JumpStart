import React, { useState } from "react";

function EditAdviceModal({ advice, onSave, onClose }) {
  const [editedAdvice, setEditedAdvice] = useState(advice);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAdvice((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setEditedAdvice((prev) => ({ ...prev, tags }));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Advice</h2>
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
