import React from "react";

/* NOTE:
 * - changed to accept the whole class element from advicePost
 * - added the state change feature to demo incramenting likes/hearts
 * TODO:
 * - working on updating making those changes persistent
 */
// /* Take Advice components and makes it look presentable */
// export default function AdviceCard(data, key) {
//   /*
//    * @ properties
//    * data: entry object
//    * key: does nothing rn
//    */
//   /* state tuple */
//   const [likes, newLike] = useState(data.likes);
//   /* This does jack shit rn */
//   const handleClick = (e) => {
//     newLike((prev) => ({
//       ...prev,
//       likes: e.target.value,
//       hearts: e.target.value,
//     }));
//   };
//   return (
//     <article className="advice-card">
//       <h3>{data.title}</h3>
//       <div className="post-meta">
//         <span>
//           {data.author} • {data.timeAgo}
//         </span>
//         <span className="tag">{data.tag}</span>
//       </div>
//       <p>{data.content}</p>
//       <div className="post-actions">
//         <button
//           className="btn btn-icon"
//           onClick={() =>
//             newLike((likes) => likes + 1)
//           } /* incraments displayed like
//       value */
//           onChange={handleClick}
//         >
//           <i className="icon-thumbs-up"></i>
//           {likes}
//         </button>
//       </div>
//     </article>
//   );
// }

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
  // NOTE:
  // Destructuring props allows us to directly access the properties
  // of the advice post without needing to reference 'data' each time.
  // Makes it easier to see which props are being used in the component.

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
        {/* NOTE:
         * The previous implementation attempted to use e.target.value to update likes,
         * which would not provide the correct value. Instead, we directly call the onLike
         * function to increment the current likes managed in the parent component.
         */}
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
