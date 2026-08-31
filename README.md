# sedatoneer.com

Personal site for Sedat Öner — backend and automation engineer.

The whole site is one MS Paint window sitting on the Windows 95 desktop. The
tool palette on the left is the navigation, and the colour palette at the bottom
actually works: pick a colour and the links and diagrams follow it.

## Run

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /tr
npm run build && npm start
npm run verify       # Playwright checks against a running server
```

`npm run verify` needs a server up. To point it elsewhere:

```bash
BASE=https://sedatoneer.com npm run verify
```

## Editing content

Content lives in `src/content/`, split so the two locales cannot drift apart:

| File | Holds |
| --- | --- |
| `projects.ts` | Locale-independent project facts — status, stack, links, since |
| `tr.ts` / `en.ts` | All copy, including per-project text keyed by slug |
| `types.ts` | The `Content` shape both locales must satisfy |

**Project status is a claim about reality.** Keep it honest:

- `running` — in production or actively developed right now
- `shipped` — finished and released, source is public
- `private` — running, but no public source

`since` is deliberately absent where the real start date isn't recorded. Add it
rather than letting anything guess. Adding a project to `projects.ts` without
matching copy in both locales fails the build, by design.

## Diagrams

`src/components/schematics/` holds hand-authored SVG diagrams — black lines on
white, drawn the way you'd draw them in Paint. No image files to manage. A
project gets one only when there's a real mechanism worth drawing; the rest just
list their stack. Register a new one in `SchematicId` (`src/content/types.ts`)
and the map at the bottom of `src/components/schematics/index.tsx`.

## Notes

- **The colour palette.** `src/lib/colour.ts` stores the picked colour in
  localStorage and hands it to React through `useSyncExternalStore`. It exports
  two values: `--accent` is the raw colour (swatch, title-bar icon) and
  `--accent-ink` is the same colour darkened until it clears WCAG AA on white
  (links, diagram strokes). The palette includes white and pale yellow, so text
  can never use the raw value.
- `--color-shadow` (`#808080`) is for bevels only. Grey **text** uses
  `--color-muted`, which is 7:1 on white.
- `src/app/[locale]/` — `tr` and `en` are prerendered, so `<html lang>`,
  hreflang, and canonical URLs are all correct and an English link is shareable.
- Set `NEXT_PUBLIC_SITE_URL` in the deploy environment. It drives metadata,
  Open Graph, `sitemap.xml`, and `robots.txt` (default: `https://sedatoneer.com`).
- The window fills the viewport and only the canvas scrolls, so the tool palette
  and colour palette stay reachable on long pages.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Pixelify Sans for headings, Tahoma/MS Sans Serif for everything else
