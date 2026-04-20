---
name: design-system
description: Design system for Baarns MannenKoor website — color tokens, typography scale, spacing system, component variants, and visual identity guidelines
---

# Baarns MannenKoor Design System

## Brand Identity

Traditional, dignified, warm. Navy + gold. Think heritage choir, not startup SaaS.
Avoid: gradients that look techy, rounded corners > 12px, bright saturated colors.

## Color Tokens

```css
--color-primary:       #1a2a4a;  /* Deep navy — headings, nav, hero bg */
--color-primary-dark:  #0f1a30;  /* Darker navy — hover states */
--color-primary-light: #243560;  /* Lighter navy — subtle variants */
--color-accent:        #c9923a;  /* Gold/amber — dividers, borders */
--color-accent-light:  #dba84f;  /* Lighter gold — eyebrow text on dark */
--color-accent-dark:   #a87530;  /* Darker gold — links, CTAs on light */
--color-bg:            #faf8f4;  /* Warm off-white — page background */
--color-bg-alt:        #f2ede6;  /* Warmer off-white — alternate sections */
--color-text:          #2c2c2c;  /* Near-black — body text */
--color-text-muted:    #6b6560;  /* Warm grey — secondary text */
--color-border:        #ddd8d0;  /* Warm border */
--color-white:         #ffffff;
```

### Usage Rules

- **Headings/nav**: `--color-primary`
- **Body text**: `--color-text`
- **Muted text** (captions, meta): `--color-text-muted`
- **Dividers/accents**: `--color-accent`
- **Section backgrounds**: alternate `--color-bg` and `--color-bg-alt`
- **Dark sections**: `--color-primary` background, white text

## Typography

```css
--font-heading: Georgia, "Times New Roman", serif;  /* Dignified, traditional */
--font-body: "Segoe UI", system-ui, -apple-system, sans-serif;  /* Clean, readable */
```

### Type Scale

```css
h1 { font-size: clamp(2rem, 5vw, 3.25rem); }
h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); }
h3 { font-size: clamp(1.15rem, 2vw, 1.5rem); }
h4 { font-size: 1.15rem; }
```

Hero title: `clamp(2.4rem, 6vw, 4rem)`

### Eyebrow Text (section labels above headings)

```css
font-size: 0.78rem;
font-weight: 700;
letter-spacing: 0.22em;
text-transform: uppercase;
color: var(--color-accent-light);  /* on dark bg */
/* or */
color: var(--color-accent-dark);   /* on light bg */
```

## Spacing Scale

```
xs   0.25rem   4px
sm   0.5rem    8px
md   1rem      16px
lg   1.5rem    24px
xl   2rem      32px
2xl  3rem      48px
3xl  4rem      64px
4xl  6rem      96px
```

Section padding: `padding-block: var(--space-3xl)` (compact: `--space-2xl`).

## Shadows

```css
--shadow-sm:  0 1px 3px rgba(0,0,0,0.08);   /* cards, inputs */
--shadow-md:  0 4px 12px rgba(0,0,0,0.10);  /* elevated cards, photos */
--shadow-lg:  0 8px 24px rgba(0,0,0,0.12);  /* hero image, modals */
```

## Border Radius

```css
--radius-sm:  3px;   /* badges, chips */
--radius-md:  6px;   /* buttons, inputs */
--radius-lg:  12px;  /* cards, photos, sections */
```

## Component Variants

### Buttons

```css
/* Primary — navy fill */
.btn--primary {
  background: var(--color-accent);
  color: var(--color-white);
}

/* Outline on dark background */
.btn--outline {
  border: 2px solid rgba(255,255,255,0.6);
  color: var(--color-white);
}

/* Outline on light background */
.btn--outline-dark {
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}
```

### Sections

| Class | Background | Use |
|---|---|---|
| `.section` | `--color-bg` | Default |
| `.section.section--alt` | `--color-bg-alt` | Alternating |
| `.section.section--dark` | `--color-primary` | CTA, pull-quote |

### Cards

```css
.card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
}

/* Accent variant — left border */
.card--accent {
  border-left: 4px solid var(--color-accent);
}
```

### Dividers

```css
.divider {
  border: none;
  border-top: 2px solid var(--color-accent);
  width: 48px;
  margin-block: var(--space-lg);
}

.divider--center { margin-inline: auto; }
```

## Hero Variants

| Variant | When | Min-height |
|---|---|---|
| Full hero (no `compact`) | Homepage only | 640px |
| Compact hero (`compact={true}`) | All inner pages | 320px |

Both support `backgroundImage` prop — use `8782@2x.jpg` for the choir photo.

## Anti-Patterns

- Bright primary colors like `#ff0000` or `#00bcd4`
- `border-radius: 50%` on non-circular elements
- Drop shadows on text (only on images/cards)
- Multiple font families beyond the two defined
- All-caps body text (eyebrows only)
