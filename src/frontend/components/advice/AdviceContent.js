import React from "react";
import AdviceCard from "./AdviceCard";
import "../../styles/Content.css";

export default function Content({ posts, onSortChange, onLike }) {


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
        </div>
      </div>

      <div className="advice-posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            <AdviceCard
              key={post._id}
              id={post._id}
              title={post.title}
              author={post.author}
              timeAgo={post.timeAgo}
              tag={post.tag}
              content={post.content}
              likes={post.likes}
              onLike={onLike}
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
