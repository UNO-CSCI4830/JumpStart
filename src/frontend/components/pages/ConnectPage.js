import React from "react";
import "../../styles/Connect.css";

// ConnectPage component displays community connection features
const ConnectPage = () => {
  return (
    <div className="container">
      {/* Header section */}
      <div className="header">
        <h1>Connect with the Community</h1>
        <p className="subtitle">
          Join the UNO Student Hub to connect, collaborate, and explore
          community channels with fellow students!
        </p>
      </div>

      {/* Feature cards grid */}
      <div className="card-grid">
        {/* Chat channels card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="icon message-circle"></span>
              Chat Channels
            </h2>
            <p className="card-description">
              Dedicated channels for different subjects and interests
            </p>
          </div>
          <div className="card-content">
            <div className="badge-container">
              <span className="badge">#placeholder</span>
              <span className="badge">#placeholder</span>
              <span className="badge">#placeholder</span>
              <span className="badge">#placeholder</span>
              <span className="badge">#placeholder</span>
            </div>
          </div>
        </div>

        {/* Community features card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="icon users"></span>
              Community Features
            </h2>
            <p className="card-description">
              Everything you need to connect and collaborate
            </p>
          </div>
          <div className="card-content">
            <ul className="feature-list">
              <li>• Placeholder</li>
              <li>• Placeholder</li>
              <li>• Placeholder</li>
              <li>• Placeholder</li>
              <li>• Placeholder</li>
            </ul>
          </div>
        </div>

        {/* Get started card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="icon share2"></span>
              Get Started
            </h2>
            <p className="card-description">
              Join our Discord server in three easy steps
            </p>
          </div>
          <div className="card-content">
            <ol className="steps-list">
              <li>
                <span className="step-badge">1</span>
                Click the join button below
              </li>
              <li>
                <span className="step-badge">2</span>
                Verify your UNO email
              </li>
              <li>
                <span className="step-badge">3</span>
                Placeholder
              </li>
            </ol>
            <button className="join-button">
              <span className="icon external-link"></span>
              Join Discord Server
            </button>
          </div>
        </div>
      </div>

      {/* Community guidelines section */}
      <div className="guidelines-section">
        <h2>Community Guidelines</h2>
        <p className="guidelines-description">
          To ensure a positive experience for everyone, please follow our
          community guidelines
        </p>
        <div className="guidelines-grid">
          <div className="guideline-card">
            <h3>Be Respectful</h3>
            <p>Treat all members with respect and courtesy</p>
          </div>
          <div className="guideline-card">
            <h3>Stay On Topic</h3>
            <p>Keep discussions relevant to academics and campus life</p>
          </div>
          <div className="guideline-card">
            <h3>Help Others</h3>
            <p>Share your knowledge and support fellow students</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
