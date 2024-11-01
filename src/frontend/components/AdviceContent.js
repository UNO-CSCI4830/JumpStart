import React from "react";
import AdviceCard from "./AdviceCard";
import "../styles/Content.css";

export default function Content({ posts, onSortChange }) {
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
          <p>No advice is available for the selected filter.</p>
        )}
      </div>
    </section>
  );
}
