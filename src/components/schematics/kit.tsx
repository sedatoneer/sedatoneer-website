import type { ReactNode } from "react";

/* Diagrams drawn the way you'd draw them in Paint: black lines on white,
   square corners, no fills. Every stage is numbered because these really are
   sequences, every arrow is labelled because "related somehow" is not
   information, and the one path that carries the idea takes the colour the
   visitor picked from the palette. */

export const LINE = "#000000";
export const SIGNAL = "var(--accent-ink)";
export const MUTED = "#595959";

const FONT = "Tahoma, Verdana, sans-serif";

/** One figure, one claim. The caption states that claim in words. */
export function Figure({
  width,
  height,
  label,
  caption,
  children,
}: {
  width: number;
  height: number;
  label: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="m-0">
      <div className="overflow-x-auto" tabIndex={0} role="group" aria-label={label}>
        <svg
          role="img"
          aria-label={label}
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          className="h-auto w-full max-w-full"
          style={{ minWidth: Math.min(width, 640) }}
        >
          <defs>
            <marker
              id="tip-line"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill={LINE} />
            </marker>
            <marker
              id="tip-signal"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill={SIGNAL} />
            </marker>
          </defs>
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 max-w-[68ch] text-[12.5px] leading-snug text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

/** A numbered stage in a sequence. */
export function Step({
  x,
  y,
  w,
  h = 58,
  n,
  label,
  sub,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  n?: number;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  const cx = x + w / 2;
  const stroke = accent ? SIGNAL : LINE;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#ffffff" stroke={stroke} strokeWidth={2} />
      {typeof n === "number" ? (
        <>
          <rect x={x + 1} y={y + 1} width={19} height={17} fill={stroke} />
          <text
            x={x + 10}
            y={y + 14}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={11}
            fontWeight="bold"
            fill="#ffffff"
          >
            {n}
          </text>
        </>
      ) : null}
      <text
        x={cx}
        y={sub ? y + h / 2 + 1 : y + h / 2 + 5}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={13}
        fill={LINE}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={cx}
          y={y + h / 2 + 16}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={11}
          fill={MUTED}
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

/** A store or side path — unnumbered, because it isn't a step in the sequence. */
export function Note(props: Omit<Parameters<typeof Step>[0], "n" | "accent">) {
  return <Step {...props} />;
}

export function Arrow({ d, accent, dashed }: { d: string; accent?: boolean; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={accent ? SIGNAL : LINE}
      strokeWidth={accent ? 2 : 1.5}
      strokeDasharray={dashed ? "5 4" : undefined}
      markerEnd={`url(#${accent ? "tip-signal" : "tip-line"})`}
    />
  );
}

/** What the arrow means, sitting on the arrow. */
export function ArrowLabel({
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
      fontFamily={FONT}
      fontSize={11}
      fill={accent ? SIGNAL : MUTED}
    >
      {children}
    </text>
  );
}
