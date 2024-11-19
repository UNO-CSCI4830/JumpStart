import React from "react";
import AdviceCard from "./AdviceCard";
import "../../styles/Content.css";

// AdviceContent component displays the main content area with advice posts
// Props:
// - posts: Array of advice posts to display
// - onSortChange: Function to handle sorting changes
export default function Content({ posts, onSortChange }) {
  return (
    <section className="content">
      {/* Sorting options */}
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

      {/* Advice posts container */}
      <div className="advice-posts">
        {posts.length > 0 ? (
          // Map through posts and render AdviceCard for each
          posts.map((post, index) => (
            <AdviceCard
              key={index}
              title={post.title}
              author={post.author}
              time={post.timeAgo}
              tag={post.tag}
              content={post.content}
              likes={post.likes}
              hearts={post.hearts}
            />
          ))
        ) : (
          // Display message when no posts are available
          <p>No advice is available for the selected filter.</p>
        )}
      </div>
    </section>
  );
}
