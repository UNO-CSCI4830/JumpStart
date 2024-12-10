import React from "react";
import { Link } from "react-router-dom";

/* The list on the left of the page
 * enables posts filtering based off the post's tags
 */
export default function AdviceSidebar({
  onFilterChange, // Function to handle tag filter changes
  activeTag, // Current active filter tag
  isVerified, // Prop to check if the user is verified
  userRole, // Prop to check the user's role
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
    </aside>
  );
}
