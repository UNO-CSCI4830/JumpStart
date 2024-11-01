import requests
from bs4 import BeautifulSoup
from datetime import datetime
import json

def scrape_uno_events():
    url = "https://events.unomaha.edu/calendar/"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        event_cards = soup.find_all('div', class_='em-card')
        
        events = []
        
        for card in event_cards:
            event = {}
            title_elem = card.find('h3', class_='em-card_title')
            if title_elem and title_elem.find('a'):
                event['title'] = title_elem.find('a').text.strip()
                event['url'] = title_elem.find('a')['href']
            
            date_elem = card.find('p', class_='em-card_event-text')
            if date_elem:
                event['datetime'] = date_elem.text.strip()
            
            tags_elem = card.find('div', class_='em-list_tags')
            if tags_elem:
                event['tags'] = [tag.text.strip() for tag in tags_elem.find_all('a')]
            
            if 'title' in event:
                events.append(event)
        
        results = {
            "event_count": len(events),
            "events": events
        }
        
        # Save results to a JSON file
        with open('public/scraper-output.json', 'w') as json_file:
            json.dump(results, json_file, indent=4)  # Save with indentation for readability
        
    except requests.RequestException as e:
        print(f"Error fetching the webpage: {e}")
    except Exception as e:
        print(f"Error processing the data: {e}")

# Run the scraper
if __name__ == "__main__":
    scrape_uno_events()