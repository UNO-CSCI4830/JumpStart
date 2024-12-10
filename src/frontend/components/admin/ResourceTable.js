import React from "react";

/* Calls table to display Resource data. Looks equivelant to AdviceTable */
function ResourceTable({ resources, onStatusChange, onEdit }) {
  /*
   * @ properties
   * advice: array of entries (data) to be mapped to JSX elements
   * onStatuSchange: function that updates advice element data(?)
   * onEdit: function that will allow admins to change entry data
   */
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Uploader</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Map through resources and render each as a table row */}
        {resources.map((resource) => (
          <tr
            key={resource.id}
            className={
              resource.status === "approved"
                ? "approved-row"
                : resource.status === "rejected"
                ? "rejected-row"
                : ""
            }
          >
            <td>{resource.title}</td>
            <td>{resource.category}</td>
            <td>{resource.uploader}</td>
            <td>{resource.status}</td>
            <td>
              {/* Action buttons for each resource */}
              <button
                className="btn btn-outline"
                onClick={() => onStatusChange(resource._id, "approved")}
                disabled={resource.status === "approved"}
              >
                Approve
              </button>
              <button
                className="btn btn-outline"
                onClick={() => onStatusChange(resource._id, "rejected")}
                disabled={resource.status === "rejected"}
              >
                Reject
              </button>
              <button
                className="btn btn-outline"
                onClick={() => onEdit(resource)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResourceTable;
