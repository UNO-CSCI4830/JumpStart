import React from "react";

/* Div element displaying metrics of pending entries */
function StatCard({ title, value }) {
    /*
     * @ properties
     * title: description as a string
     * value: integer representing pending entries
     */
    // such modular, much nice
  return (
    <div className="stat-card">
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
}

export default StatCard;
