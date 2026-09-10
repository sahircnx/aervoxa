# Aervoxa Brand, UX & da.live Authoring Plan

> Plan mode is active — this artifact captures the strategy, architecture, and authoring blueprint. The **Home page** deliverable is drafted in full below (Phase 3) so you can review direction. The remaining pages (Products, Company, Accessories) and any live da.live upload/import require **Execute mode**.

---

## Phase 1 — Brand Strategy & Architecture

### Brand Identity
- **Positioning:** Premium, innovation-led residential & commercial cooling — a challenger to LG/Daikin built on efficiency, quiet performance, and modern design.
- **Core values:** Cooling efficiency · Reliability · Modern aesthetics · Smart innovation · Sustainability (energy savings).
- **Tone of voice:** Confident, clean, aspirational-but-clear. Short benefit-led headlines, plain-language specs, no jargon overload.
- **Tagline candidates:** *"Air, Perfected."* · *"Cool by Design."* · *"Intelligent Cooling for Modern Living."*

### Color Palette
| Role | Suggestion | Use |
|---|---|---|
| Primary | Cooling blue `#0A6EBD` | CTAs, links, accents |
| Deep accent | Arctic navy `#0B2A45` | Headers, footer |
| Neutral base | Crisp white `#FFFFFF` / off-white `#F5F8FB` | Backgrounds |
| Metallic | Silver-grey `#C7CED6` | Dividers, product surfaces |
| Cool mist | Ice cyan `#E6F4FB` | Section tints |
| Signal | Fresh mint `#2FBF9F` | Eco/energy badges |

### Typography
- Headings: geometric sans (e.g. *Inter / Poppins / DM Sans*).
- Body: neutral humanist sans for readability.

### Sitemap
```
Home
├── Residential ACs
│   ├── Split ACs
│   ├── Window ACs
│   └── Smart / Inverter ACs
├── Commercial ACs
│   ├── Cassette & Ductable
│   └── VRF Systems
├── Accessories (filters, stabilizers, remotes, smart kits)
├── Innovation / Technology
├── Company (About Us)
│   ├── Sustainability
│   └── Careers
└── Support
    ├── Contact / Service Request
    ├── Warranty & Registration
    └── FAQ
```

---

## Phase 2 — UI/UX & Asset Curation

### Layout Strategy (primary pages)

**Home**
1. Hero banner — headline, subcopy, primary CTA, hero product/lifestyle image
2. Trust strip — energy rating / warranty / awards (columns)
3. Category cards — Residential · Commercial · Accessories
4. Feature highlights grid — Inverter tech, Quiet mode, Air purification, Smart control
5. Product showcase / carousel — hero models
6. Sustainability band — energy savings message
7. Testimonials / reviews
8. Support & contact CTA band

**Product listing (Residential/Commercial)**
Hero → filter/intro text → product cards grid → comparison columns → tech callouts → CTA.

**Company**
Hero → brand story (text) → values columns → milestones/stats → sustainability → careers CTA.

**Accessories**
Hero → category cards → featured accessories grid → compatibility note → support CTA.

### Image Sourcing Prompts (Unsplash / stock search terms)
- "Family relaxing in a bright modern living room, comfortable, cool tones"
- "Sleek white split air conditioner mounted on minimalist wall"
- "Modern apartment interior with large windows, soft daylight"
- "Close-up of air conditioner vents, clean product detail"
- "Smart home control on smartphone, climate app"
- "Commercial office ceiling cassette air conditioning"
- "Green leaf / energy efficiency abstract, blue and white"
- "Engineer installing air conditioner, professional service"

---

## Phase 3 — da.live Authoring (Home page draft)

> These are standard AEM Edge Delivery Services block tables (da.live copy-paste ready). Section breaks use a horizontal rule `---`. Block name goes in the first cell of the top row.

### Section 1 — Hero
```
+---------------------------------------------------------------+
| Hero                                                          |
+---------------------------------------------------------------+
| Air, Perfected.                                               |
|                                                               |
| Intelligent cooling that blends whisper-quiet performance     |
| with energy-saving inverter technology — designed for modern  |
| living.                                                       |
|                                                               |
| [Explore Residential ACs](/residential-acs)                   |
| ![Sleek Aervoxa split AC on a minimalist wall](/images/hero-ac.jpg) |
+---------------------------------------------------------------+
```

### Section 2 — Trust strip
```
+-------------------+-------------------+-------------------+
| Columns                                                   |
+-------------------+-------------------+-------------------+
| **5★ Energy**     | **10-Yr Warranty**| **Award-Winning** |
| Best-in-class     | On inverter       | Design & quiet    |
| efficiency        | compressor        | performance       |
+-------------------+-------------------+-------------------+
```

### Section 3 — Category Cards
```
+---------------------------------------------------------------+
| Cards                                                         |
+---------------------------------------------------------------+
| ![Residential AC](/images/cat-residential.jpg)                |
| **Residential ACs** Split, window & smart inverter units for  |
| every room. [Shop Residential](/residential-acs)              |
+---------------------------------------------------------------+
| ![Commercial AC](/images/cat-commercial.jpg)                  |
| **Commercial ACs** Cassette, ductable & VRF systems for       |
| business spaces. [Explore Commercial](/commercial-acs)        |
+---------------------------------------------------------------+
| ![Accessories](/images/cat-accessories.jpg)                   |
| **Accessories** Filters, stabilizers & smart kits.            |
| [Browse Accessories](/accessories)                            |
+---------------------------------------------------------------+
```

### Section 4 — Feature highlights (Cards)
```
+---------------------------------------------------------------+
| Cards (features)                                              |
+---------------------------------------------------------------+
| ![Inverter](/images/f-inverter.svg) **Dual Inverter** Saves   |
| up to 60% energy with variable-speed cooling.                 |
+---------------------------------------------------------------+
| ![Quiet](/images/f-quiet.svg) **Whisper Quiet** As low as     |
| 19 dB for undisturbed comfort.                                |
+---------------------------------------------------------------+
| ![Purify](/images/f-purify.svg) **Air Purification** Multi-   |
| stage filtration for cleaner air.                             |
+---------------------------------------------------------------+
| ![Smart](/images/f-smart.svg) **Smart Control** Manage        |
| cooling from anywhere via the Aervoxa app.                    |
+---------------------------------------------------------------+
```

### Section 5 — Sustainability band + Section Metadata
```
+---------------------------------------------------------------+
| Text                                                          |
+---------------------------------------------------------------+
| ## Cooling that cares                                         |
| Aervoxa inverter systems cut energy use and refrigerant       |
| impact — comfort you feel good about.                         |
| [Discover our technology](/innovation)                        |
+---------------------------------------------------------------+

+------------------+--------------------------------------------+
| Section Metadata                                              |
+------------------+--------------------------------------------+
| Style            | highlight, cool-mist                       |
+------------------+--------------------------------------------+
```

### Section 6 — Testimonials + Support CTA
```
+---------------------------------------------------------------+
| Cards (testimonials)                                          |
+---------------------------------------------------------------+
| "Coolest, quietest AC we've owned." — **Priya S.**            |
+---------------------------------------------------------------+
| "Our electricity bill dropped noticeably." — **Rahul M.**     |
+---------------------------------------------------------------+

+---------------------------------------------------------------+
| Hero (cta)                                                    |
+---------------------------------------------------------------+
| ## Need help choosing?                                        |
| Our experts will match the right cooling solution to your     |
| space. [Contact Support](/support/contact)                    |
+---------------------------------------------------------------+
```

### Page Metadata
```
+------------------+--------------------------------------------+
| Metadata                                                      |
+------------------+--------------------------------------------+
| Title            | Aervoxa — Air, Perfected. Smart Cooling    |
| Description      | Premium residential & commercial air       |
|                  | conditioners with inverter efficiency,     |
|                  | quiet performance and smart control.       |
| Image            | /images/hero-ac.jpg                        |
+------------------+--------------------------------------------+
```

---

## Checklist

- [ ] Confirm brand direction (palette, tagline, tone) — Phase 1
- [ ] Confirm sitemap / page scope — Phase 1
- [ ] Approve Home page layout & block choices — Phase 2/3
- [ ] Verify available blocks in the project (Hero, Cards, Columns variants) against actual repo block inventory
- [ ] Finalize Home page markdown and adapt block names to project conventions
- [ ] Author **Products** (Residential/Commercial) page markdown
- [ ] Author **Company / About Us** page markdown
- [ ] Author **Accessories** page markdown
- [ ] Source & place hero/category/feature images (per Phase 2 prompts)
- [ ] (Execute mode) Upload/preview pages in da.live and verify rendering
- [ ] (Execute mode) Review against preview and refine styling

---

### Notes for execution
- Block names above (Hero, Cards, Columns, Text, Section/Metadata) are **standard EDS defaults** — before finalizing I'll check this project's actual block palette and any custom variants already built (the repo already has hero, features-grid and product-showcase blocks) and map the content to those exact names.
- **Executing the work** (finalizing all four pages and any da.live upload/preview) requires switching to **Execute mode**.

Would you like me to proceed on execution with all four pages, or focus only on Home first?
