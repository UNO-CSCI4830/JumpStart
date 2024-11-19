import React from "react";
import ResourceCard from "./ResourceCard";

// ResourceList component to display a list of resources
// Props:
// - resources: Array of resource objects to be displayed
const ResourceList = ({ resources }) => {
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
