# ADK Automotive Website Scrape

Complete scrape of adkautomotive.com performed on February 6, 2026

## Summary

- **Total Pages Scraped:** 86
- **Total Images Downloaded:** 224
- **Base URL:** https://adkautomotive.com

## Directory Structure

```
scraped_content/
├── README.md (this file)
├── scrape_summary.json (detailed JSON summary)
├── pages/ (HTML and text content from all pages)
│   ├── *.html (raw HTML files)
│   └── *.txt (extracted text content)
├── images/ (all images from the website)
│   └── *.jpg, *.png, *.jpeg, *.gif, *.svg
└── data/ (metadata for each page)
    └── *.json (page metadata including links and images)
```

## Main Pages Scraped

1. **Home Page** (`index.html`)
   - Main landing page with hero images
   - Contact form
   - Sponsor logos
   - Event highlights

2. **ADK Supercar Shows** (`adksupercarshow.html`)
   - Event information
   - Photo galleries
   - Past event archives

3. **ADK Road Rally** (`adk-road-rally.html`)
   - Rally event details
   - Route information
   - Photo galleries from past rallies

4. **Event Calendar** (`events.html`)
   - Full event listing
   - Individual event pages
   - Calendar integration (iCal files)

5. **Sponsorship** (`sponsorship.html`)
   - Sponsorship opportunities
   - Sponsor benefits
   - Contact information

6. **Become a Vendor** (`adkvendor.html`)
   - Vendor application information
   - Requirements and benefits

7. **About** (`about.html`)
   - Company information
   - Team photos
   - Mission and values

## Content Categories

### Events
- ADK Supercar Shows
- ADK Road Rally (multiple events)
- Lancaster Supercar Cruise
- Houston Cars and Coffee
- Supercars at Sunset
- Supercars at CarVault Open House
- ADK Turkey Drive
- ADK Christmas Toy Drive
- Morgantown Supercar Show

### Images
All images have been downloaded and organized in the `images/` directory, including:
- Event photos
- Car photos
- Drone photography
- Sponsor logos
- Team photos
- Event flyers and promotional materials

### Key Sponsors (from logos)
- Manheim Imports
- Sun Protectors - Ephrata
- KP Elite
- Bush Auto Group Collision & Detail
- The Paint Doctor & Collision Works
- CarVault
- JSG (Jersey Shore Graphics)
- And many more

## Social Media Links

- Instagram: @adk_automotive
- Facebook: /adkautomotivechannel
- Email: info@adkautomotive.com
- YouTube: ADK Automotive Channel

## Location

Lancaster, PA

## Technical Details

- Website Platform: Squarespace
- Template: Version 7.1
- CDN: Squarespace CDN for images
- Forms: Squarespace Forms with reCAPTCHA

## Notes

- All HTML files preserve the original structure and styling
- Text files contain extracted content for easy reading
- JSON metadata files include all links and image references
- Images are saved with their original filenames where possible
- Some images may have duplicate filenames with query parameters removed

## Usage

This scraped content can be used as reference for:
- Content migration to a new platform
- Design inspiration and layout planning
- Content inventory and audit
- SEO analysis
- Preserving historical content

## Next Steps for Redesign

1. Review all content in the `pages/*.txt` files
2. Organize images by category/event
3. Create content structure for new design
4. Identify which content to keep, update, or remove
5. Plan new navigation and information architecture

