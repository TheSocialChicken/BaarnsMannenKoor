---
name: web-accessibility
description: Web accessibility patterns — semantic HTML, ARIA roles and labels, keyboard navigation, focus management, color contrast, and WCAG 2.1 AA compliance for web projects
---

# Web Accessibility Patterns

## Semantic HTML First

Use the right element before reaching for ARIA. ARIA supplements; it never replaces semantic HTML.

```html
<!-- Wrong -->
<div class="button" onclick="submit()">Send</div>

<!-- Right -->
<button type="submit">Send</button>
```

Semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<address>`, `<time>`.

## Landmark Regions

Every page must have exactly one `<main>`. Use `id="main-content"` for skip links:

```html
<a href="#main-content" class="skip-link">Sla navigatie over</a>
<header>...</header>
<main id="main-content">...</main>
<footer>...</footer>
```

## Headings

One `<h1>` per page. Headings must be sequential — never skip levels (h1 → h3).

## ARIA Labels on Sections

Label sections so screen readers announce them:

```astro
<section aria-labelledby="section-id">
  <h2 id="section-id">Section Title</h2>
</section>

<!-- When no visible heading -->
<nav aria-label="Hoofdnavigatie">...</nav>
<aside aria-label="Snel overzicht">...</aside>
```

## Images

Every `<img>` needs `alt`. Alt text describes the *purpose*, not the pixels:

```html
<!-- Informative image -->
<img alt="Baarns MannenKoor tijdens kerstconcert in Paaskerk Baarn" />

<!-- Decorative — empty alt hides it from screen readers -->
<img alt="" aria-hidden="true" />

<!-- Functional (button/link image) — describe the action -->
<a href="/home"><img alt="Baarns MannenKoor, terug naar home" /></a>
```

## Interactive Elements

Buttons for actions, links for navigation:

```html
<!-- Action: use button -->
<button type="button" aria-expanded="false" aria-controls="nav-menu">
  Menu openen
</button>

<!-- Navigation: use link -->
<a href="/membership">Word lid</a>
```

Always set `aria-expanded` on toggles, update it with JS:

```js
toggle.setAttribute('aria-expanded', String(!isOpen));
toggle.setAttribute('aria-label', isOpen ? 'Menu openen' : 'Menu sluiten');
```

## Focus Management

Visible focus indicator is required — never remove it:

```css
a:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* Never do this without a replacement: */
/* *:focus { outline: none; } */
```

## Forms

Every input needs a `<label>`. Link with `for`/`id`:

```html
<label for="email" class="form-label">
  E-mailadres <span class="required" aria-hidden="true">*</span>
</label>
<input
  type="email"
  id="email"
  name="email"
  required
  autocomplete="email"
  aria-describedby="email-hint"
/>
<p id="email-hint" class="hint">Wij delen uw adres niet.</p>
```

Required fields: mark visually AND programmatically (`required` attribute).

## Color Contrast

WCAG AA minimums:
- Normal text (< 18pt): **4.5:1** contrast ratio
- Large text (≥ 18pt / 14pt bold): **3:1**
- UI components and icons: **3:1**

This project's color tokens already meet AA:
- `--color-primary` (#1a2a4a) on `--color-white`: ~12:1 ✓
- `--color-white` on hero overlays with `rgba(8,15,30,0.82)`: verified ✓

Never communicate information by color alone — always pair with text or icon.

## Motion / Animation

Respect reduced motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Screen Reader Only Content

For visually hidden but accessible text:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

Use for: skip links (show on focus), icon-only buttons, extra context for screen readers.

## `aria-hidden="true"`

Use to hide decorative content from screen readers:

```html
<div class="fact-number" aria-hidden="true">1907</div>
<span class="icon" aria-hidden="true">♪</span>
```

Never hide interactive content (links, buttons) with `aria-hidden`.

## Checklist Before Shipping

- [ ] All images have `alt` text
- [ ] Skip link exists and works
- [ ] One `<h1>` per page, headings sequential
- [ ] All `<section>` elements have `aria-labelledby`
- [ ] All form inputs have `<label>`
- [ ] Focus indicators visible
- [ ] Keyboard navigation works (Tab, Shift+Tab, Enter, Space)
- [ ] Color contrast passes WCAG AA
- [ ] Page works without JavaScript for core content
