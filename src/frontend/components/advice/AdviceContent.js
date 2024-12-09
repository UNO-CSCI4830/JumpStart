import React from "react";
import AdviceCard from "./AdviceCard";
import "../../styles/Content.css";

// export default function Content({ posts, onSortChange }) {
//   /*
//    * @ properties
//    * posts: array of entries to be displayed
//    * onSortChange: function that updates order of posts displayed. Called by
//    * button events
//    */
export default function Content({ posts, onSortChange, onLike }) {
  /*
   * @ properties
   * posts: array of entries to be displayed
   * onSortChange: function that updates order of posts displayed. Called by
   * button events
   * onLike: function is passed down to each AdviceCard to handle the like increment.
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
        </div>
      </div>

      <div className="advice-posts">
        {posts.length > 0 ? (
          // /* For Each post, at each index, map to AdviceCard component */

          // NOTE:
          // Changes made in this component:
          // 1. Ensured that the 'onLike' function is passed down to each AdviceCard.
          // 2. Mapped over the 'posts' array to render AdviceCard components,
          //    passing all necessary props including 'likes' and 'onLike'.
          // 3. Removed any local state management for likes, relying on the parent
          //    component to manage the state and ensure consistency across the UI.

          // NOTE:
          // The commented-out code was an earlier implementation that attempted to spread the post object directly into AdviceCard.
          // posts.map((post, index) => <AdviceCard {...post} key={0} />)

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
