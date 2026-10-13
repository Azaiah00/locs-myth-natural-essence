# Locs Myth at Natural Essence: spec website

A finished spec website by Couture House Co. for **Locs Myth at Natural Essence**, a natural hair salon for locs run by Danyette Thomas at 4142 N Business St, Long Beach, CA 90807 (Bixby Knolls).

Concept: **"Pressed in Copper."** Couture House's embossed copper line-art series (women with locs, botanicals, loc stages, a loctician's hands) carries the brand, extended and animated with Kie.ai. Her real photos appear as "the work," framed like prints on cocoa paper. Every booking button goes to her live Booksy page.

- Live preview (Netlify): https://locs-myth-natural-essence-demo.netlify.app/
- Booking: https://booksy.com/en-us/557302_locs-myth-at-natural-essence_hair-salon_103721_long-beach
- Proposed domain: `locsmyth.com` (check availability; see LAUNCH-NOTES.md)

## Pages
| File | Purpose |
| --- | --- |
| `index.html` | Home: animated hero, proof strip, "full loc journey under one roof," featured prices, pinned Loc Journey, work teaser, the studio, reviews, quick facts, FAQ |
| `services.html` | Full Booksy menu (28 services, 7 groups) with prices, durations and Booksy descriptions; consultation-first explainer |
| `journey.html` | The five stages, install-day walkthrough, care between visits, "Myth vs Truth" FAQ |
| `gallery.html` | 12 real photos as framed prints with a lightbox, plus two illustration breaks |
| `visit.html` | Address, map link, phone, "by appointment" note, Netlify "Questions before you book" form, FAQ |
| `404.html` | Branded not-found page |

## Stack
Static HTML, one stylesheet (`assets/css/site.css`), one vanilla script (`assets/js/site.js`). No frameworks, no external requests. Fonts are self-hosted from Fontsource (Gloock, Cormorant Garamond italic, Hanken Grotesk). Videos are H.264 MP4 with VP9 WebM fallbacks, no audio.

## Preview locally
```
cd locs-myth-natural-essence
python3 -m http.server 8080
```
Then open http://localhost:8080/. (Double-clicking `index.html` also works; fonts and video need the local server.)

## Deploy on Netlify
1. Push this folder to a new GitHub repo.
2. In Netlify: Add new site > Import from Git > pick the repo. Build command: none. Publish directory: `.`
3. Name the site `locs-myth-natural-essence` so the URL matches the canonical tags, or update every `https://locs-myth-natural-essence-demo.netlify.app/` reference (canonical, og:url, og:image, JSON-LD, sitemap.xml, robots.txt, llms.txt) to the real URL.
4. Forms: Netlify detects the `questions` form on deploy. Turn on form notifications (Site settings > Forms) to email the owner.
5. When a custom domain is added, update the same absolute URLs.

`netlify.toml` sets security headers (CSP allows only same-origin scripts, styles, fonts, images and media), caches `/assets/*` for a year, and hides the internal `.md` files.

**Caching rule:** stylesheets are linked as `site.css?v=20261012a`. Bump the version on every page whenever CSS changes, and upload CSS before HTML.
