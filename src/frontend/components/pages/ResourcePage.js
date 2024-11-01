import React, { useState } from "react";
import "../../styles/ResourcePage.css";
import ResourceSearch from "../resources/ResourceSearch";
import ResourceCategories from "../resources/ResourceCategories";
<<<<<<< HEAD
import ResourceHeader from "../resources/ResourceHeader";
import ResourceList from "../resources/ResourceList";
import ResourceSubmitModal from "../resources/ResourceSubmitModal";
import SubmitButton from "../resources/ResourceSubmitButton";
=======
import ResourceCard from "../resources/ResourceCard";
import ResourceSubmitModal from "../resources/ResourceSubmitModal";
>>>>>>> e69af340451c6e97daef36bbaaca9c43e9cafce1
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
<<<<<<< HEAD
      <ResourceHeader />
=======
      <h1>JumpStart</h1>
      <p className="subtitle">
        Explore our wide range of student resources to support
        <br />
        your academic and personal goals.
      </p>

>>>>>>> e69af340451c6e97daef36bbaaca9c43e9cafce1
      <ResourceSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ResourceCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
<<<<<<< HEAD
      <ResourceList resources={filteredResources} />
      <SubmitButton onClick={handleOpenModal} />
=======

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
>>>>>>> e69af340451c6e97daef36bbaaca9c43e9cafce1
      {isModalOpen && <ResourceSubmitModal onClose={handleCloseModal} />}
    </div>
  );
}
