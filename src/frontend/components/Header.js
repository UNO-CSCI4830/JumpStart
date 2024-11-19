import "../styles/Layout.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../images/uno_O.png";
import AuthenticationModal from "./AuthenticationModal";

// Header component manages the navigation bar and authentication state
export default function Header() {
  // State for controlling authentication modal visibility
  const [isModalOpen, setModalOpen] = useState(false);
  // State for storing authenticated user's username
  const [username, setUsername] = useState(null);

  // Opens the authentication modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Closes the authentication modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Handles successful user verification
  const handleVerification = (username) => {
    setUsername(username);
  };

  return (
    <header>
      <nav>
        {/* Left side navigation links */}
        <div className="nav-left">
          <img src={logoImage} alt="Logo" className="logo" />
          <Link to="/home">Home</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/advice">Advice</Link>
          <Link to="/events">Events</Link>
          <Link to="/connect">Connect</Link>
          <Link to="/admin">Admin</Link>
        </div>
        {/* Right side authentication section */}
        <div className="nav-right">
          {username ? (
            <span className="welcome-text">Hi, {username}!</span>
          ) : (
            <button className="btn btn-primary" onClick={handleOpenModal}>
              Sign in
            </button>
          )}
        </div>
      </nav>
      {/* Render authentication modal when isModalOpen is true */}
      {isModalOpen && (
        <AuthenticationModal
          onClose={handleCloseModal}
          onVerification={handleVerification}
        />
      )}
    </header>
  );
}
