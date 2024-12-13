import React from "react";

/* returns a JSX table element */
function AdviceTable({ advice, onStatusChange, onEdit }) {
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
/* export function table to be referenced in AdminDashboardPage */
export default AdviceTable;
