import React, { useEffect, useState } from "react";
import "../../styles/Events.css";

const EventsList = () => {
   // state tuple
  const [events, setEvents] = useState([]);

  /* ??? looks like useEffect is an omecient arrow func regardless if its 
   called */
  useEffect(() => { /* arrow func with no args attempting to fetch JSON data 
  scraped from UNO events page to be displayed on our site */
    const fetchEvents = async () => { /* with an async arrow func */
      try { /* Attempts to pull data from JSON that was collected via Python 
      BS scrapper */
        const response = await fetch("/scraper-output.json"); /* assign async 
        fetch object */
        if (!response.ok) { /* fetch failed */
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data); // !!!!
        setEvents(data.events);
      } catch (error) { /* some other error occured */
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents(); /* useEffect() calling fetchEvents() */
  }, []);

  return (
    <div className="events-container">
      <h2 className="events-title">Upcoming Events</h2>
      <div className="events-grid">
        {events.map((event, index) => ( /* map each element of events with an 
        arrow func */
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
