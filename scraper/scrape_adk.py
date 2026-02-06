#!/usr/bin/env python3
"""
ADK Automotive Website Scraper
Scrapes all pages and downloads all images from adkautomotive.com
"""

import os
import re
import json
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse, unquote
from pathlib import Path
import hashlib

class ADKScraper:
    def __init__(self, base_url="https://adkautomotive.com"):
        self.base_url = base_url
        self.visited_urls = set()
        self.downloaded_images = set()
        self.output_dir = Path("scraped_content")
        self.images_dir = self.output_dir / "images"
        self.pages_dir = self.output_dir / "pages"
        self.data_dir = self.output_dir / "data"
        
        # Create directories
        for dir_path in [self.output_dir, self.images_dir, self.pages_dir, self.data_dir]:
            dir_path.mkdir(parents=True, exist_ok=True)
        
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
    
    def is_valid_url(self, url):
        """Check if URL belongs to the same domain"""
        parsed = urlparse(url)
        return parsed.netloc == urlparse(self.base_url).netloc or parsed.netloc == ''
    
    def sanitize_filename(self, url):
        """Create a safe filename from URL"""
        parsed = urlparse(url)
        path = parsed.path.strip('/').replace('/', '_') or 'index'
        if parsed.query:
            query_hash = hashlib.md5(parsed.query.encode()).hexdigest()[:8]
            path += f'_{query_hash}'
        return path
    
    def download_image(self, img_url):
        """Download an image and save it locally"""
        if img_url in self.downloaded_images:
            return
        
        try:
            # Handle relative URLs
            full_url = urljoin(self.base_url, img_url)
            
            print(f"  Downloading image: {full_url}")
            response = self.session.get(full_url, timeout=30)
            response.raise_for_status()
            
            # Get filename from URL
            parsed = urlparse(full_url)
            filename = os.path.basename(unquote(parsed.path))
            
            # If no filename, create one from hash
            if not filename or '.' not in filename:
                ext = '.jpg'  # default
                content_type = response.headers.get('content-type', '')
                if 'png' in content_type:
                    ext = '.png'
                elif 'gif' in content_type:
                    ext = '.gif'
                elif 'svg' in content_type:
                    ext = '.svg'
                filename = hashlib.md5(full_url.encode()).hexdigest() + ext
            
            # Save image
            img_path = self.images_dir / filename
            with open(img_path, 'wb') as f:
                f.write(response.content)
            
            self.downloaded_images.add(img_url)
            print(f"    Saved: {filename}")
            
        except Exception as e:
            print(f"    Error downloading {img_url}: {e}")
    
    def extract_images(self, soup, page_url):
        """Extract and download all images from a page"""
        images = []
        
        # Find all img tags
        for img in soup.find_all('img'):
            src = img.get('src') or img.get('data-src')
            if src:
                images.append(src)
                self.download_image(src)
        
        # Find background images in style attributes
        for elem in soup.find_all(style=re.compile(r'background-image')):
            style = elem.get('style', '')
            urls = re.findall(r'url\(["\']?([^"\']+)["\']?\)', style)
            for url in urls:
                images.append(url)
                self.download_image(url)
        
        # Find images in Squarespace data
        scripts = soup.find_all('script')
        for script in scripts:
            if script.string:
                # Look for image URLs in JSON data
                img_urls = re.findall(r'https?://[^"\s]+\.(?:jpg|jpeg|png|gif|svg|webp)', script.string)
                for url in img_urls:
                    if 'squarespace' in url or 'adkautomotive' in url:
                        images.append(url)
                        self.download_image(url)
        
        return images

    def extract_links(self, soup, current_url):
        """Extract all internal links from a page"""
        links = set()

        for a in soup.find_all('a', href=True):
            href = a['href']
            full_url = urljoin(current_url, href)

            # Remove fragments
            full_url = full_url.split('#')[0]

            if self.is_valid_url(full_url) and full_url.startswith('http'):
                links.add(full_url)

        return links

    def scrape_page(self, url):
        """Scrape a single page"""
        if url in self.visited_urls:
            return []

        print(f"\nScraping: {url}")
        self.visited_urls.add(url)

        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()

            soup = BeautifulSoup(response.text, 'html.parser')

            # Save page HTML
            filename = self.sanitize_filename(url) + '.html'
            page_path = self.pages_dir / filename
            with open(page_path, 'w', encoding='utf-8') as f:
                f.write(response.text)
            print(f"  Saved HTML: {filename}")

            # Extract and save text content
            text_content = soup.get_text(separator='\n', strip=True)
            text_filename = self.sanitize_filename(url) + '.txt'
            text_path = self.pages_dir / text_filename
            with open(text_path, 'w', encoding='utf-8') as f:
                f.write(text_content)
            print(f"  Saved text: {text_filename}")

            # Extract images
            images = self.extract_images(soup, url)
            print(f"  Found {len(images)} images")

            # Extract links
            links = self.extract_links(soup, url)
            print(f"  Found {len(links)} links")

            # Save page metadata
            metadata = {
                'url': url,
                'title': soup.title.string if soup.title else '',
                'images': images,
                'links': list(links),
                'scraped_at': time.strftime('%Y-%m-%d %H:%M:%S')
            }

            metadata_filename = self.sanitize_filename(url) + '.json'
            metadata_path = self.data_dir / metadata_filename
            with open(metadata_path, 'w', encoding='utf-8') as f:
                json.dump(metadata, f, indent=2)

            time.sleep(1)  # Be polite

            return links

        except Exception as e:
            print(f"  Error scraping {url}: {e}")
            return []

    def scrape_all(self):
        """Scrape the entire website"""
        print("Starting ADK Automotive website scrape...")
        print(f"Output directory: {self.output_dir.absolute()}")

        to_visit = {self.base_url}

        while to_visit:
            url = to_visit.pop()

            if url not in self.visited_urls:
                new_links = self.scrape_page(url)

                # Add new links to visit
                for link in new_links:
                    if link not in self.visited_urls:
                        to_visit.add(link)

        # Save summary
        summary = {
            'total_pages': len(self.visited_urls),
            'total_images': len(self.downloaded_images),
            'pages': list(self.visited_urls),
            'images': list(self.downloaded_images),
            'scraped_at': time.strftime('%Y-%m-%d %H:%M:%S')
        }

        summary_path = self.output_dir / 'scrape_summary.json'
        with open(summary_path, 'w', encoding='utf-8') as f:
            json.dump(summary, f, indent=2)

        print("\n" + "="*60)
        print("SCRAPING COMPLETE!")
        print("="*60)
        print(f"Total pages scraped: {len(self.visited_urls)}")
        print(f"Total images downloaded: {len(self.downloaded_images)}")
        print(f"Output directory: {self.output_dir.absolute()}")
        print("="*60)

if __name__ == "__main__":
    scraper = ADKScraper()
    scraper.scrape_all()

