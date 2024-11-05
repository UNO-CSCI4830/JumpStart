import React, { useState } from "react";
import "../../styles/ResourcePage.css";
import ResourceSearch from "../resources/ResourceSearch";
import ResourceCategories from "../resources/ResourceCategories";
import ResourceCard from "../resources/ResourceCard";
import ResourceSubmitModal from "../resources/ResourceSubmitModal";
import { initialResources } from "../../utils/resources";

export default function ResourcePage() {
  const [activeCategory, setActiveCategory] = useState("Academic");
  const [searchTerm, setSearchTerm] = useState("");
  const [resources] = useState(initialResources);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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

      <ResourceSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ResourceCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="resources">
        {filteredResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            title={resource.title}
            description={resource.description}
            link={resource.link}
          />
        ))}
      </div>
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
