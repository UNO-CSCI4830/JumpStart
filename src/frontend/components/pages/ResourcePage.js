import React, { useState } from "react";
import "../../styles/ResourcePage.css";
import ResourceSearch from "../resources/ResourceSearch";
import ResourceCategories from "../resources/ResourceCategories";
import ResourceHeader from "../resources/ResourceHeader";
import ResourceList from "../resources/ResourceList";
import ResourceSubmitModal from "../resources/ResourceSubmitModal";
import SubmitButton from "../resources/ResourceSubmitButton";
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
      <ResourceHeader />
      <ResourceSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ResourceCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ResourceList resources={filteredResources} />
      <SubmitButton onClick={handleOpenModal} />
      {isModalOpen && <ResourceSubmitModal onClose={handleCloseModal} />}
    </div>
  );
}
