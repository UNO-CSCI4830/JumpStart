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
  const [activeTag, setActiveTag] = useState("Academic");
  const [searchTerm, setSearchTerm] = useState("");
  const [resources, setResources] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  var date = new Date(Date.now());
  const [submission, setSubmission] = useState({
    type: "resource",
    uploadDate : `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    title: "",
    uploader: "",
    description: "",
    link : "",
    category : "",
  });

  // Ubuquitous msg
  const [msg, setMsg] = useState(null);
    
    useEffect(() => {
        let params = {
            category : activeTag,
        };

        // add search term to params if characters are found
        if (searchTerm.length !== 0) params.search = searchTerm;

        get("/api/resources", {
            headers: {'Content-Type': 'application/json'},
            params: params
        }).then((res) => {
                setResources([...res.data.payload]);
            }).catch(err => {
                console.log(err.response);
                setMsg(`Couldn't load data. Status ${err.response.status}`);
    });
    }, [searchTerm, activeTag]);

  const handleSubmit = (e) => { /* upon submit event, update resources array 
  with new entry */
    e.preventDefault();
    setIsModalOpen(false); /* Modal state is now false */

    // send submission over POST
    post('/api/limbo', submission)
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err.response);
    });

     /* submission is now set, with blank elements */
    setSubmission({ uploader: "", title: "", description: "", link: "", category: "" });
  };

  const handleInputChange = (e) => { /* when a change event occurs, update the 
  submission with new name : value */
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
            isActive={activeTag === category} /* truthy boolean determining 
            if the category is active */
            onClick={() => setActiveTag(category)} /* state changer to 
            assign new category if button is clicked */
          />
        ))}
      </div>
            {/* Passes filteredResources array to ResourceList component */}
      {msg !== null ? (
      <div><h1>{msg}</h1></div>
      ) : (
      <ResourceList resources={resources} /> 
      )}

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
        submission={submission} /* passing empty new resource object to be 
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
