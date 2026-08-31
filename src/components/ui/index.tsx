import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Status } from "@/content/types";

/* ── Panel ──────────────────────────────────────────────────── */

export function Panel({
  children,
  className,
  id,
  style,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "article" | "aside";
} & Record<`aria-${string}`, string | undefined>) {
  return (
    <Tag id={id} style={style} className={cn("border border-line bg-panel", className)} {...rest}>
      {children}
    </Tag>
  );
}

/** The strip that runs across the top of a panel, carrying its label. */
export function PanelHeader({
  children,
  aside,
  className,
}: {
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b border-line px-4 py-2.5 sm:px-5",
        className,
      )}
    >
      <span className="label shrink-0 text-ink-2">{children}</span>
      {aside ? <span className="label min-w-0 truncate text-right">{aside}</span> : null}
    </div>
  );
}

/* ── Label ──────────────────────────────────────────────────── */

export function Label({
  children,
  className,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "div" | "h2" | "h3" | "dt";
}) {
  return <Tag className={cn("label", className)}>{children}</Tag>;
}

/* ── Status ─────────────────────────────────────────────────── */

const DOT: Record<Status, string> = {
  running: "bg-signal",
  shipped: "bg-ink-2",
  private: "bg-transparent border border-ink-3",
};

/**
 * A filled amber dot means the system is live right now, so it's the only one
 * that pulses. Shipped is a solid neutral, private is a hollow ring.
 */
export function StatusDot({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-[7px] shrink-0 rounded-full",
        DOT[status],
        status === "running" && "pulse-signal",
        className,
      )}
    />
  );
}

export function StatusTag({
  status,
  label,
  className,
}: {
  status: Status;
  label: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <StatusDot status={status} />
      <span
        className={cn(
          "label",
          status === "running" ? "text-signal" : status === "shipped" ? "text-ink-2" : "text-ink-3",
        )}
      >
        {label}
      </span>
    </span>
  );
}

/* ── Tech chip ──────────────────────────────────────────────── */

export function TechChip({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        "border px-2 py-[3px] font-mono text-[11px] leading-tight tracking-[0.06em] transition-colors",
        active
          ? "border-signal-dim bg-signal/10 text-signal"
          : "border-line text-ink-3",
      )}
    >
      {children}
    </span>
  );
}

/* ── Arrow link ─────────────────────────────────────────────── */

export function ArrowLink({
  href,
  children,
  external,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        "group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]",
        "text-ink-2 transition-colors hover:text-signal",
        className,
      )}
    >
      {children}
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
        &rarr;
      </span>
    </a>
  );
}
