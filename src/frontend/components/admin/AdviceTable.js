import React from "react";

// AdviceTable component to display a table of advice items
function AdviceTable({ advice, onStatusChange, onEdit }) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Tags</th>
          <th>Uploader</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Map through advice items and render each as a table row */}
        {advice.map((item) => (
          <tr
            key={item.id}
            className={
              item.status === "approved"
                ? "approved-row"
                : item.status === "rejected"
                ? "rejected-row"
                : ""
            }
          >
            <td>{item.title}</td>
            <td>{item.tags.join(", ")}</td>
            <td>{item.uploader}</td>
            <td>{item.status}</td>
            <td>
              {/* Action buttons for each advice item */}
              <button
                className="btn btn-outline"
                onClick={() => onStatusChange(item.id, "approved")}
                disabled={item.status === "approved"}
              >
                Approve
              </button>
              <button
                className="btn btn-outline"
                onClick={() => onStatusChange(item.id, "rejected")}
                disabled={item.status === "rejected"}
              >
                Reject
              </button>
              <button className="btn btn-outline" onClick={() => onEdit(item)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdviceTable;
