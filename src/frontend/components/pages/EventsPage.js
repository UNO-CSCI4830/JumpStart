import React, { useEffect, useState } from "react";
import "../../styles/Events.css";

const EventsList = () => {
  // state tuple
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(9); // Show 9 events per page

  /* ??? looks like useEffect is an omecient arrow func regardless if its 
   called */
  useEffect(() => {
    /* arrow func with no args attempting to fetch JSON data 
  scraped from UNO events page to be displayed on our site */
    const fetchEvents = async () => {
      /* with an async arrow func */
      try {
        /* Attempts to pull data from JSON that was collected via Python 
      BS scrapper */
        const response = await fetch("/scraper-output.json"); /* assign async 
        fetch object */
        if (!response.ok) {
          /* fetch failed */
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data); // !!!!
        setEvents(data.events);
      } catch (error) {
        /* some other error occured */
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents(); /* useEffect() calling fetchEvents() */
  }, []);

  // Get current events
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="events-container">
      <h2 className="events-title">Upcoming Events</h2>
      <div className="events-grid">
        {currentEvents.map(
          (
            event,
            index /* map each element of events with an 
        arrow func */
          ) => (
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
          )
        )}
      </div>

      {/* Container for pagination buttons */}
      <div className="pagination">
        {/* 
          Create array of page numbers:
          1. Calculate total pages needed by dividing total events by events per page
          2. Round up to handle partial pages (e.g., 22 events with 9 per page = 3 pages)
          3. Create array of that length to map over
        */}
        {Array.from({ length: Math.ceil(events.length / eventsPerPage) }).map(
          (_, index) => (
            /* 
              Create button for each page number
              - key: Required by React for list rendering
              - onClick: Updates current page when clicked
              - className: Applies active styling to current page
            */
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : "" // Add active class if this is current page
              }`}
            >
              {/* Display page number (index + 1 because index starts at 0) */}
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default EventsList;
