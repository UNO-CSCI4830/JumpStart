import React, { useState } from "react";
import "../styles/ResourcePage.css";
import ResourceSearch from "./ResourceSearch";
import ResourceCategories from "./ResourceCategories";
import ResourceCard from "./ResourceCard";
import ResourceSubmitModal from "./ResourceSubmitModal";
import {resourcePosts} from "../utils/resourcePosts";

/* JSON of Resource content */

export default function ResourcePage() {
  const [activeCategory, setActiveCategory] = useState("Academic");
  /* Here's searchTerm and setSearchTerm that are updated with ResrouceSearch component */
  const [searchTerm, setSearchTerm] = useState("");
  const [resources] = useState(resourcePosts);
  const [isModalOpen, setIsModalOpen] = useState(false); /* State of ResourceSubmitModal component, initially False */

  /* More behavior constants that are set to determine state on ResourceSubmitModal component */
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  /* Arrow function updating resources displayed based on searchTerm value */
  const filteredResources = resources.filter( 
    (resource) =>
      resource.category === activeCategory &&
      (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="resource-page">
      <h1>JumpStart</h1>
      <p className="subtitle">
        Explore our wide range of student resources to support
        <br />
        your academic and personal goals.
      </p>

      {/* Calling ResoruceSearch Component,  which does similar stuff to the arrow func filteredResources */}
      <ResourceSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ResourceCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="resources">
	{/* Display list of filteredResources with ResourceCard component */}
        {filteredResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            title={resource.title}
            description={resource.description}
            link={resource.link}
          />
        ))}
      </div>
      {/* Submit a Resource button that toggles ResourceSubmitModal state btwn T or F */}
      <button className="submit-resource-btn" onClick={handleOpenModal}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Submit a Resource
      </button>
      {isModalOpen && <ResourceSubmitModal onClose={handleCloseModal} />}
    </div>
  );
}

