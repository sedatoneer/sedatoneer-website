/**
 * Four tools, drawn the way Paint drew them: 16×16, one pixel wide, black.
 * Each one stands for a page, so the icon has to say something about the
 * page rather than just fill the button.
 */
const PATHS: Record<string, React.ReactNode> = {
  // Pencil — the home page, where you start drawing.
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
  // Fill / envelope flap — the page that sends something.
  contact: (
    <>
      <path d="M1.5 4.5 h13 v8 h-13 Z" />
      <path d="M1.5 4.5 L8 9.5 L14.5 4.5" />
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
