import React, { useState, useEffect } from "react";
import "../../styles/Resource.css";
import ResourceModal from "../../components/resources/ResourceModal";
import SearchBar from "../../components/resources/SearchBar";
import ResourceList from "../../components/resources/ResourceList";
import CategoryButton from "../../components/resources/CategoryButton";

import {get, post} from 'axios';
const categories = [ /* array for categories */
  "Academic",
  "Financial Aid",
  "Career",
  "Health",
  "Social",
  "Student Submission",
];

const ResourcePage = () => {
  /* Use state and state-changer duo */
  const [activeCategory, setActiveCategory] = useState("Academic");
  /* Here's searchTerm and setSearchTerm that are updated with ResrouceSearch component */
  const [searchTerm, setSearchTerm] = useState("");
  const [resources, setResources] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); /* State of ResourceSubmitModal component, initially False */
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    link: "",
    category: "",
  });

  const [message, setMessage] = useState(null);
    
    // FIXME: Repair Filter/Search function!

    useEffect(() => { // WILL break filter/Search features
        get("/api/resources")
        .then((res) => {
                setMessage(res.data.message);
                setResources([...res.data.payload]);
            }).catch(err => 
                console.log(`Error contacting server/resources...\n${err}`)
            );

    }, [searchTerm, activeCategory]);

    console.log(resources);

  /* Arrow function updating resources displayed based on searchTerm value */
    const filteredResources = resources.filter(
        (resource) => /* resource as an argument */
            /* if category matches activeCategory, and title/description matches 
               searchTerm, add to filteredResources array */
            resource.category === activeCategory && 
                (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    resource.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const handleSubmit = (e) => { /* upon submit event, update resources array 
  with new entry */
    e.preventDefault(); /* ??? ensure that an empty form isn't added */
    const id = resources.length + 1;
    setResources([...resources, { ...newResource, id }]);
    setIsModalOpen(false); /* Modal state is now false */
     /* new resource is now set, with blank elements */
    setNewResource({ title: "", description: "", link: "", category: "" });
  };

  const handleInputChange = (e) => { /* when a change event occurs, update the 
  newResource with new name : value */
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
        searchTerm={searchTerm} /* searchTerm state variable */
        onSearchChange={(e) => setSearchTerm(e.target.value)} /* state changer 
        to update searchTerm to entered string, given an event that occurs */
      />

      <div className="categories">
        {categories.map((category) => ( /* arrow func to build a CategoryButton 
        to each category in array */
          <CategoryButton
            key={category} /* passes category as key */
            category={category} /* ...and category again as category */
            isActive={activeCategory === category} /* truthy boolean determining 
            if the category is active */
            onClick={() => setActiveCategory(category)} /* state changer to 
            assign new category if button is clicked */
          />
        ))}
      </div>
            {/* Passes filteredResources array to ResourceList component */}
      <ResourceList resources={filteredResources} /> 

      {/* Button that, if clicked toggles ResourceSubmitModal state between T
      or F */}
      <button
        className="submit-resource-btn"
        onClick={() => setIsModalOpen(true)} /* now Modal state is True, 
        Open form!*/
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
        isOpen={isModalOpen} /* current boolean determining if form is even 
        open */
        onClose={() => setIsModalOpen(false)} /* passing state changer to set 
        the modal state boolean to false when form closes */
        onSubmit={handleSubmit} /* Passing arrow func to onSubmit behavior, so 
        when submit button is clicked, data entered into the form is saved */
        newResource={newResource} /* passing empty new resource object to be 
        filled in with formData */
        handleInputChange={handleInputChange} /* passing arrow func to Modal to
        update data with new inputs */
        categories={categories} /* passes categories array to provide user with
        possible assignments */
      />
    </div>
  );
};

export default ResourcePage;
