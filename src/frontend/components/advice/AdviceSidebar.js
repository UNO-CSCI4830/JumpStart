import React from "react";
import { Link } from "react-router-dom";

export default function AdviceSidebar({
  onShareClick,
  onFilterChange,
  activeTag,
}) {
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
