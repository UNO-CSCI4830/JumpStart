import React from "react";
import "../styles/Resources.css";

export default function Resources() {
  return (
    <section className="resources">
      <h1>College Resources</h1>
      <div className="resource-grid">
        <div className="resource-card">
          <h2>Academic Support</h2>
          <ul>
            <li>
              <a href="#">Tutoring Services</a>
            </li>
            <li>
              <a href="#">Writing Center</a>
            </li>
            <li>
              <a href="#">Math Lab</a>
            </li>
            <li>
              <a href="#">Study Skills Workshops</a>
            </li>
          </ul>
        </div>
        <div className="resource-card">
          <h2>Career Services</h2>
          <ul>
            <li>
              <a href="#">Resume Writing</a>
            </li>
            <li>
              <a href="#">Interview Preparation</a>
            </li>
            <li>
              <a href="#">Job Fairs</a>
            </li>
            <li>
              <a href="#">Internship Opportunities</a>
            </li>
          </ul>
        </div>
        <div className="resource-card">
          <h2>Health and Wellness</h2>
          <ul>
            <li>
              <a href="#">Counseling Services</a>
            </li>
            <li>
              <a href="#">Fitness Center</a>
            </li>
            <li>
              <a href="#">Nutrition Advice</a>
            </li>
            <li>
              <a href="#">Stress Management</a>
            </li>
          </ul>
        </div>
        <div className="resource-card">
          <h2>Financial Aid</h2>
          <ul>
            <li>
              <a href="#">Scholarships</a>
            </li>
            <li>
              <a href="#">Grants</a>
            </li>
            <li>
              <a href="#">Work-Study Programs</a>
            </li>
            <li>
              <a href="#">Financial Literacy Workshops</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
