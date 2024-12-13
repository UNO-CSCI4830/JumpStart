import React, { useState } from "react";

const categories = [
  /* Tags array */ "Academic",
  "Financial Aid",
  "Career",
  "Health",
  "Social",
  "Student Submission",
];

/* Launches form that presents resource data to be edited */
// looks like a lot is similar to EditAdviceModal
function EditResourceModal({ resource, onSave, onClose }) {
  /*
   * @ properties
   * advice: entry
   * onSave: function that takes component's state variable, editedAdvice
   * onClose: function that handles exiting window. Guessing no persistent
   * changes are desired
   */
  // state tuple
  const [editedResource, setEditedResource] = useState(resource);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedResource((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Resource</h2>
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
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <div className="form-actions">
          <button className="btn-save" onClick={() => onSave(editedResource)}>
            Save Changes
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditResourceModal;
