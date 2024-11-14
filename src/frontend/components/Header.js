import "../styles/Layout.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../images/uno_O.png";
import AuthenticationModal from "./AuthenticationModal";

export default function Header() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleVerification = (username) => {
    setUsername(username);
  };

  return (
    <header>
      <nav>
        <div className="nav-left">
          <img src={logoImage} alt="Logo" className="logo" />
          <Link to="/home">Home</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/advice">Advice</Link>
          <Link to="/events">Events</Link>
          <Link to="/connect">Connect</Link>
          <Link to="/admin">Admin</Link>
        </div>
        <div className="nav-right">
          {/* Conditional rendering based on authentication state */}
          {username ? (
            // If user is authenticated, show welcome message with their username
            <span className="welcome-text">Hi, {username}!</span>
          ) : (
            // If user is not authenticated, show sign in button
            <button className="btn btn-primary" onClick={handleOpenModal}>
              Sign in
            </button>
          )}
        </div>
      </nav>
      {isModalOpen && (
        <AuthenticationModal
          onClose={handleCloseModal}
          onVerification={handleVerification}
        />
      )}
    </header>
  );
}
