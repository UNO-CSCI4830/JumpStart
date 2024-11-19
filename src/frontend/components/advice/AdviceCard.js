import React from "react";

// AdviceCard component displays individual advice posts
// Props:
// - title: Title of the advice post
// - author: Author of the post
// - time: Time since the post was created
// - tag: Tag associated with the post
// - content: Main content of the advice
// - likes: Number of likes for the post
// - hearts: Number of hearts for the post
export default function AdviceCard({
  title,
  author,
  time,
  tag,
  content,
  likes,
  hearts,
}) {
  return (
    <article className="advice-card">
      {/* Post title */}
      <h3>{title}</h3>
      {/* Post metadata */}
      <div className="post-meta">
        <span>
          {author} • {time}
        </span>
        <span className="tag">{tag}</span>
      </div>
      {/* Post actions (likes and hearts) */}
      <p>{content}</p>
      <div className="post-actions">
        <button className="btn btn-icon">
          <i className="icon-thumbs-up"></i>
          {likes}
        </button>
        <button className="btn btn-icon">
          <i className="icon-heart"></i>
          {hearts}
        </button>
      </div>
    </article>
  );
}
