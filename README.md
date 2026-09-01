# sedatoneer.com

Personal site for Sedat Öner — backend and automation engineer.

The whole site is one MS Paint window sitting on the Windows 95 desktop, and it
actually works like one: the menus open, the window buttons do what they say,
and you can draw on the page with the brush.

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

## What actually works

| Thing | Behaviour |
| --- | --- |
| Tool box | Top group navigates between pages; bottom group is brush + eraser |
| Colour palette | Sets the accent for links and diagram highlights, and the brush colour |
| Brush / eraser | Draws on top of the page. Ctrl+Z undoes a stroke |
| File → Save as PNG | Flattens the drawing onto white and downloads it |
| File → Print | Prints the page content without the window chrome |
| Edit → Copy my email | Writes the address to the clipboard |
| View | Toggles the tool box, the colour box, and full screen |
| Help → About | Windows 95 about box |
| Window buttons | Minimise to the taskbar, maximise, close (asks to save the drawing) |
| Taskbar | Start menu is a second way into the pages; the clock is live |
| Status bar | Cursor coordinates while drawing, otherwise the last action |
| Title bar | Shows `*` while a drawing is unsaved; double-click it to maximise |
| 404 | A Windows 95 error dialog, in both languages |

A drawing belongs to the page it was drawn on, so it is stored against that
path and reads as empty once you navigate away. Nothing is persisted except the
picked colour.

## Drawings

`src/components/paint/hand.ts` generates mouse-drawn strokes: `M x y L x y …`
paths sampled about every 5px, pushed off course by a damped random walk so the
wobble drifts the way a real tremor does instead of buzzing. Circles get a slow
radius wobble and run past where they started. Every stroke is seeded, so the
drawing is identical on the server, in the browser, and between renders.

`Doodle.tsx` uses it for the smiley on the home page and the waving figure on
About, both at the medium brush width and in the palette colour.

## SEO

Per-page `generateMetadata`, canonical + `tr` / `en` / `x-default` hreflang,
`sitemap.xml`, `robots.txt`, a web manifest, an SVG favicon, generated Open
Graph images, and JSON-LD: a `Person` + `WebSite` graph site-wide and an
`ItemList` of `SoftwareSourceCode` on the projects page. `npm run verify`
asserts all of it against a running server.

**`alternates` is replaced, not merged.** A page that sets only `canonical`
silently drops its hreflang links, so always build it with `alternatesFor()`
from `src/lib/site.ts`.

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
- The window fills the viewport and only the canvas scrolls, so the tool box and
  colour box stay reachable on long pages. The taskbar is 30px, reserved with
  padding on the window wrapper.
- Drawing is stored as strokes (points + colour + width), never as pixels, so
  undo and resizing are both just a redraw, and the PNG export can flatten onto
  white.
- Per-page state is derived during render, not reset in an effect — see `board`
  in `PaintWindow.tsx`.
- `src/content/index.ts` compares the two locales at module load and throws if
  their shapes differ, so editing Turkish and forgetting English fails the build
  instead of shipping a page that says less in one language.
- Diagrams live in `src/components/schematics/`. Every stage is numbered because
  these are real sequences, and every arrow is labelled — an unlabelled arrow
  only says "related somehow".

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Pixelify Sans for headings, Tahoma/MS Sans Serif for everything else
