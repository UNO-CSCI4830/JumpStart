import React from "react";
import AdviceCard from "./AdviceCard";
import { advicePosts } from "../utils/advicePosts";
import "../styles/Content.css";

export default function Content() {
  return (
    <section className="content">
      <div className="order-by">
        <h2>Order by</h2>
        <div>
          <button className="btn btn-link active">MOST RECENT</button>
          <button className="btn btn-link">MOST LIKED</button>
          <button className="btn btn-link">MOST HEARTED</button>
        </div>
      </div>

      <div className="advice-posts">
        {advicePosts.map((post, index) => (
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
        ))}
      </div>
    </section>
  );
}
