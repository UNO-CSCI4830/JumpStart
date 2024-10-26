import React from "react";

export default function ResourceCard({ title, description }) {
  return (
    <div className="resource-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="learn-more-btn">Learn More</button>
    </div>
  );
}
