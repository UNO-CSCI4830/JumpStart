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
      <thead> {/* Table header */}
        <tr> {/* (T)able (R)ow: labels for each column */}
          <th>Title</th>
          <th>Tags</th>
          <th>Uploader</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody> {/* contents of table */}
        {advice.map((item) => ( /* Map elements of property `advice` as table 
        row element */
          <tr /* table row */
            key={item.id}
            className={ /* changes CSS based off item's status (approved/rejected) */
              item.status === "approved"
                ? "approved-row"
                : item.status === "rejected"
                ? "rejected-row"
                : ""
            }
          >
            <td>{item.title}</td> {/* (t)able (d)ata */}
            <td>{item.tags.join(", ")}</td>
            <td>{item.uploader}</td>
            <td>{item.status}</td>
            <td> {/* buttons to accept, reject, or edit the contents of entry */}
              <button
                className="btn btn-outline"
                onClick={() => onStatusChange(item.id, "approved")}
                /* TODO: Save new state to DB */
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










