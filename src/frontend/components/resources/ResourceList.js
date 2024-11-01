import React from "react";
import ResourceCard from "../resources/ResourceCard";

const ResourceList = ({ resources }) => {
  return (
    <div className="resources">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          title={resource.title}
          description={resource.description}
          link={resource.link}
        />
      ))}
    </div>
  );
};

export default ResourceList;
