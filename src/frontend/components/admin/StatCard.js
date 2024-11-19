import React from "react";

// StatCard component to display a statistic
function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
}

export default StatCard;
