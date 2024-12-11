import React, { useState, useEffect } from "react";
import "../../styles/Resource.css";
import ResourceModal from "../../components/resources/ResourceModal";
import SearchBar from "../../components/resources/SearchBar";
import ResourceList from "../../components/resources/ResourceList";
import CategoryButton from "../../components/resources/CategoryButton";
import { useAuth } from "../../context/AuthContext";

import { get, post } from 'axios';

const categories = [
  "Academic",
  "Financial Aid",
  "Career",
  "Health",
  "Social",
  "Student Submission",
];

const ResourcePage = () => {
  const { isVerified } = useAuth();

  const [activeTag, setActiveTag] = useState("Academic");
  const [searchTerm, setSearchTerm] = useState("");
  const [resources, setResources] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const date = new Date(Date.now());
  const [submission, setSubmission] = useState({
    type: "resource",
    uploadDate: `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    title: "",
    uploader: "",
    description: "",
    link: "",
    category: "",
  });

  const [msg, setMsg] = useState(null);

  useEffect(() => {
    let params = { category: activeTag };

    if (searchTerm.length !== 0) params.search = searchTerm;

    get("/api/resources", {
      headers: { 'Content-Type': 'application/json' },
      params: params,
    }).then((res) => {
      setResources([...res.data.payload]);
    }).catch((err) => {
      console.log(err.response);
      setMsg(`Couldn't load data. Status ${err.response.status}`);
    });
  }, [searchTerm, activeTag]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);

    post('/api/limbo', submission)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err.response);
      });

    setSubmission({ uploader: "", title: "", description: "", link: "", category: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubmission({ ...submission, [name]: value });
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
            isActive={activeTag === category}
            onClick={() => setActiveTag(category)}
          />
        ))}
      </div>

      {msg !== null ? (
        <div><h1>{msg}</h1></div>
      ) : (
        <ResourceList resources={resources} />
      )}

      {isVerified && (
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
      )}

      <ResourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        submission={submission}
        handleInputChange={handleInputChange}
        categories={categories}
      />
    </div>
  );
};

export default ResourcePage;
