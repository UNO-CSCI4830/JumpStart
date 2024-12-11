import React from "react";
export default function AdviceCard({
  id,
  title,
  author,
  timeAgo,
  tag,
  content,
  likes,
  onLike,
}) {

  return (
    <article className="advice-card">
      <h3>{title}</h3>
      <div className="post-meta">
        <span>
          {author} • {timeAgo}
        </span>
        <span className="tag">{tag}</span>
      </div>
      <p>{content}</p>
      <div className="post-actions">
        <button
          className="btn btn-icon"
          onClick={() => onLike(id)} // Call the onLike function with the post id
        >
          <i className="icon-thumbs-up"></i>
          {likes} {/* Display the current number of likes */}
        </button>
      </div>
    </article>
  );
}
