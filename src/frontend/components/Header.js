import "../styles/Layout.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../images/uno_O.png";
import AuthenticationModal from "./AuthenticationModal";

export default function Header() {
  /* state tuple, false */
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => { /* when modal event occurs, set modal state 
  to true*/
    setModalOpen(true);
  };

  const handleCloseModal = () => { /* when modal event occurs, set modal state 
  to false */
    setModalOpen(false);
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
          <Link to="/DEMO">Demo</Link> {/* DEMO PAGE */}
        </div>
        {/* Sign in button, and AuthenticationModal */}
        <div className="nav-right">
          {/* handleOpenModal activates when button is pressed */}
          <button className="btn btn-primary" onClick={handleOpenModal}>
            Sign in
          </button>
        </div>
      </nav>
      {/* pass handleCloseModal arrow func to onClose behavior */}
      {isModalOpen && <AuthenticationModal onClose={handleCloseModal} />}
    </header>
  );
}
