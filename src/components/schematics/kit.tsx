import type { ReactNode } from "react";

/* Diagrams drawn the way you'd draw them in Paint: black lines on white,
   square corners, no fills. The one highlighted path uses the colour the
   visitor picked from the palette. */

export const LINE = "#000000";
export const SIGNAL = "var(--accent-ink)";
export const INK = "#000000";
export const INK2 = "#000000";
export const INK3 = "#595959";

export function Frame({
  width,
  height,
  children,
  title,
}: {
  width: number;
  height: number;
  children: ReactNode;
  title: string;
}) {
  return (
    // Focusable so the diagram can be scrolled from the keyboard on narrow screens.
    <div className="overflow-x-auto" tabIndex={0} role="group" aria-label={title}>
      <svg
        role="img"
        aria-label={title}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="h-auto w-full"
        style={{ minWidth: Math.min(width, 620) }}
        shapeRendering="crispEdges"
      >
        <defs>
          <marker
            id="arrow-line"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 7 4 L 0 7 z" fill={LINE} />
          </marker>
          <marker
            id="arrow-signal"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 7 4 L 0 7 z" fill={SIGNAL} />
          </marker>
        </defs>
        {children}
      </svg>
    </div>
  );
}

export function Box({
  x,
  y,
  w,
  h = 46,
  label,
  sub,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  const cx = x + w / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="#ffffff"
        stroke={accent ? SIGNAL : LINE}
        strokeWidth={2}
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 2 : y + h / 2 + 4}
        textAnchor="middle"
        fontFamily="Tahoma, Verdana, sans-serif"
        fontSize={12}
        fill={INK}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={cx}
          y={y + h / 2 + 13}
          textAnchor="middle"
          fontFamily="Tahoma, Verdana, sans-serif"
          fontSize={10}
          fill={INK3}
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

export function Arrow({
  d,
  accent,
  dashed,
}: {
  d: string;
  accent?: boolean;
  dashed?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={accent ? SIGNAL : LINE}
      strokeWidth={accent ? 2 : 1}
      strokeDasharray={dashed ? "4 3" : undefined}
      markerEnd={`url(#${accent ? "arrow-signal" : "arrow-line"})`}
    />
  );
}

export function Caption({
  x,
  y,
  children,
  accent,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: string;
  accent?: boolean;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="Tahoma, Verdana, sans-serif"
      fontSize={10}
      fill={accent ? SIGNAL : INK3}
    >
      {children}
    </text>
  );
}
