/**
 * 16×16 icons drawn the way Paint drew them: one pixel wide, black, square.
 * Page icons are outlines; the two drawing tools are filled, so they read as a
 * different kind of thing at a glance.
 */
const PATHS: Record<string, React.ReactNode> = {
  // Pencil — the page you start on.
  home: (
    <>
      <path d="M2 14 L2 11 L10 3 L13 6 L5 14 Z" />
      <path d="M10 3 L13 6" />
      <path d="M2 14 L4 12" />
    </>
  ),
  // Selection marquee — a set of things to look through.
  projects: (
    <>
      <path d="M1.5 3.5 h13 v9 h-13 Z" strokeDasharray="2 2" />
      <path d="M4.5 6.5 h4 v4 h-4 Z" />
    </>
  ),
  // Text tool — the page that is mostly words.
  about: (
    <>
      <path d="M3 3 h10" />
      <path d="M8 3 v10" />
      <path d="M5.5 13 h5" />
    </>
  ),
  // Envelope — the page that sends something.
  contact: (
    <>
      <path d="M1.5 4.5 h13 v8 h-13 Z" />
      <path d="M1.5 4.5 L8 9.5 L14.5 4.5" />
    </>
  ),
  // Brush — thin handle, fat bristle blob. Not a pencil, not a block.
  brush: (
    <>
      <path d="M13 1 L15 3 L7 11 L5 9 Z" fill="currentColor" stroke="none" />
      <path d="M5 9 L7 11 L5 15 L1 14 L1 12 Z" fill="currentColor" stroke="none" />
    </>
  ),
  // Eraser — a block in three-quarter view, the way Paint drew it.
  eraser: (
    <>
      <path d="M2.5 8.5 L7.5 3.5 h6 l-5 5 Z" />
      <path d="M2 8 h7 v6 h-7 Z" fill="currentColor" stroke="none" />
      <path d="M9 8 L14 3.5 v5 L9 14 Z" />
    </>
  ),
};

export default function ToolIcon({ name }: { name: keyof typeof PATHS | string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      shapeRendering="crispEdges"
      className="shrink-0"
    >
      {PATHS[name]}
    </svg>
  );
}
