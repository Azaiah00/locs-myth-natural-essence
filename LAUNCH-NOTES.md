# Launch notes: Locs Myth at Natural Essence

Everything below must be confirmed with Danyette Thomas before launch. Facts come from the research dossier (Booksy, Google, Yelp mirrors and other listings, checked October 12, 2026).

## Confirm with the owner
- **Hours.** The site prints no fixed hours. It says "By appointment; see live availability on Booksy." Google lists 8 AM to 8 PM daily; other listings show four other schedules; Booksy's live calendar showed Mon 9 AM to 2 PM. Confirm, then decide whether to add `openingHoursSpecification` to the JSON-LD (currently omitted on purpose).
- **Sisterlocks trademark.** Sisterlocks is a trademark. Danyette does not appear on the official Sisterlocks certified-consultant or trainee registries (checked October 12, 2026). The site names services exactly as Booksy does ("Sisterlock Installation (up to 4" in length)," "Sisterlocks / Micro Locs Maintenance") and makes no certification claim. Ask how she wants these listed; options are leading with "micro locs" or adding her certification details if she has them.
- **Name styling.** Site uses "Locs Myth at Natural Essence" with the wordmark "Locs~Myth" (copper tilde) as Google styles it. Confirm she is happy with this.
- **Phone.** (562) 988-5787 is used everywhere. YellowPages shows (562) 900-7947. Confirm, and confirm the number can receive texts (the footer and Visit page have a "Text the salon" link).
- **Deposit amount and policies.** Booksy says "a consultation and deposit required before appointment is confirmed" but the amount and the cancellation / no-show policy could not be retrieved. Add them to the FAQ if she wants.
- **Prices.** All 28 services, prices and durations are copied from Booksy on October 12, 2026. Every price block carries "Prices from Booksy, October 12, 2026. Final price confirmed at booking." Re-check before launch.
- **Booksy wording tidied on the site:** "thereafte" shown as "thereafter," "Chose" as "Choose," "+20" as "+$20," and the emoji in the install notes removed. "Hair Steaming with Essential Oils" also rendered as "Essential Oles" in one fetch; confirm the name.
- **Booksy listing housekeeping (pitch point):** the stale "vacation December 6-14th 2022" note is still live, and three services are listed twice.
- **Braids.** Her Booksy About says "braids are available," and two Yelp photos are captioned Fulani styles, but no braid services are on the Booksy menu. The gallery shows those two photos with their Yelp captions; the services page lists no braids. Ask whether to add braid services.
- **Other stylists.** Reviews mention Dina, Marina, Briana and Nonnie. None are named on the site. Ask whether to add a team section.
- **Kids.** Google lists the salon as "good for kids." The site does not claim kids' services; add if she wants.
- **Parking.** Not verified, so not mentioned. Add a parking note if she provides one.
- **Reviews.** Snippets are short paraphrases (marked "paraphrased") or short verbatim quotes, attributed by first name or initial and platform. Only the Google 4.4 / 98 rating is in schema (home page only). Booksy shows 5.0 from 69 reviews on the live page (Google shows 77); the site uses 69.
- **Owner reply quote.** The pull quote "Thank you for trusting me with your crown." is from her Booksy reply on September 9, 2025 ("YassssQueen!" and emojis omitted). Confirm she is happy to feature it.
- **Original-website quote.** "As a community of healers we encourage prosperity with a smile, warm heart and plenty of pampering." comes from naturalessencelands.com. Confirm it still reflects her voice. That old Vistaprint site has no address, phone or booking; suggest pointing it at the new site.

## Photos and art (credits and licensing)
- **Her photos** come from the salon's public Booksy page (portfolio, cover photo, one review photo) and public Yelp photos. They must be approved by the owner, and any client in a photo should consent to being shown. Faces appear in two: `beaded-locs-client-smile` (Yelp) and `short-locs-client-selfie` (Booksy review photo). Swap them if needed.
- Files: long-honey-locs-back, copper-orange-ombre-locs, golden-loc-updo-pinned, honey-brown-locs-crown, salon-interior-plants, short-locs-client-selfie (Booksy); interlocked-locs-honey-ends, fresh-retwist-top-view, locs-ponytail-honey-tips, beaded-locs-client-smile, fulani-braids-with-bangs, fulani-braids-jumbo-twists (Yelp).
- Ask for higher-resolution originals; the Yelp files are 750 x 1000.
- **Hero art:** Couture House original line-art series, extended and animated with Kie.ai (Nano Banana Pro + Kling 2.1 Pro). Couture House owns these; licensed to the salon with the site. Files: `art-*.webp`, `assets/video/*.mp4|webm`, `paper-*.webp`.

## Logo
She has no logo file (the Booksy "logo" is a selfie). The site uses a Couture House wordmark ("Locs~Myth" in Gloock, "at Natural Essence" in Hanken Grotesk caps) and an embossed copper "LM" monogram (`monogram.svg`, also the favicon). Offer to finalize a full logo.

## Form
The "Questions before you book" form on `visit.html` is a Netlify Form (`questions`, honeypot field `company`). It works once deployed on Netlify; turn on email notifications to the owner. On localhost it shows a preview message instead of sending.

## Domain
- Proposed: **locsmyth.com** (matches @locsmyth and facebook.com/Locsmyth). Check availability; fallbacks: locsmythlb.com, locsmythbixby.com.
- Until a domain is bought, every canonical, og:url, og:image, JSON-LD, sitemap, robots and llms.txt URL points to https://locs-myth-natural-essence.netlify.app/. If the Netlify name differs, replace it everywhere.

## Pitch points (from research)
- Google listing is unclaimed and shows no website.
- naturalessencelands.com (Vistaprint) has no address, phone, hours, services or booking, and still says "There's much more to come!"
- A duplicate MapQuest listing wrongly calls the business an acupuncture and massage "wellness center."
- Five conflicting hour sets circulate online; YellowPages has a different phone number.
- Yelp Q&A shows unanswered questions (relaxed hair, palm roll vs interlocking, bringing products, reattaching locs); the Journey page's Myth vs Truth section answers them.
