import React from "react";

/* Take title given to resource, description of resource, and link to resource and makes it look presentable */
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
