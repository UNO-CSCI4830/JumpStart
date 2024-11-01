import React from "react";

export default function ResourceCard({ title, description, link }) {
  return (
    <div className="resource-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="learn-more-btn"
      >
        Learn More
      </a>
    </div>
  );
}
