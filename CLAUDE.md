# Baarns MannenKoor — Website

## Project Overview
This is the website for **Baarns MannenKoor** (Baarn Men's Choir), a men's vocal ensemble based in Baarn, Netherlands, founded in 1907. This site replaces the old baarnsmannenkoor.nl with a modern Astro static site hosted on GitHub Pages.

**Owner:** TheSocialChicken (GitHub)
**Tracked in:** [kamitor/K-Libary](https://github.com/kamitor/K-Libary) — `BaarnsMannenKoor/INDEX.md`

---

## Tech Stack
- **Framework:** [Astro](https://astro.build) — static site generator, output: `dist/`
- **Hosting:** GitHub Pages via `.github/workflows/deploy.yml`
- **Styling:** Plain CSS (scoped per component in `.astro` files)
- **Domain:** baarnsmannenkoor.nl (point to GitHub Pages when ready)

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
| Home | `src/pages/index.astro` | Welcome, choir info, rehearsal schedule |
| History | `src/pages/history.astro` | 115+ years of choir history |
| Conductor | `src/pages/conductor.astro` | Mark Walter biography |
| Media | `src/pages/media.astro` | Press coverage and recordings |
| Membership | `src/pages/membership.astro` | How to join |
| Friends | `src/pages/friends.astro` | Sponsorship / Vrienden program |
| Contact | `src/pages/contact.astro` | Contact details and form |

---

## Choir Facts (for content)
- **Full name:** Baarns MannenKoor
- **Founded:** 1907 (115+ years old)
- **Conductor:** Mark Walter (since 2017)
- **Rehearsals:** Every Monday, 7:45–10:00 PM
- **Location:** Gebouw De Pool, Dahliastraat 18, Baarn
- **Old website:** https://baarnsmannenkoor.nl
- **Philosophy:** Serious musicianship + strong camaraderie. No sheet music reading required to join.

---

## Deployment
Every push to `main` automatically deploys to GitHub Pages.

**Custom domain setup (when ready):**
1. Add `public/CNAME` with content `baarnsmannenkoor.nl`
2. In GitHub repo: Settings → Pages → Custom domain → enter `baarnsmannenkoor.nl`
3. Point DNS to GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

---

## Agents

Specialized subagents are available in `.claude/agents/`. The coordinator routes tasks automatically.

| Agent | When to use |
|---|---|
| `coordinator` | Default entry point — routes any task |
| `content-agent` | Add/edit page text, choir news, PDFs, downloads |
| `design-agent` | Components, CSS, layout, responsive design, branding |
| `deploy-agent` | Build verification, GitHub Actions, deployment issues |

**Usage:** Just describe what you want — the coordinator will delegate. Or invoke directly: "Use the design-agent to..." / "Use the content-agent to..."

---

## Future Features (backlog)
- [ ] Ticket sales (Stripe or external ticketing embed)
- [ ] Audio player for recordings
- [ ] Downloadable sheet music (PDF)
- [ ] Events / concerts calendar
- [ ] Photo gallery
- [ ] Newsletter signup

---

## K-Libary Sync
The `kamitor/K-Libary` repo tracks this project. A scheduled GitHub Action (Mondays, 8am) polls this repo's public API and updates `BaarnsMannenKoor/INDEX.md` with latest commit and status. No action needed from this repo's side.
