import React, { useState, useEffect } from "react";
import Sidebar from "../../components/advice/AdviceSidebar";
import Content from "../advice/AdviceContent";
import AdviceShareModal from "../advice/AdviceShareModal";
import { advicePosts } from "../../utils/advicePosts";
import "../../styles/Content.css";

export default function Advice() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(advicePosts);
  const [activeTag, setActiveTag] = useState("All");
  const [sortCriteria, setSortCriteria] = useState("mostRecent");

  useEffect(() => {
    let newPosts = [...advicePosts];

    // Apply filter
    if (activeTag !== "All") {
      newPosts = newPosts.filter((post) => post.tag === activeTag);
    }

    // Apply sort
    switch (sortCriteria) {
      case "mostRecent":
        newPosts.sort((a, b) => {
          const timeA = parseTimeAgo(a.timeAgo);
          const timeB = parseTimeAgo(b.timeAgo);
          return timeB - timeA;
        });
        break;
      case "mostLiked":
        newPosts.sort((a, b) => b.likes - a.likes);
        break;
      case "mostHearted":
        newPosts.sort((a, b) => b.hearts - a.hearts);
        break;
      default:
        break;
    }

    setFilteredPosts(newPosts);
  }, [activeTag, sortCriteria]);

  const parseTimeAgo = (timeAgo) => {
    const timeParts = timeAgo.split(" ");
    const timeValue = parseInt(timeParts[0], 10);
    const timeUnit = timeParts[1];

    const now = Date.now();
    switch (timeUnit) {
      case "hr":
      case "hrs":
        return now - timeValue * 60 * 60 * 1000;
      case "min":
      case "mins":
        return now - timeValue * 60 * 1000;
      case "sec":
      case "secs":
        return now - timeValue * 1000;
      default:
        return now;
    }
  };

  return (
    <div className="advice-container">
      <Sidebar
        onShareClick={() => setIsModalOpen(true)}
        onFilterChange={setActiveTag}
        activeTag={activeTag}
      />
      <Content
        posts={filteredPosts}
        onSortChange={setSortCriteria}
        currentSort={sortCriteria}
      />
      {isModalOpen && (
        <AdviceShareModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
