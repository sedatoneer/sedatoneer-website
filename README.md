# sedatoneer.com

Personal site for Sedat Öner — backend and automation engineer.

The design direction is **Control Room**: the portfolio as a status page for a
person. Every project is a system with a real lifecycle state, and the stack
graph on the home page is generated from the project data rather than drawn.

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

`src/components/schematics/` holds hand-authored SVG diagrams — no image files
to manage, and they follow the theme. A project gets one only when there's a
real mechanism worth drawing; the rest just show their stack. Register a new one
in `SchematicId` (`src/content/types.ts`) and the map at the bottom of
`src/components/schematics/index.tsx`.

## Notes

- `src/app/[locale]/` — `tr` and `en` are prerendered, so `<html lang>`,
  hreflang, and canonical URLs are all correct and an English link is shareable.
- Set `NEXT_PUBLIC_SITE_URL` in the deploy environment. It drives metadata,
  Open Graph, `sitemap.xml`, and `robots.txt` (default: `https://sedatoneer.com`).
- The OG image is generated at `src/app/[locale]/opengraph-image.tsx`. It cases
  Turkish text in JS, not CSS — Satori has no `lang` context, so
  `text-transform: uppercase` would produce "MÜHENDISI".
- Design tokens and the type scale are in `src/app/globals.css`. Every text
  colour clears WCAG AA on both surfaces; `verify` re-checks it with axe.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Archivo / Public Sans / JetBrains Mono
