import React from "react";
import "../../styles/Connect.css";

const Connect = () => {
  return (
    <div className="connect-container">
      <h1 className="h1-Connect">Connect with the Community</h1>
      <p className="p-Connect">
        Join the UNO Student Hub to connect, collaborate, and explore community
        channels with fellow students!
      </p>

      <section className="features-grid">
        <div className="feature-card">
          <div className="card-content">
            <i className="icon-message-circle"></i>
            <h2>Chat Channels</h2>
            <p>Engage in various discussions.</p>
          </div>
          <div className="badges">
            <span className="badge">General</span>
            <span className="badge">Announcements</span>
            <span className="badge">Support</span>
          </div>
        </div>

        <div className="feature-card">
          <div className="card-content">
            <i className="icon-users"></i>
            <h2>Connect Features</h2>
            <p>Explore what we offer.</p>
          </div>
          <ul>
            <li>Events</li>
            <li>Workshops</li>
            <li>Networking</li>
          </ul>
        </div>

        <div className="feature-card">
          <div className="card-content">
            <i className="icon-share2"></i>
            <h2>Get Started</h2>
            <p>Join us today!</p>
          </div>
          <ol>
            <li>Sign up for an account.</li>
            <li>Join the Discord server.</li>
            <li>Participate in discussions.</li>
          </ol>
          <button className="join-button">
            <i className="icon-discord"></i> Join Discord Server
          </button>
        </div>
      </section>

      <section className="guidelines-section">
        <h2>Connect Guidelines</h2>
        <p>We expect all members to adhere to the following guidelines:</p>
        <div className="guidelines-grid">
          <div className="guideline">
            <h3>Be Respectful</h3>
            <p>Treat others with kindness and respect.</p>
          </div>
          <div className="guideline">
            <h3>Stay On Topic</h3>
            <p>Keep discussions relevant to the community.</p>
          </div>
          <div className="guideline">
            <h3>Help Others</h3>
            <p>Support fellow members and share knowledge.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Connect;
