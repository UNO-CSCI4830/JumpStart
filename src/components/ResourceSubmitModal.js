import React, { useState } from "react";

export default function ResourceSubmitModal({ onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    description: "",
    category: "",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Submit a New Resource</h2>
        <p>
          Share a valuable resource with your fellow students. Please provide
          accurate information.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Resource Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="link">Resource Link</label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Academic Support">Academic Support</option>
              <option value="Career Development">Career Development</option>
              <option value="Health and Wellness">Health and Wellness</option>
              <option value="Financial Aid">Financial Aid</option>
              <option value="Student Life">Student Life</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

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
}
