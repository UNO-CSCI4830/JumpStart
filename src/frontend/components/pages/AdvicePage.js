import React, { useState, useEffect } from "react";
import Sidebar from "../../components/advice/AdviceSidebar";
import Content from "../advice/AdviceContent";
import AdviceShareModal from "../advice/AdviceShareModal";
import { advicePosts } from "../../utils/advicePosts";
import "../../styles/Content.css";

/* Builds page for displaying advice */
export default function Advice() {
  /* state tuples */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(advicePosts);
  const [activeTag, setActiveTag] = useState("All");
  const [sortCriteria, setSortCriteria] = useState("mostRecent");

  useEffect(() => { /* ??? No variable to handle arrow func off of, but I'm
    guessing this sorts posts on page based off "order" bar */
    let newPosts = [...advicePosts]; /* ??? re-assig arr of doc objects to 
    newPosts */

    // Apply filter
    if (activeTag !== "All") {
      newPosts = newPosts.filter((post) => post.tag === activeTag);
    }

    // Apply sort
    switch (sortCriteria) { /* default sortCriteria = mostRecent */
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

    setFilteredPosts(newPosts); /* updates filteredPosts to the re-sorted 
    newPosts */
  }, [activeTag, sortCriteria]); /* Define activeTag and sortCriteria so it can
  be used in the arrow func */


    // TODO: Add to db pipeline
  const parseTimeAgo = (timeAgo) => { /* arrow func with arg timeAgo calculates 
  how long ago a post was submitted */
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
      <Sidebar /* Call Sidebar */
        onShareClick={() => setIsModalOpen(true)} /* Calls state changer to 
        open submit form */
        onFilterChange={setActiveTag} /* pass in state changer to update active
        tag */
        activeTag={activeTag} /* Pass in current active tag */
      />
      <Content /* Call Content */
        posts={filteredPosts} /* pass in filteredPsts to Content to display 
        using AdviceCard */
        onSortChange={setSortCriteria} /* pass in state changer for 
        sortCriteria  */
        currentSort={sortCriteria} /* Pass in current sortCriteria */
      />
      {isModalOpen && ( /* if True, open submit form. Resets to false when form
      is closed */
        <AdviceShareModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
