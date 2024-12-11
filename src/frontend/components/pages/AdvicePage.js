import React, { useState, useEffect } from "react";
import Sidebar from "../../components/advice/AdviceSidebar";
import Content from "../advice/AdviceContent";
import AdviceShareModal from "../advice/AdviceShareModal";
import "../../styles/Content.css";
import { get, post } from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Advice() {
  const { isVerified } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activeTag, setActiveTag] = useState("All");
  const [sortCriteria, setSortCriteria] = useState("mostRecent");
  const [msg, setMsg] = useState(null);

  var date = new Date(Date.now());
  const [submission, setSubmission] = useState({
    type: "advice",
    uploadDate: `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    uploader: "",
    title: "",
    anon: "anon",
    tags: [],
    description: "",
    likes: 0,
  });

  // Fetch posts based on active tag and sort criteria
  useEffect(() => {
    let filter = activeTag === "All" ? {} : { tag: activeTag };
    filter["sort"] = sortCriteria;

    get("/api/advice", { params: filter })
      .then((res) => setPosts(res.data.payload))
      .catch((err) => setMsg(`Couldn't load data. Status ${err.response.status}`));
  }, [activeTag, sortCriteria]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);

    post("/api/limbo", submission)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));

    setSubmission({
      uploader: "",
      title: "",
      anon: true,
      description: "",
      category: "",
    });
  };

  return (
    <div className="advice-container">
      <Sidebar
        onShareClick={() => setIsModalOpen(true)}
        onFilterChange={setActiveTag}
        activeTag={activeTag}
        isVerified={isVerified}
      />
      {msg ? <h1>{msg}</h1> : <Content posts={posts} onSortChange={setSortCriteria} currentSort={sortCriteria} />}
      {isModalOpen && (
        <AdviceShareModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          submission={submission}
          handleInputChange={(e) => setSubmission({ ...submission, [e.target.name]: e.target.value })}
        />
      )}
    </div>
  );
}
