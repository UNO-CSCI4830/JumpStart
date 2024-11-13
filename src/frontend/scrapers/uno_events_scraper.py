import requests
from bs4 import BeautifulSoup
from datetime import datetime
import json
import time

def scrape_uno_events_page(url, all_events):
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        event_cards = soup.find_all('div', class_='em-card')
        
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
                all_events.append(event)
        
        # Find the next page using the exact pagination structure from the HTML
        pagination_items = soup.find_all('a', {
            'class': 'em-pagination-item',
            'aria-current': 'false'
        })
        
        # Find the next page number
        current_page = int(soup.find('div', {'class': 'em-pagination-item active'}).text.strip())
        
        # Look for the link with the next page number
        next_page = None
        for item in pagination_items:
            if item.get('aria-label', '').startswith(f'Page {current_page + 1}'):
                next_page = item
                break
        
        if next_page and next_page.get('href'):
            return next_page['href']
        
        return None

    except requests.RequestException as e:
        print(f"Error fetching the webpage: {e}")
    except Exception as e:
        print(f"Error processing the data: {e}")
    
    return None

def scrape_uno_events():
    base_url = "https://events.unomaha.edu"
    start_url = f"{base_url}/calendar/"
    all_events = []
    
    current_url = start_url
    page_num = 1
    
    while current_url:
        print(f"Scraping page {page_num}: {current_url}")
        next_url = scrape_uno_events_page(current_url, all_events)
        if next_url:
            current_url = base_url + next_url
            page_num += 1
            # Add a delay to be respectful to the server
            time.sleep(1)
        else:
            current_url = None
    
    results = {
        "event_count": len(all_events),
        "events": all_events,
        "pages_scraped": page_num,
        "last_updated": datetime.now().isoformat()
    }
    
    # Save results to a JSON file
    with open('public/scraper-output.json', 'w') as json_file:
        json.dump(results, json_file, indent=4)
    
    print(f"Scraped {len(all_events)} events across {page_num} pages.")

if __name__ == "__main__":
    scrape_uno_events()