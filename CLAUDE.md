# Baarns MannenKoor — Website

## Project Overview
Website for **Baarns MannenKoor** (Baarn Men's Choir), founded 1907. Astro static site on GitHub Pages replacing baarnsmannenkoor.nl.

**Owner:** TheSocialChicken (GitHub)
**Live:** https://thesocialchicken.github.io/BaarnsMannenKoor/
**Old site:** https://baarnsmannenkoor.nl
**Tracked in:** [kamitor/K-Libary](https://github.com/kamitor/K-Libary) — `BaarnsMannenKoor/INDEX.md`

---

## Tech Stack
- **Framework:** Astro (static, output: `dist/`)
- **Hosting:** GitHub Pages via `.github/workflows/deploy.yml` — every push to `main` deploys
- **Styling:** Plain CSS, scoped per `.astro` component, CSS custom properties for all tokens
- **Forms:** formsubmit.co → `info@baarnsmannenkoor.nl`
- **Domain:** baarnsmannenkoor.nl (DNS not yet pointed)

---

## Key Commands
```bash
npm install       # install dependencies
npm run dev       # dev server → http://localhost:4321
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

---

## Site Structure
| Page | File | Description |
|---|---|---|
| Home | `src/pages/index.astro` | Hero with choir photo, intro, rehearsal info, news |
| History | `src/pages/history.astro` | 115+ years timeline |
| Conductor | `src/pages/conductor.astro` | Mark Walter biography + philosophy |
| Media | `src/pages/media.astro` | Concert posters, recordings, press |
| Membership | `src/pages/membership.astro` | Join the choir |
| Friends | `src/pages/friends.astro` | Vrienden sponsorship program |
| Contact | `src/pages/contact.astro` | Form (formsubmit.co) + full board contacts |

---

## Choir Facts
- **Founded:** 1907 (115+ years)
- **Conductor:** Mark Walter (since 2017)
- **Rehearsals:** Every Monday, 19:45–22:00
- **Location:** Gebouw De Pool, Dahliastraat 18, Baarn
- **Philosophy:** Serious musicianship + camaraderie. No sheet music reading required.

## Board Contacts
| Role | Name | Email |
|---|---|---|
| Voorzitter | Jan Kuijer | voorzitter@baarnsmannenkoor.nl |
| Vice-voorzitter | Rudolf van Ommen | vicevoorzitter@baarnsmannenkoor.nl |
| Secretaris | Hans Stalenhoef | secretaris@baarnsmannenkoor.nl |
| Penningmeester | Herman Brink | penningmeester@baarnsmannenkoor.nl |
| Bestuurslid | Arie Zonneveld | — |

**General:** info@baarnsmannenkoor.nl · 06-23665984
**KVK:** 40506315 · **IBAN:** NL20 RABO 0315 9930 06
**Post:** p/a Gerard Doulaan 13, 3741 RE Baarn

---

## Design System
All colors, spacing, typography via CSS custom properties in `src/layouts/Layout.astro`.
- **Colors:** `--color-primary` (#1a2a4a navy), `--color-accent` (#c9923a gold)
- **Fonts:** Georgia (headings), system-ui (body)
- **Hero:** all pages use `8782@2x.jpg` as background via `backgroundImage` prop on `Hero.astro`
- See `.claude/skills/design-system/SKILL.md` for full token reference

## BASE_URL Pattern
GitHub Pages serves from `/BaarnsMannenKoor/` subpath. Always use:
```astro
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
// then: href={`${base}/page`} and src={`${base}/images/file.jpg`}
```

---

## Agents & Skills

### Agents (`.claude/agents/`)
| Agent | When to use |
|---|---|
| `coordinator` | Default entry point |
| `content-agent` | Page text, news, PDFs |
| `design-agent` | Components, CSS, layout |
| `deploy-agent` | Build, GitHub Actions, deployment |

### Skills (`.claude/skills/`)
| Skill | Covers |
|---|---|
| `astro-design` | Component patterns, scoped CSS, image handling |
| `responsive-css` | Grid/flex, clamp(), breakpoints, spacing |
| `web-accessibility` | ARIA, semantic HTML, focus, contrast |
| `design-system` | Color/type/spacing tokens, component variants |
| `frontend-design` | Avoid generic AI aesthetics, bold design decisions |
| `webapp-testing` | Playwright UI testing against local dev server |
| `playwright-skill` | General browser automation |

---

## Deployment
Push to `main` → GitHub Actions builds and deploys automatically.

**Custom domain setup (when ready):**
1. Add `public/CNAME` with content `baarnsmannenkoor.nl`
2. GitHub repo Settings → Pages → Custom domain → `baarnsmannenkoor.nl`
3. DNS A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

---

## Backlog

### High priority
- [ ] **Ticket sales** — embed external ticketing (Eventbrite / TicketTailor / iTickets) or Stripe Checkout for concert tickets. TicketTailor works well for small orgs, no per-ticket fee.
- [ ] **Video/media carousel** — carousel on Media page for YouTube concert recordings; use YouTube embed (no cookies variant: `youtube-nocookie.com`) with lazy load

### Medium priority
- [ ] **Mark Walter — more info** — expand conductor page with his own concerts/performances, recordings, other ensembles he works with
- [ ] **Newsletter signup** — Mailchimp or Buttondown embed, probably on homepage and membership page
- [ ] **Downloadable PDFs** — sheet music, flyers (WERVINGSFLYERPROJECTKOOR2026.pdf already in `public/images/`)

### Low priority / polish
- [ ] **SEO meta tags** — Open Graph image, Twitter card, structured data (LocalBusiness schema for choir)
- [ ] **Cookie banner** — only needed if analytics added
- [ ] **Analytics** — Fathom or Plausible (privacy-friendly, no cookie banner needed)
- [ ] **Search** — Pagefind static search (Astro integration available)
- [ ] **Sitemap** — `@astrojs/sitemap` removed (crashes with `base` path in v3.7.3); re-add when fixed upstream

### Done
- [x] **Events page** — `src/pages/events.astro`
- [x] **404 page** — `src/pages/404.astro`
- [x] **Video carousel** — YouTube embeds on Media page
- [x] **Audio player** — native `<audio>` on Media page
- [x] **Lightbox gallery** — Media page
- [x] **PDF downloads** — WERVINGSFLYERPROJECTKOOR2026.pdf linked

---

## K-Libary Sync
`kamitor/K-Libary` has a scheduled GitHub Action (Mondays, 8am) that polls this repo and updates `BaarnsMannenKoor/INDEX.md`. No action needed here.
