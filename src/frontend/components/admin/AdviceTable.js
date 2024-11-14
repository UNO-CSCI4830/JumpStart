import React from "react";

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
