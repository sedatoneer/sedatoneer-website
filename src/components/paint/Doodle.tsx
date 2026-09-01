import { arc, ring, stroke } from "./hand";

/**
 * Two drawings made with the medium brush, in the colour picked from the
 * palette. Both are built from mouse-sampled points with a shaky hand, so the
 * lines wobble, the circles come out lumpy, and the strokes overrun their
 * ends — the way they do when you actually draw with a mouse.
 */

const BRUSH = 5; // the middle of the three brush widths

function Ink({
  label,
  viewBox,
  className,
  children,
}: {
  label: string;
  viewBox: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={viewBox}
      className={className}
      fill="none"
      stroke="var(--accent-ink)"
      strokeWidth={BRUSH}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function Smiley({ label, className }: { label: string; className?: string }) {
  return (
    <Ink label={label} viewBox="0 0 190 180" className={className}>
      {/* Face — lumpy, and the line runs past where it started */}
      <path d={ring(95, 90, 68, 1207, { shake: 2.6, lumps: 0.055 })} />
      {/* Eyes — two quick downward flicks, not a matching pair */}
      <path d={stroke({ x: 71, y: 66 }, { x: 73, y: 82 }, 4411, { shake: 1.6, bow: 1.5 })} />
      <path d={stroke({ x: 118, y: 63 }, { x: 119, y: 77 }, 9032, { shake: 1.6, bow: -1 })} />
      {/* Smile — sits higher on the right, the way a dragged arc does */}
      <path d={arc(95, 95, 42, 0.42, 2.68, 5518, { shake: 2.2, squash: 0.82 })} />
    </Ink>
  );
}

export function WavingFigure({ label, className }: { label: string; className?: string }) {
  return (
    <Ink label={label} viewBox="0 0 200 210" className={className}>
      {/* Head */}
      <path d={ring(94, 36, 23, 3391, { shake: 2.3, lumps: 0.06 })} />
      {/* Neck, so the arms have somewhere to hang from */}
      <path d={stroke({ x: 94, y: 59 }, { x: 93, y: 73 }, 6612, { shake: 1.6 })} />
      {/* Body, not quite vertical */}
      <path d={stroke({ x: 93, y: 72 }, { x: 90, y: 134 }, 7714, { shake: 2.4, bow: 2 })} />
      {/* Arm hanging down */}
      <path d={stroke({ x: 92, y: 84 }, { x: 54, y: 116 }, 2266, { shake: 2.4, bow: 3 })} />
      {/* Arm raised, swinging clear of the head */}
      <path d={stroke({ x: 95, y: 86 }, { x: 150, y: 42 }, 8123, { shake: 2.4, bow: 3 })} />
      {/* Three fingers, roughly */}
      <path d={stroke({ x: 150, y: 42 }, { x: 144, y: 32 }, 1919, { shake: 1.4 })} />
      <path d={stroke({ x: 150, y: 42 }, { x: 153, y: 30 }, 6070, { shake: 1.4 })} />
      <path d={stroke({ x: 150, y: 42 }, { x: 161, y: 37 }, 3355, { shake: 1.4 })} />
      {/* Legs */}
      <path d={stroke({ x: 90, y: 134 }, { x: 64, y: 186 }, 4802, { shake: 2.6, bow: 3 })} />
      <path d={stroke({ x: 90, y: 134 }, { x: 116, y: 188 }, 5643, { shake: 2.6, bow: -3 })} />
      {/* Two motion lines beside the hand */}
      <path d={arc(156, 40, 19, -1.15, -0.1, 2984, { shake: 1.4 })} strokeWidth={4} />
      <path d={arc(156, 40, 30, -1.05, -0.2, 7451, { shake: 1.4 })} strokeWidth={4} />
    </Ink>
  );
}
