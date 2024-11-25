import React from "react";

/* Take title given to resource, description of resource, and link to resource and makes it look presentable */
const ResourceCard = ({ resource }) => {
  /*
   * @ properties
   * resource: document that will be formatted for display
   */
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
