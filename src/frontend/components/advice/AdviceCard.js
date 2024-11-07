import React from "react";

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
      <h3>{title}</h3>
      <div className="post-meta">
        <span>
          {author} • {time}
        </span>
        <span className="tag">{tag}</span>
      </div>
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
