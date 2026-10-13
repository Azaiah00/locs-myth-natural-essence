# Design system: "Pressed in Copper"

The brand is the art: copper line work embossed into cocoa paper. The page is that paper. Headlines are pressed in, photos are mounted like prints, and one copper strand is drawn down the margin as you read.

## Palette (sampled from the Kie.ai art)
| Token | Hex | Role |
| --- | --- | --- |
| `--cocoa` | #5F3F34 | Main ground (with `paper-cocoa.webp` texture, cut from the art's own paper) |
| `--deep` | #3E2822 | Proof strip, work section (`paper-deep.webp`), header when scrolled, scrollbar track |
| `--espresso` | #241612 | Footer, text on light grounds, text on copper buttons |
| `--copper` | #C98B62 | Decorative line, button fill, strand, scrollbar thumb |
| `--hl` (copper highlight) | #E7B48A | Small accents on dark grounds, italic accents, scrollbar thumb hover |
| `--cream` | #F4E9DE | Body text on cocoa; light reading sections |
| `--sand` | #E3CDB8 | Secondary light sections (FAQ, pricing explainer) |
| `--cream-dim` | #DCC9B8 | Secondary text on cocoa |
| `--ink-soft` | #5A3B30 | Secondary text on cream and sand |

### Measured contrast (WCAG 2.x)
| Pair | Ratio | Use |
| --- | --- | --- |
| cream on cocoa | 7.81 | body text (AA, AAA) |
| cream on deep | 11.46 | body text |
| cream on espresso | 14.65 | footer |
| copper highlight on cocoa | 5.03 | eyebrows, italic accents, links (AA) |
| copper highlight on deep | 7.37 | accents |
| cream-dim on cocoa | 5.83 | secondary text (AA) |
| sand on cocoa | 6.09 | |
| espresso on cream | 14.65 | text on light sections |
| espresso on sand | 11.42 | FAQ |
| ink-soft on cream | 8.35 | secondary text on light |
| espresso on copper | 6.14 | primary button label (AA) |
| copper on cocoa | 3.27 | decorative and large display only (AA large) |
| copper on cream | 2.39 | **never used for text** |

Rules: copper is decorative. Text on cocoa is cream; small accents on cocoa use copper highlight. No copper text on cream.

## Type
- **Gloock** 400: display (H1, H2, prices, wordmark), set tight (-0.012em) with an emboss text-shadow on dark grounds.
- **Cormorant Garamond** 500 italic: accent phrases inside headlines, stage numerals (i. to v.), service descriptions in her words, captions.
- **Hanken Grotesk** 400/500/600: body and UI; uppercase 0.2em-tracked eyebrows.
- Scale: display XL clamp(2.6rem to 5.4rem), L clamp(2.1 to 3.75rem), M clamp(1.6 to 2.35rem); body 17px.

## Motion (all off under `prefers-reduced-motion`; all content visible without JS)
1. **Hero:** Kie.ai loop video (phones get the 9:16 file only, chosen by aspect ratio; MP4, WebM fallback), poster is the LCP image; headline letters press in (blur to sharp, emboss shadow arrives last).
2. **Copper strand:** a two-strand twist SVG drawn down the left margin as you scroll, tip following the reading line (wide screens, 1320px and up).
3. **Loc Journey:** desktop pins the 21:9 loc-stages art; a copper light sweeps from loc to loc while the matching stage card (Consultation, Installation, Maintenance, Repair and restore, Style and color) slides in with real Booksy prices. Phones and tablets get a horizontal snap carousel with a single-loc crop on each card.
4. **Pressed prints:** photos scale from 0.96 to 1 and their deboss inner shadow fades in.
5. **Botanicals:** the plant loop plays behind the studio section (home) and the Visit hero; loaded only near the viewport, paused off-screen.

## Signature details
- Wordmark "Locs~Myth" with a copper SVG tilde; embossed "LM" monogram seal (favicon).
- Price list set like an engraved menu: dotted leaders, "from" in italic, Gloock numerals.
- Custom scrollbars: track #3E2822, thumb #C98B62, hover #E7B48A; inner scrollers (journey carousel, service jump chips) styled to match.
