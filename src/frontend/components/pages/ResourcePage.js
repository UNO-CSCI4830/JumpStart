import React, { useState } from "react";
import "../../styles/Resource.css";
import ResourceModal from "../../components/resources/ResourceModal";
import SearchBar from "../../components/resources/SearchBar";
import ResourceList from "../../components/resources/ResourceList";
import CategoryButton from "../../components/resources/CategoryButton";
import initialResources from "../../utils/initialResources";

const categories = [
  "Academic",
  "Financial Aid",
  "Career",
  "Health",
  "Social",
  "Student Submission",
];

const ResourcePage = () => {
  const [activeCategory, setActiveCategory] = useState("Academic");
  const [searchTerm, setSearchTerm] = useState("");
  const [resources, setResources] = useState(initialResources);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    link: "",
    category: "",
  });

  const filteredResources = resources.filter(
    (resource) =>
      resource.category === activeCategory &&
      (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = resources.length + 1;
    setResources([...resources, { ...newResource, id }]);
    setIsModalOpen(false);
    setNewResource({ title: "", description: "", link: "", category: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource({ ...newResource, [name]: value });
  };

  return (
    <div className="resource-page">
      <h1>Academic Resources</h1>
      <p className="subtitle">
        Access study materials, guides, and practice tests
        <br />
        to achieve your academic and personal goals.
      </p>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="categories">
        {categories.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      <ResourceList resources={filteredResources} />

      <button
        className="submit-resource-btn"
        onClick={() => setIsModalOpen(true)}
      >
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

      <ResourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        newResource={newResource}
        handleInputChange={handleInputChange}
        categories={categories}
      />
    </div>
  );
};

export default ResourcePage;
