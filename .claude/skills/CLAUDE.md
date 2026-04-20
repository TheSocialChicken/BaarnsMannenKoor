# Claude Skills — Baarns MannenKoor Website

Local Claude Skills for this project. Claude loads these automatically when working on relevant tasks.

## Available Skills

| Skill | Triggers on |
|---|---|
| `astro-design` | `.astro` components, scoped CSS, props, layouts, image handling |
| `responsive-css` | Grid/flex layouts, breakpoints, fluid typography, spacing |
| `web-accessibility` | ARIA, semantic HTML, focus, contrast, forms |
| `design-system` | Colors, typography, spacing tokens, component variants |

## Install in Claude Code

```bash
/plugin add .claude/skills/astro-design
/plugin add .claude/skills/responsive-css
/plugin add .claude/skills/web-accessibility
/plugin add .claude/skills/design-system
```

## Skill Structure

Each skill is a folder containing `SKILL.md` with YAML frontmatter:

```
skills/
├── astro-design/
│   └── SKILL.md
├── responsive-css/
│   └── SKILL.md
├── web-accessibility/
│   └── SKILL.md
└── design-system/
    └── SKILL.md
```

## Adding New Skills

1. Create folder: `.claude/skills/<skill-name>/`
2. Add `SKILL.md` with frontmatter:
   ```yaml
   ---
   name: skill-name
   description: One-line description used for skill discovery
   ---
   ```
3. Write instructions — be specific, include code examples
4. Register in this file
