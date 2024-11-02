import React from "react";

const ResourceCard = ({ resource }) => {
  return (
    <div className="resource-card">
      <h2>{resource.title}</h2>
      <p>{resource.description}</p>
      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className="learn-more-btn"
      >
        Learn More
      </a>
    </div>
  );
};

export default ResourceCard;
