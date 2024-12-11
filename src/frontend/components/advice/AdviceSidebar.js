import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdviceSidebar({ onShareClick, onFilterChange, activeTag }) {
  const { isVerified } = useAuth();

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

  console.log({ isVerified });

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

      {/* Conditionally render the Share Advice button based on isVerified */}
      {isVerified && (
        <button className="btn btn-primary btn-block" onClick={onShareClick}>
          Share Advice
        </button>
      )}
    </aside>
  );
}
