import "../styles/Layout.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logoImage from "../images/uno_O.png";
import AuthenticationModal from "./AuthenticationModal";
import AdviceShareModal from "./advice/AdviceShareModal";
import { useAuth } from "../context/AuthContext"; 

export default function Header() {
  const { isVerified, setIsVerified, username, setUsername } = useAuth();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null);
  const [isAdviceModalOpen, setIsAdviceModalOpen] = React.useState(false);
  const [submission, setSubmission] = React.useState({
    uploader: "",
    title: "",
    anon: "anon",
    tags: [],
    description: "",
  });

  const adminEmails = [
    "yaguirre-duran",
    "elijahgnuse",
    "sjohnson154",
    "fmerino",
    "jocelynhorn",
    "ojimenez-gonzalez",
  ];

  React.useEffect(() => {
    if (username) {
      if (adminEmails.includes(username)) {
        setUserRole("admin");
      } else {
        setUserRole("user");
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
    setIsVerified(false);
    setUserRole(null);
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

          {userRole === "admin" && isVerified && <Link to="/admin">Admin</Link>}
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
