import "../styles/Layout.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImage from "../images/uno_O.png";
import AuthenticationModal from "./AuthenticationModal";
import AdviceShareModal from "./advice/AdviceShareModal";

export default function Header() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isAdviceModalOpen, setIsAdviceModalOpen] = useState(false);
  const [submission, setSubmission] = useState({
    uploader: "",
    title: "",
    anon: "anon",
    tags: [],
    description: "",
  });

  const adminEmails = [
    'yaguirre-duran',
    'elijahgnuse',
    'sjohnson154',
    'fmerino',
    'jocelynhorn',
    'ojimenez-gonzalez',
  ];

  useEffect(() => {
    console.log("Rendering Header - State:", { username, userRole, isVerified });
    if (username) {
      // Check if the logged-in username is in the adminEmails list
      if (adminEmails.includes(username)) {
        setUserRole("admin");
        setIsVerified(true);
      } else {
        setUserRole("user");
        setIsVerified(true);
      }
    }
  }, [username]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleVerification = (username) => {
    setUsername(username);
    setIsVerified(true);
  };

  const handleOpenAdviceModal = () => {
    setIsAdviceModalOpen(true);
  };

  const handleCloseAdviceModal = () => {
    setIsAdviceModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting advice:", submission);
    setSubmission({
      uploader: "",
      title: "",
      anon: "anon",
      tags: [],
      description: "",
    });
    setIsAdviceModalOpen(false);
  };

  const handleLogout = () => {
    setUsername(null);
    setUserRole(null);
    setIsVerified(false);
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

          {/* Admin tab visibility based on user role */}
          {userRole === "admin" && isVerified && (
            <>
              <Link to="/admin">Admin</Link>
            </>
          )}
        </div>

        <div className="nav-right">
          {username ? (
            <>
              <span className="welcome-text">Hi, {username}!</span>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleOpenModal}>
              Sign in
            </button>
          )}
          {/* Share Advice button visibility based on verification */}
          {(userRole === "user" || userRole === "admin") && isVerified && (
            <button className="btn btn-primary" onClick={handleOpenAdviceModal}>
              Share Advice
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

      {isAdviceModalOpen && (
        <AdviceShareModal
          onClose={handleCloseAdviceModal}
          onSubmit={handleSubmit}
          submission={submission}
          handleInputChange={(e) =>
            setSubmission({
              ...submission,
              [e.target.name]: e.target.value,
            })
          }
          isVerified={isVerified}
          role={userRole}
        />
      )}
    </header>
  );
}
