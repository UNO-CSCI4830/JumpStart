import React, { useState } from "react";

const categories = [
  "Academic",
  "Financial Aid",
  "Career",
  "Health",
  "Social",
  "Student Submission",
];

function EditResourceModal({ resource, onSave, onClose }) {
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
        <button onClick={() => onSave(editedResource)}>Save changes</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default EditResourceModal;
