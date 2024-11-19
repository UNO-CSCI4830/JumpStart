import React from "react";

// ResourceCard component displays individual resource information
// Props:
// - resource: Object containing resource details (title, description, link)
const ResourceCard = ({ resource }) => {
  return (
    <div className="resource-card">
      {/* Resource title */}
      <h2>{resource.title}</h2>
      {/* Resource description */}
      <p>{resource.description}</p>
      {/* Link to the resource */}
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
