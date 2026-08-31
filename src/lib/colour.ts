/**
 * The colour picked from the palette, kept outside React so the component can
 * read it with useSyncExternalStore instead of hydrating it inside an effect.
 *
 * It lives in localStorage, which means it is per-browser and can be missing
 * (private windows, cleared site data) — the default has to be fine on its own.
 */
const KEY = "paint-colour";
export const DEFAULT_COLOUR = "#ff0000";

const isColour = (value: string | null): value is string =>
  typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);

let memory: string | null = null;
const listeners = new Set<() => void>();

export function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function getSnapshot(): string {
  if (memory) return memory;
  try {
    const saved = localStorage.getItem(KEY);
    if (isColour(saved)) return saved;
  } catch {
    /* storage unavailable — fall through to the default */
  }
  return DEFAULT_COLOUR;
}

export function getServerSnapshot(): string {
  return DEFAULT_COLOUR;
}

export function setColour(value: string) {
  if (!isColour(value)) return;
  memory = value;
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* the colour still applies for this visit */
  }
  listeners.forEach((listener) => listener());
}

/* ── Keeping the picked colour readable ─────────────────────────
   The palette includes white and pale yellow. Those are fine as a
   swatch but unreadable as link text on the canvas, so text and
   diagram strokes use a darkened variant that clears WCAG AA on
   white. The raw colour still shows in the swatch and title icon.
   ───────────────────────────────────────────────────────────── */

function channel(value: number) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(r: number, g: number, b: number) {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Contrast against white. */
function contrastOnWhite(r: number, g: number, b: number) {
  return 1.05 / (luminance(r, g, b) + 0.05);
}

export function textSafe(hex: string): string {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Darken in small steps until the colour is legible on the canvas.
  for (let i = 0; i < 40 && contrastOnWhite(r, g, b) < 4.5; i += 1) {
    r = Math.round(r * 0.88);
    g = Math.round(g * 0.88);
    b = Math.round(b * 0.88);
  }

  const hexPart = (value: number) => value.toString(16).padStart(2, "0");
  return `#${hexPart(r)}${hexPart(g)}${hexPart(b)}`;
}
