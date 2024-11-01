import requests
from bs4 import BeautifulSoup
from datetime import datetime

def scrape_uno_events():
    # URL of the events calendar
    url = "https://events.unomaha.edu/calendar/"
    
    try:
        # Send GET request to the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all event cards
        event_cards = soup.find_all('div', class_='em-card')
        
        # List to store event information
        events = []
        
        # Process each event card
        for card in event_cards:
            event = {}
            
            # Get event title
            title_elem = card.find('h3', class_='em-card_title')
            if title_elem and title_elem.find('a'):
                event['title'] = title_elem.find('a').text.strip()
                event['url'] = title_elem.find('a')['href']
            
            # Get event date/time
            date_elem = card.find('p', class_='em-card_event-text')
            if date_elem:
                event['datetime'] = date_elem.text.strip()
            
            # Get event tags
            tags_elem = card.find('div', class_='em-list_tags')
            if tags_elem:
                event['tags'] = [tag.text.strip() for tag in tags_elem.find_all('a')]
            
            # Add event to list if it has at least a title
            if 'title' in event:
                events.append(event)
        
        # Print the results
        print(f"Found {len(events)} events:\n")
        for event in events:
            print(f"Title: {event.get('title')}")
            print(f"Date/Time: {event.get('datetime', 'No date specified')}")
            print(f"URL: {event.get('url')}")
            if 'tags' in event:
                print(f"Tags: {', '.join(event['tags'])}")
            print("-" * 50 + "\n")
            
    except requests.RequestException as e:
        print(f"Error fetching the webpage: {e}")
    except Exception as e:
        print(f"Error processing the data: {e}")

# Run the scraper
if __name__ == "__main__":
    scrape_uno_events()