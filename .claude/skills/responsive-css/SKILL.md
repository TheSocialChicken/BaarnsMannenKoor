---
name: responsive-css
description: Responsive CSS patterns — fluid typography with clamp(), CSS Grid and Flexbox layouts, mobile-first design, container queries, and common responsive UI components
---

# Responsive CSS Patterns

## Fluid Typography with clamp()

Never use fixed font sizes. Use `clamp(min, preferred, max)`:

```css
/* Pattern: clamp(mobile-size, viewport-relative, desktop-size) */
font-size: clamp(1rem, 2.5vw, 1.25rem);     /* body */
font-size: clamp(1.5rem, 3vw, 2.25rem);     /* h2 */
font-size: clamp(2rem, 5vw, 3.25rem);       /* h1 */
font-size: clamp(2.4rem, 6vw, 4rem);        /* hero title */
```

## Mobile-First Grid

Start with single column, expand at breakpoints:

```css
.grid {
  display: grid;
  grid-template-columns: 1fr;          /* mobile: stack */
  gap: var(--space-lg);
}

@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 860px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

## Common Layout Patterns

### Sidebar Layout

```css
.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3xl);
}

@media (min-width: 860px) {
  .layout { grid-template-columns: 1fr 280px; }
}
```

### Hero with Content Left-Aligned

```css
.hero-content {
  max-width: 700px;       /* constrains text width */
  padding-block: var(--space-4xl);
}
```

### Centered Section Header

```css
.section-header--centered {
  text-align: center;
  max-width: 640px;
  margin-inline: auto;
}
```

## Flexbox Patterns

```css
/* CTA buttons row — wraps on mobile */
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  align-items: center;
}

/* Horizontal → vertical on mobile */
.row {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

@media (min-width: 760px) {
  .row {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
```

## Spacing System

Use the project's spacing tokens — never raw `px` values:

```css
--space-xs: 0.25rem;   /*  4px */
--space-sm: 0.5rem;    /*  8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
--space-4xl: 6rem;     /* 96px */
```

Use `padding-block` / `padding-inline` for logical properties:
```css
padding-block: var(--space-3xl);   /* top + bottom */
padding-inline: var(--space-xl);   /* left + right */
```

## Responsive Images

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Fixed-height image with cover crop */
.photo {
  width: 100%;
  height: 260px;
  object-fit: cover;
}
```

## Card/Grid Patterns

```css
/* Auto-fill grid — cells never below 280px */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-lg);
}
```

## Overlay Pattern (Hero backgrounds)

```css
/* Dark overlay for text readability over photos */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(8, 15, 30, 0.82) 0%,
    rgba(8, 15, 30, 0.65) 50%,
    rgba(8, 15, 30, 0.35) 100%
  );
}
```

Left-heavy gradient keeps text readable while showing photo on right.

## Text Readability

```css
/* Constrain line length for body text */
p { max-width: 70ch; }

/* Hero description */
.hero-description {
  max-width: 52ch;
  line-height: 1.65;
}

/* Readable line height */
body { line-height: 1.7; }
h1, h2, h3 { line-height: 1.25; }
```

## What NOT to Do

- `width: 100vw` on elements inside a container (causes horizontal scroll)
- Fixed `height` on text containers
- `font-size: 12px` or any px font size
- Targeting `@media (max-width: ...)` — always mobile-first with `min-width`
- Forgetting `box-sizing: border-box` (it's in global reset)
