import React from "react";
import {useState} from "react";

/* NOTE:
 * - changed to accept the whole class element from advicePost
 * - added the state change feature to demo incramenting likes/hearts
 * TODO:
 * - working on updating making those changes persistent
 */

/* Take Advice components and makes it look presentable */
export default function AdviceCard( data, key) {
    /*
     * @ properties
     * data: entry object
     * key: does nothing rn
     */
  /* state tuple */
  const [likes, newLike] = useState(data.likes);
  const [hearts, newHeart] = useState(data.hearts);
  
  /* This does jack shit rn */
  const handleClick = (e) => {
    newLike((prev) => ({
	    ...prev,
	    likes: e.target.value,
	    hearts: e.target.value,
    }));
  }

  return (
    <article className="advice-card">
      <button onClick={() => console.log(data)}>show data</button>
      <h3>{data.title}</h3>
      <div className="post-meta">
        <span>
          {data.author} • {data.timeAgo}
        </span>
        <span className="tag">{data.tag}</span>
      </div>
      <p>{data.content}</p>
      <div className="post-actions">
        <button className="btn btn-icon"
	  onClick={() => newLike(likes => likes + 1)} /* incraments displayed like
      value */
	  onChange={handleClick} 
	  >
          <i className="icon-thumbs-up"></i>
          {likes}
        </button>
        <button 
	  className="btn btn-icon"
	  onClick={() => newHeart(hearts => hearts + 1)} /* incraments displayed
      heart value */
	  onChange={handleClick} /* calls handleClick arrow func. Does nothing rn */
	  >
          <i className="icon-heart"></i>
          {hearts}
        </button>
      </div>
   </article>
  );
}












