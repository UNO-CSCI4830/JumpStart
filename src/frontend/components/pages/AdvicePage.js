import React, { useState, useEffect } from "react";
import Sidebar from "../../components/advice/AdviceSidebar";
import Content from "../advice/AdviceContent";
import AdviceShareModal from "../advice/AdviceShareModal";
import "../../styles/Content.css";
import {get, post} from 'axios';

/*
 * NOTE:
 * OrderBy functionality has currently broke, and I'm not sure why...
 *
 * TODO:
 * - axios.post() to have AdviceShareModal push to LimboDB
 */
export default function Advice() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activeTag, setActiveTag] = useState("All");
  const [sortCriteria, setSortCriteria] = useState("mostRecent");
  const [msg, setMsg] = useState(null);
  const [submission, setSubmission] = useState({
    type : "advice",
    uploader: "joemama@urmoms.place",
    title: "New Post",
    postAs: "Anonymous",
    tags: [],
    description: "lorem ipsum get rekt nerd",
  });

  // Pull from DB based on Filter
  useEffect(() => {
    let filter = activeTag === "All" ? {} : {tag: activeTag};
        //
    filter["sort"] = sortCriteria; // NOTE: I *think* sort works now!
    // FIXME: BUT liked values STILL DON'T CHANGE
    filter["process"] = true; // Tell GET handler to process upload date to be nicer

    // Query posts from DB
    get("/api/advice", {
        params: filter 
    }).then((res) => {
            setPosts([...res.data.payload]);
        }).catch( err => {
                console.log(err.response);
                setMsg(`Couldn't load data. Status ${err.response.status}`);
            });
  }, [activeTag, sortCriteria]); /* Define activeTag and sortCriteria so it can
  be used in the arrow func */

    console.log(posts);

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
      {msg !== null ?
        (<div><h1>{msg}</h1></div>) : 
        (<Content /* Call Content */
            posts={posts} /* pass in filteredPsts to Content to display 
            using AdviceCard */
            onSortChange={setSortCriteria} /* pass in state changer for 
            sortCriteria  */
            currentSort={sortCriteria} /* Pass in current sortCriteria */
          />)}
      {isModalOpen && ( /* if True, open submit form. Resets to false when form
      is closed */
        <AdviceShareModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
