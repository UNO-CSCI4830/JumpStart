import React from "react";

function ResourceTable({ resources, onStatusChange, onEdit }) {
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
              <button
                className="btn btn-outline"
                onClick={() => onStatusChange(resource.id, "approved")}
                disabled={resource.status === "approved"}
              >
                Approve
              </button>
              <button
                className="btn btn-outline"
                onClick={() => onStatusChange(resource.id, "rejected")}
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
