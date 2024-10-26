import React, { useState } from "react";
import "../styles/ResourcePage.css";
import ResourceSearch from "./ResourceSearch";
import ResourceCategories from "./ResourceCategories";
import ResourceCard from "./ResourceCard";

const initialResources = [
  {
    id: 1,
    category: "Academic",
    title: "Library Services",
    description:
      "Access to extensive academic databases and research materials",
  },
  {
    id: 2,
    category: "Academic",
    title: "Tutoring Center",
    description: "Free peer tutoring services for most undergraduate courses",
  },
  {
    id: 3,
    category: "Academic",
    title: "Writing Center",
    description:
      "Professional assistance with essays, research papers, and academic writing",
  },
  {
    id: 4,
    category: "Financial Aid",
    title: "Scholarship Database",
    description:
      "Comprehensive list of available scholarships and application deadlines",
  },
  {
    id: 5,
    category: "Financial Aid",
    title: "FAFSA Workshop",
    description:
      "Get help filling out your FAFSA and understanding financial aid options",
  },
  {
    id: 6,
    category: "Career",
    title: "Resume Builder",
    description:
      "Interactive tool to create and optimize your professional resume",
  },
  {
    id: 7,
    category: "Career",
    title: "Internship Portal",
    description: "Browse and apply for internships with partner companies",
  },
  {
    id: 8,
    category: "Health",
    title: "Student Health Center",
    description:
      "Access to medical services, counseling, and wellness resources",
  },
  {
    id: 9,
    category: "Health",
    title: "Fitness Center",
    description: "State-of-the-art gym facilities and fitness classes",
  },
  {
    id: 10,
    category: "Social",
    title: "Student Organizations",
    description: "Directory of clubs, organizations, and campus activities",
  },
  {
    id: 11,
    category: "Social",
    title: "Events Calendar",
    description: "Upcoming campus events, workshops, and social gatherings",
  },
  {
    id: 12,
    category: "Student Submitted",
    title: "Study Group Finder",
    description:
      "Connect with classmates to form study groups for your courses",
  },
  {
    id: 13,
    category: "Student Submitted",
    title: "Textbook Exchange",
    description:
      "Platform for buying and selling used textbooks with other students",
  },
  {
    id: 14,
    category: "Academic",
    title: "Research Opportunities",
    description:
      "Database of undergraduate research positions and faculty projects",
  },
  {
    id: 15,
    category: "Financial Aid",
    title: "Work-Study Jobs",
    description: "On-campus employment opportunities for eligible students",
  },
];

export default function ResourcePage() {
  const [activeCategory, setActiveCategory] = useState("Academic");
  const [searchTerm, setSearchTerm] = useState("");
  const [resources] = useState(initialResources);

  const filteredResources = resources.filter(
    (resource) =>
      resource.category === activeCategory &&
      (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="resource-page">
      <h1>JumpStart</h1>
      <p className="subtitle">
        Explore our wide range of student resources to support
        <br />
        your academic and personal goals.
      </p>

      <ResourceSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ResourceCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="resources">
        {filteredResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            title={resource.title}
            description={resource.description}
          />
        ))}
      </div>
    </div>
  );
}
