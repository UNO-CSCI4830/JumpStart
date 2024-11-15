import React from "react";
import AdviceCard from "./AdviceCard";
import "../../styles/Content.css";

export default function Content({ posts, onSortChange }) {
/*
 * @ properties
 * posts: array of entries to be displayed
 * onSortChange: function that updates order of posts displayed. Called by 
 * button events
 */
  return (
    <section className="content">
      <div className="order-by">
        <h2>Order by</h2>
        <div>
          <button
            className="btn btn-link"
            onClick={() => onSortChange("mostRecent")}
          >
            MOST RECENT
          </button>
          <button
            className="btn btn-link"
            onClick={() => onSortChange("mostLiked")}
          >
            MOST LIKED
          </button>
          <button
            className="btn btn-link"
            onClick={() => onSortChange("mostHearted")}
          >
            MOST HEARTED
          </button>
        </div>
      </div>

      <div className="advice-posts">
        {posts.length > 0 ? (
	  /* For Each post, at each index, map to AdviceCard component */
          posts.map((post, index) => ( 
            <AdviceCard {...post} key={0} />
          ))
        ) : (
          <p>No advice is available for the selected filter.</p>
        )}
      </div>
    </section>
  );
}
