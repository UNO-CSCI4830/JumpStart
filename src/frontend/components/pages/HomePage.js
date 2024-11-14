import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";

const HomePage = () => {
  const news = [
    {
      title: "New Resource Center Launch",
      date: "2024-02-01",
      description:
        "Explore our newly launched resource center with study materials and guides.",
    },
    {
      title: "Upcoming Study Groups",
      date: "2024-02-05",
      description: "Join our peer-led study groups starting next week.",
    },
    {
      title: "Website Updates",
      date: "2024-02-10",
      description:
        "Check out our new features including improved search and navigation.",
    },
  ];

  const quickLinks = [
    {
      href: "/resources",
      icon: "book-open",
      title: "Resources",
      description: "Study materials and guides",
    },
    {
      href: "/advice",
      icon: "users",
      title: "Advice",
      description: "Peer recommendations",
    },
    {
      href: "/events",
      icon: "calendar",
      title: "Events",
      description: "Campus activities",
    },
    {
      href: "/connect",
      icon: "bell",
      title: "Connect",
      description: "Join our community",
    },
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to JumpStart</h1>
        <p className="hero-description">
          Your gateway to academic success at the University of Nebraska Omaha
        </p>
        <div className="button-group">
          <Link to="/resources" className="button primary">
            Browse Resources
          </Link>
          <Link to="/advice" className="button secondary">
            Get Advice
          </Link>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <h2>Latest Updates</h2>
        <div className="news-grid">
          {news.map((item, index) => (
            <div key={index} className="card">
              <div className="card-header">
                <h3>{item.title}</h3>
                <p className="card-date">{item.date}</p>
              </div>
              <div className="card-content">
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links-section">
        <h2>Quick Links</h2>
        <div className="quick-links-grid">
          {quickLinks.map((link, index) => (
            <Link key={index} to={link.href} className="quick-link-card">
              <div className="quick-link-content">
                <span className={`icon ${link.icon}`}></span>
                <div>
                  <h3>{link.title}</h3>
                  <p>{link.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
