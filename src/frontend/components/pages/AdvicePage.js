import React, { useState, useEffect } from "react";
import Sidebar from "../../components/advice/AdviceSidebar";
import Content from "../advice/AdviceContent";
import AdviceShareModal from "../advice/AdviceShareModal";
import "../../styles/Content.css";
import { get, post } from "axios";

/*
 * NOTE:
 * OrderBy functionality has currently broke, and I'm not sure why...
 *
 * FIXME: Throws a runtime error when server shuts down when posts have been loaded!
 *  - Figure out more!
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

  var date = new Date(Date.now());
  const [submission, setSubmission] = useState({
    type: "advice",
    uploadDate: `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    uploader: "",
    title: "",
    anon : "anon",
    tags : [],
    description: "",
    likes: 0,
  });

  // Pull from DB based on Filter
  useEffect(() => {
    let filter = activeTag === "All" ? {} : { tag: activeTag };
    filter["sort"] = sortCriteria; // NOTE: I *think* sort works now!
    // FIXME: BUT liked values STILL DON'T CHANGE
    filter["process"] = true; // Tell GET handler to process upload date to be nicer

    // Query posts from DB
    get("/api/advice", {
      params: filter,
    })
      .then((res) => {
        setPosts([...res.data.payload]);
      })
      .catch((err) => {
        console.log(err.response);
        setMsg(`Couldn't load data. Status ${err.response.status}`);
      });
  }, [activeTag, sortCriteria]); /* Define activeTag and sortCriteria so it can
  be used in the arrow func */

  console.log(posts);

  const handleSubmit = (e) => {
    /* upon submit event, update resources array 
  with new entry */
    e.preventDefault(); /* ??? ensure that an empty form isn't added */
    // setResources([...resources, { ...submission, _id }]);
    setIsModalOpen(false); /* Modal state is now false */

    // send submission over POST
    post("/api/limbo", submission)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });

    /* submission is now set, with blank elements */
    setSubmission({
      uploader: "",
      title: "",
      anon : true,
      description: "",
      category: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target; /* Field names for form */
    /* Determine which data to update */
    /* I moved conditional from AdviceShareModal out here, mirroring ResourceModal */
    // FIXME: Tag gets selected and is received by server, but it doesn't register visually
    // FIXME: Apparently tag gets uploaded as String as opposed to Array of Strings
    if (type === "checkbox") {
      /* type "checkbox", so update tags */
      setSubmission((prev) => ({
        ...prev,
        tags: checked
          ? [...prev.tags, value]
          : prev.tags.filter((tag) => tag !== value),
      }));
    } else {
      /* They're not updating a tag */
      setSubmission((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // TODO: Add to db pipeline
  const parseTimeAgo = (timeAgo) => {
    /* arrow func with arg timeAgo calculates 
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

  const handleLike = (id) => {
    // Increment the likes for the post with the given id

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === id ? { ...post, likes: post.likes + 1 } : post
          )
        );

        let likes = 0;
        posts.forEach((post) => {
            if (post._id === id) likes += post.likes
        });

        post('/api/advice', {
            post : id,
            edits : { likes : likes + 1}
        }).then((res) => console.log(res)
        ).catch((err) => console.log(err.response));

        
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
      {msg !== null ? (
        <div>
          <h1>{msg}</h1>
        </div>
      ) : (
        <Content /* Call Content */
          posts={posts} /* pass in filteredPsts to Content to display 
            using AdviceCard */
          onSortChange={setSortCriteria} /* pass in state changer for 
            sortCriteria  */
          currentSort={sortCriteria} /* Pass in current sortCriteria */
          // NOTE:
          // Changes made in the AdviceContent component:
          // 1. The 'onLike' function is now passed down to each AdviceCard,
          //    allowing for the likes to be incremented directly from the card.
          // 2. The mapping of posts to AdviceCard components now includes
          //    all necessary props, ensuring that the UI reflects the current state.
          // 3. Removed any local state management for likes in AdviceCard,
          //    relying on the parent component to manage the state.

          onLike={handleLike} // Pass the handleLike function
        />
      )}
      {isModalOpen /* if True, open submit form. Resets to false when form
      is closed */ && (
        <AdviceShareModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          submission={submission}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
}
