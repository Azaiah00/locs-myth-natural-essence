# QA report: Locs Myth at Natural Essence (October 12, 2026)

Served locally over HTTP **with the production Content-Security-Policy from netlify.toml**, tested in Playwright Chromium. Scripts and screenshots live in the builder's QA folder (`/home/claude/salons/qa/locs-myth-natural-essence/`).

## Visual review
Full-page screenshots of all 6 pages at 390, 768 and 1440 (18 captures, scrolled through first so reveals settle), plus viewport captures of the hero at 390/768/1440, the pinned Loc Journey at five scroll positions (1440x900 and 1280x720), and UI states (menu, lightbox, form errors). Every capture was reviewed and these issues were fixed:
- Mobile hero: the second hero button sat under the fixed Book/Call bar; added bottom clearance.
- A cocoa strip showed below the footer on phones (body padding); moved the clearance into the footer.
- `.sec--deep` rendered near-black (multiply blend); replaced with a deep-cocoa paper tile, then softened its grain.
- Stage-card crops showed two locs; rebuilt as a slim single-loc strip per stage.
- Journey heading sat inside the pinned area (too tall for 720px screens); moved above the pin.
- Stage labels overlapped loc tips; moved below the art.
- Service lists in stage cards were dark-on-dark; added on-dark styling.
- Cream text on sand/cream (journey myth intro, form intro, pricing steps); fixed.
- Quote glyph read as "55"; replaced with a Gloock opening quote.
- FAQ heading touched the list; pricing-explainer heading touched its steps; art-break copy cramped; all spaced.
- Tablet portrait hero crop adjusted so the figure sits below the copy.
- Mobile menu numerals removed (nav order is not a sequence).
- Video did not play in Playwright Chromium (no H.264); added VP9 WebM fallbacks, chosen with `canPlayType`. MP4 stays first for Safari and Chrome.

## Automated checks (all passing)
| Check | Result |
| --- | --- |
| Console errors and CSP violations, 6 pages x 390/768/1440 | 0 |
| Failed local requests | 0 |
| Horizontal overflow, static, 6 pages x 3 widths | none (scrollWidth = viewport) |
| Horizontal overflow sampled every 100 ms while scrolling, 360/390/414 | none |
| Sticky header stays at top after scrolling (desktop and mobile) | yes, every page |
| Mobile Book/Call bar visible under 980px | yes |
| Local links, assets, srcset entries, video sources, lightbox sources, CSS urls | 331 + 4 references, all resolve |
| JSON-LD blocks (HairSalon, WebSite, BreadcrumbList, FAQPage) | 14 blocks, all parse |
| aggregateRating | home page only (Google 4.4 / 98) |
| Exactly one `<h1>` | 6/6 pages |
| Every `<img>` has alt, width, height | 66/66 |
| Titles <= 60 chars / descriptions <= 155 chars | 6/6 |
| Canonical, og:url, og:image, JSON-LD, sitemap, robots on https://locs-myth-natural-essence-demo.netlify.app/ | yes |
| Every Booksy link is the exact booking URL; every "Book" CTA goes to Booksy | 52/52 |
| Stylesheets versioned `?v=20261012a` on every page incl. 404 | yes |
| Stable-scrolling block is the last rule in site.css; no `overflow-x: clip` on html/body/main | yes |
| Photos in aspect-ratio boxes pinned (absolute, inset 0, object-fit) | yes |
| Custom scrollbars (scrollbar-color + ::-webkit-scrollbar), inner scrollers styled | yes |
| Emoji scan of all text files (html, css, js, txt, md, xml, toml, svg, manifest) | none |
| "lorem" / "TODO" / "coming soon" | none |
| Tap targets under 44px (excluding inline text links) | none |
| Mobile menu: opens, focus moves in, Esc closes and returns focus, aria-expanded updates | yes |
| Hero loop: phones load only the 9:16 file; off-screen botanical video not loaded until near | yes |
| Desktop Loc Journey pins and steps through all 5 stages; copper strand drawn | yes |
| Gallery lightbox: opens, arrow keys navigate, Esc closes and returns focus | yes |
| Form: blocks empty submit with inline errors; valid submit shows local preview message | yes |
| Reduced motion: all content visible, no video loaded, no pinning | 6/6 pages |
| JavaScript off: no `.js` gate, so all content is visible | 6/6 pages |
| Share image 1200x630 checked at full size: no overflow, all fonts loaded, no broken images | yes |

## Weight
Site total 5.5 MB on disk (images 3.2 MB incl. 1200w photo originals for the lightbox, video 1.9 MB for 3 loops in two formats, fonts 104 KB). Phones download the 720w loop (481 KB MP4 / 215 KB WebM) and the 900w poster; desktop gets the 1600w loop (531 KB / 179 KB). Each video is under 2.5 MB. Hero poster is preloaded per aspect ratio and is the LCP image; all scripts are deferred; no external requests.

## Not verified here
- Real-device iPhone Safari (MP4 path). Built to the iPhone rules in 05-Lessons-Learned.
- Lighthouse scores (no runner in this environment).
- Netlify Forms submission and live headers (need a deploy).
