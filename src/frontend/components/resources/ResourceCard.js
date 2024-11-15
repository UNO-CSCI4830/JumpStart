import React from "react";

/* Take title given to resource, description of resource, and link to resource and makes it look presentable */
const ResourceCard = ({ resource }) => {
/*
 * @ properties
 * resource: document that will be formatted for display
 */
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
