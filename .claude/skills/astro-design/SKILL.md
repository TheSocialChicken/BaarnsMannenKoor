---
name: astro-design
description: Astro static site design patterns — scoped CSS, component composition, layout slots, image optimization, and Astro-specific best practices for clean maintainable UI
---

# Astro Design Patterns

## Component Structure

Always scope styles with `<style>` in `.astro` files — no class collisions, no CSS leakage.

```astro
---
export interface Props {
  variant?: 'primary' | 'secondary';
  compact?: boolean;
}
const { variant = 'primary', compact = false } = Astro.props;
---

<div class={`card card--${variant} ${compact ? 'card--compact' : ''}`}>
  <slot />
</div>

<style>
  .card { /* scoped automatically */ }
</style>
```

## Prop Patterns

- Use TypeScript interfaces for all Props
- Provide sensible defaults with destructuring
- Boolean props: `compact = false`, never `compact?: boolean` without default
- Variant props: use string unions `'primary' | 'secondary' | 'accent'`

## Layout Slots

Use named slots for flexible layouts:

```astro
<!-- Layout.astro -->
<header><slot name="header" /></header>
<main><slot /></main>
<aside><slot name="sidebar" /></aside>

<!-- Usage -->
<Layout>
  <Nav slot="header" />
  <PageContent />
  <RelatedLinks slot="sidebar" />
</Layout>
```

## CSS Custom Properties

Always use CSS variables — never hardcode colors, spacing, or typography:

```css
/* Reference project tokens, never hardcode */
color: var(--color-primary);
padding: var(--space-lg);
font-family: var(--font-heading);
border-radius: var(--radius-md);
```

## Image Best Practices

```astro
<!-- Use descriptive alt text, set explicit dimensions -->
<img
  src={`${base}/images/choir-photo.jpg`}
  alt="Baarns MannenKoor tijdens concert in Paaskerk Baarn"
  width="800"
  height="500"
  loading="lazy"
  decoding="async"
/>
```

For hero/above-fold images: `loading="eager"`, `fetchpriority="high"`.

## BASE_URL Pattern

Always use `import.meta.env.BASE_URL` for internal links and images (required for GitHub Pages subpath):

```astro
---
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
---
<a href={`${base}/membership`}>Word lid</a>
<img src={`${base}/images/photo.jpg`} alt="..." />
```

## Background Image Hero

When using a photo as hero background, use CSS `background-image` via inline style, not `<img>`:

```astro
<div
  class="hero-photo"
  style={`background-image: url('${backgroundImage}')`}
></div>
```

CSS on the element:
```css
.hero-photo {
  position: absolute;
  inset: 0;
  background-position: center 30%;
  background-size: cover;
  background-repeat: no-repeat;
}
```

## Section Patterns

Standard section structure:
```astro
<section class="section" aria-labelledby="section-id">
  <div class="container">
    <div class="section-header">
      <h2 id="section-id">Heading</h2>
      <hr class="divider" />
    </div>
    <!-- content -->
  </div>
</section>
```

Alternate background sections use `class="section section--alt"`.
Dark sections use `class="section section--dark"`.

## Responsive Breakpoints

This project uses two main breakpoints:
- `640px` — small (mobile → tablet transition)
- `860px` — medium (tablet → desktop)

```css
@media (min-width: 860px) {
  .layout { grid-template-columns: 1fr 280px; }
}
```

## Anti-Patterns to Avoid

- Never hardcode hex colors — use `var(--color-*)` tokens
- Never use `!important`
- Never use inline styles for static values (only for dynamic values like `background-image`)
- Never use `px` for font sizes — use `rem` or `clamp()`
- Never skip `alt` attributes on images
