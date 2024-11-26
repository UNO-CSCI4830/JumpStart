import React from "react";
import { Link } from "react-router-dom";

/* The list on the left of the page
 * enables posts filtering based off the posts's tags
 */
export default function AdviceSidebar({
  onShareClick,
  onFilterChange,
  activeTag,
}) {
  /*
   * @ properties
   * onShareClick: guessing this is the function that launches the
   * AdviceShareModal
   * onFilterChange: guessing this function updates what posts are displayed based
   * on what is selected
   * activeTag: string that helps decide which filter to be set with active CSS
   */
  const tags = [
    /* array of tags */ "All",
    "Study tips",
    "Professors",
    "Housing & Dorm Life",
    "Financial Aid & Scholarships",
    "First-Year Experience",
    "Exam Preparation",
    "Career Advice",
    "Commuter Student Tips",
    "Study Abroad",
    "Alumni Insights",
    "Part-Time Jobs",
    "Internships",
    "Tech & Tools",
    "Off-Campus Life",
    "Networking",
  ];

  return (
    <aside>
      <h2>Filter</h2>
      <ul>
        {tags.map((tag) => (
          <li
            key={tag}
            className={activeTag === tag ? "active" : ""}
            onClick={() => onFilterChange(tag)}
          >
            <Link to="#" onClick={(e) => e.preventDefault()}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary btn-block" onClick={onShareClick}>
        Share Advice
      </button>
    </aside>
  );
}
