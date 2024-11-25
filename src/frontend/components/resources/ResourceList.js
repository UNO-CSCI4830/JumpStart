import React from "react";
import ResourceCard from "./ResourceCard";

/* Builds a list of ResourceCard Components by mapping array of document 
   objects */
const ResourceList = ({ resources }) => {
  /*
   * @ properties
   * resources: array of document objects to be mapped to its own ResourceCard
   */
  return (
    <div className="resources">
      {/* Map through resources and render a ResourceCard for each */}
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
};

export default ResourceList;
