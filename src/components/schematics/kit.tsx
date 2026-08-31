import type { ReactNode } from "react";

/* Shared drawing language for every schematic: 1px seams, square corners,
   mono labels, amber reserved for the one path that carries the idea. */

export const LINE = "var(--color-line-hi)";
export const SIGNAL = "var(--color-signal)";
export const INK = "var(--color-ink)";
export const INK2 = "var(--color-ink-2)";
export const INK3 = "var(--color-ink-3)";

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
    <div className="overflow-x-auto focus-visible:outline-2" tabIndex={0} role="group" aria-label={title}>
      <svg
        role="img"
        aria-label={title}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="h-auto w-full"
        style={{ minWidth: Math.min(width, 640) }}
      >
        <defs>
          <marker
            id="arrow-line"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 7 4 L 0 7 z" fill={LINE} />
          </marker>
          <marker
            id="arrow-signal"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
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
        fill={accent ? "color-mix(in srgb, var(--color-signal) 10%, transparent)" : "var(--color-panel-hi)"}
        stroke={accent ? SIGNAL : LINE}
        strokeWidth={1}
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4}
        textAnchor="middle"
        className="font-mono"
        fontSize={12}
        fill={accent ? SIGNAL : INK}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={cx}
          y={y + h / 2 + 13}
          textAnchor="middle"
          className="font-mono"
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
      strokeWidth={1}
      strokeDasharray={dashed ? "3 3" : undefined}
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
      className="font-mono"
      fontSize={10}
      letterSpacing="0.06em"
      fill={accent ? SIGNAL : INK3}
    >
      {children}
    </text>
  );
}
