import React from "react";
import { Link } from "react-router-dom";

// AdviceSidebar component displays the sidebar with filtering options
// Props:
// - onShareClick: Function to handle "Share Advice" button click
// - onFilterChange: Function to handle filter changes
// - activeTag: Currently active tag for filtering
export default function AdviceSidebar({
  onShareClick,
  onFilterChange,
  activeTag,
}) {
  // Array of available tags for filtering
  const tags = [
    "All",
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
      {/* List of filter tags */}
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
      {/* Share Advice button */}
      <button className="btn btn-primary btn-block" onClick={onShareClick}>
        Share Advice
      </button>
    </aside>
  );
}
