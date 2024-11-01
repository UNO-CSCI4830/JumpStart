import React, { useEffect, useState } from "react";
import "../../styles/EventsList.css";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/scraper-output.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <h2 className="events-title">Upcoming Events</h2>
      <div className="events-grid">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-header">
              <h3 className="event-title">{event.title}</h3>
              <div className="event-date">
                <span className="icon calendar-icon"></span>
                {event.datetime}
              </div>
            </div>
            <div className="event-content">
              {event.tags && event.tags.length > 0 && (
                <div className="event-tags">
                  {event.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="event-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="event-footer">
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="event-link"
              >
                View Details
                <span className="icon external-link-icon"></span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
