import React from "react";
import "../../styles/EventsList.css";

const EventsList = () => {
  const events = [
    {
      title: "Melanated Queerations",
      date: "Mon, Nov 4, 2024",
      timeStart: "12pm",
      timeEnd: "1pm",
      url: "https://events.unomaha.edu/event/melanated-queerations-5538",
      tags: [],
    },
    {
      title: "Native American Heritage Month: Kick-Off Event",
      date: "Mon, Nov 4, 2024",
      timeStart: "12pm",
      timeEnd: "1pm",
      url: "https://events.unomaha.edu/event/native-american-heritage-month-kick-off-event-2024",
      tags: [],
    },
    {
      title: "Office of Engagement Open House",
      date: "Mon, Nov 4, 2024",
      timeStart: "2pm",
      timeEnd: "4pm",
      url: "https://events.unomaha.edu/event/cec-open-house",
      tags: ["Ceremony/Reception"],
    },
    {
      title: "Student Research Symposium",
      date: "Tue, Nov 5, 2024",
      timeStart: "10am",
      timeEnd: "4pm",
      url: "#",
      tags: ["Academic"],
    },
    {
      title: "Career Fair",
      date: "Wed, Nov 6, 2024",
      timeStart: "1pm",
      timeEnd: "5pm",
      url: "#",
      tags: ["Career"],
    },
    {
      title: "Alumni Networking Event",
      date: "Thu, Nov 7, 2024",
      timeStart: "6pm",
      timeEnd: "8pm",
      url: "#",
      tags: ["Networking"],
    },
    {
      title: "International Food Festival",
      date: "Fri, Nov 8, 2024",
      timeStart: "11am",
      timeEnd: "2pm",
      url: "#",
      tags: ["Cultural"],
    },
    {
      title: "Homecoming Game",
      date: "Sat, Nov 9, 2024",
      timeStart: "3pm",
      timeEnd: "6pm",
      url: "#",
      tags: ["Sports"],
    },
    {
      title: "Sustainability Workshop",
      date: "Sun, Nov 10, 2024",
      timeStart: "2pm",
      timeEnd: "4pm",
      url: "#",
      tags: ["Workshop"],
    },
  ];

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
                {event.date}
              </div>
              <div className="event-time">
                <span className="icon clock-icon"></span>
                {event.timeStart} to {event.timeEnd}
              </div>
            </div>
            <div className="event-content">
              {event.tags.length > 0 && (
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
