import React, { useState } from "react";

/* Launches form that presents advice data to be edited */
function EditAdviceModal({ advice, onSave, onClose }) {
  /*
   * @ properties
   * advice: entry
   * onSave: function that takes component's state variable, editedAdvice
   * onClose: function that handles exiting window. Guessing no persistent
   * changes are desired
   */
  /* state tuple for this component's advice data and updating said data, based
     off passed advice entry */
  const [editedAdvice, setEditedAdvice] = useState(advice);

  const handleChange = (e) => {
    const { name, value } = e.target; /* define event target name value pair */
    /* update previous data with new name: value pair */
    setEditedAdvice((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e) => {
    /* On event change for form, save values */
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
            onChange={handleChange} /* Call handleChange arrow func */
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
            onChange={handleTagsChange} /* call handleTagChange arrow func */
            placeholder="Enter tags separated by commas"
          />
        </label>
        {/* Action buttons */}
        <div class="form-actions">
          <button class="btn-save" onClick={() => onSave(editedAdvice)}>
            {/* button event calls onSave function with edited data arg */}
            {/* TODO: update existing entry data */}
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
