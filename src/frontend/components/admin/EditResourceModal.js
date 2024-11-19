import React, { useState } from "react";

const categories = [
  "Academic",
  "Financial Aid",
  "Career",
  "Health",
  "Social",
  "Student Submission",
];

// EditResourceModal component for editing resource details
function EditResourceModal({ resource, onSave, onClose }) {
  // State to hold the edited resource data
  const [editedResource, setEditedResource] = useState(resource);

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedResource((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Resource</h2>
        {/* Form fields for editing resource details */}
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={editedResource.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={editedResource.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Resource Link:
          <input
            type="text"
            name="link"
            value={editedResource.link}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <select
            name="category"
            value={editedResource.category}
            onChange={handleChange}
          >
            {/* Render options for each category */}
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        {/* Action buttons */}
        <div class="form-actions">
          <button class="btn-save" onClick={() => onSave(editedResource)}>
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

export default EditResourceModal;
