// import "./MyCustom.css";
import "../styles/Content.css";
import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../images/uno_O.png";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="nav-left">
          <img src={logoImage} alt="Logo" className="logo" />
          <Link to="/">Home</Link>
          <Link to="/resources">Resources</Link>
        </div>
        <div className="nav-right">
          <button className="btn btn-primary">Login</button>
          <button className="btn btn-outline">Sign Up</button>
        </div>
      </nav>
    </header>
  );
}
