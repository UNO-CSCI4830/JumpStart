import React from "react";
import ResourceCard from "./ResourceCard";

const ResourceList = ({ resources }) => {
  return (
    <div className="resources">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
};

export default ResourceList;
