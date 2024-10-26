import React from "react";
import { Link } from "react-router-dom";

export default function AdviceSidebar() {
  return (
    <aside>
      <h2>Filter</h2>
      <ul>
        <li className="active">
          <Link to="/advice?tag=Study tips">Study tips</Link>
        </li>
        <li>
          <Link to="/advice?tag=Professors">Professors</Link>
        </li>
        <li>
          <Link to="/advice?tag=Housing & Dorm Life">Housing & Dorm Life</Link>
        </li>
        <li>
          <Link to="/advice?tag=Financial Aid & Scholarships">
            Financial Aid & Scholarships
          </Link>
        </li>
        <li>
          <Link to="/advice?tag=First-Year Experience">
            First-Year Experience
          </Link>
        </li>
        <li>
          <Link to="/advice?tag=Exam Preparation">Exam Preparation</Link>
        </li>
        <li>
          <Link to="/advice?tag=Career Advice">Career Advice</Link>
        </li>
        <li>
          <Link to="/advice?tag=Commuter Student Tips">
            Commuter Student Tips
          </Link>
        </li>
        <li>
          <Link to="/advice?tag=Study Abroad">Study Abroad</Link>
        </li>
        <li>
          <Link to="/advice?tag=Alumni Insights">Alumni Insights</Link>
        </li>
        <li>
          <Link to="/advice?tag=Part-Time Jobs">Part-Time Jobs</Link>
        </li>
        <li>
          <Link to="/advice?tag=Internships">Internships</Link>
        </li>
        <li>
          <Link to="/advice?tag=Professors">Professors</Link>
        </li>
        <li>
          <Link to="/advice?tag=Tech & Tools">Tech & Tools</Link>
        </li>
        <li>
          <Link to="/advice?tag=Off-Campus Life">Off-Campus Life</Link>
        </li>
        <li>
          <Link to="/advice?tag=Networking">Networking</Link>
        </li>
      </ul>
      <button className="btn btn-primary btn-block">Share Advice</button>
    </aside>
  );
}
