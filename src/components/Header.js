import "../styles/Layout.css";
import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../images/uno_O.png";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="nav-left">
          <img src={logoImage} alt="Logo" className="logo" />
          <Link to="/home">Home</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/advice">Advice</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/discord">Discord</Link>

          {/* admin dashboard coming soon :) */}
          <Link to="/admin"></Link>
        </div>
        <div className="nav-right">
          <button className="btn btn-outline">Sign in</button>
          <button className="btn btn-primary">Register</button>
        </div>
      </nav>
    </header>
  );
}
