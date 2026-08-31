"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { TechNode } from "@/lib/graph";
import type { Status } from "@/content/types";
import { cn } from "@/lib/cn";
import { StatusDot } from "@/components/ui";

export interface GraphProject {
  slug: string;
  name: string;
  status: Status;
}

interface Edge {
  key: string;
  tech: string;
  slug: string;
  d: string;
}

interface Props {
  shared: TechNode[];
  projects: GraphProject[];
  pinned: string | null;
  onPin: (tech: string | null) => void;
  hrefFor: (slug: string) => string;
  usedInLabel: (count: number) => string;
}

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function StackGraph({
  shared,
  projects,
  pinned,
  onPin,
  hrefFor,
  usedInLabel,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const techRefs = useRef(new Map<string, HTMLElement>());
  const projectRefs = useRef(new Map<string, HTMLElement>());

  const [edges, setEdges] = useState<Edge[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [hoverTech, setHoverTech] = useState<string | null>(null);
  const [hoverProject, setHoverProject] = useState<string | null>(null);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container || container.offsetParent === null) return;

    const base = container.getBoundingClientRect();
    if (base.width === 0) return;

    const next: Edge[] = [];

    for (const tech of shared) {
      const from = techRefs.current.get(tech.name);
      if (!from) continue;
      const f = from.getBoundingClientRect();
      const x1 = f.right - base.left;
      const y1 = f.top + f.height / 2 - base.top;

      for (const slug of tech.projects) {
        const to = projectRefs.current.get(slug);
        if (!to) continue;
        const t = to.getBoundingClientRect();
        const x2 = t.left - base.left;
        const y2 = t.top + t.height / 2 - base.top;
        const bend = (x2 - x1) * 0.5;

        next.push({
          key: `${tech.name}::${slug}`,
          tech: tech.name,
          slug,
          d: `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`,
        });
      }
    }

    setBox({ w: base.width, h: base.height });
    setEdges(next);
  }, [shared]);

  useIsomorphicLayoutEffect(() => {
    measure();
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [measure]);

  // Re-measure once webfonts settle, since label widths move the endpoints.
  useEffect(() => {
    document.fonts?.ready.then(measure).catch(() => {});
  }, [measure]);

  const activeTech = hoverTech ?? pinned;
  const activeProject = hoverProject;
  const dimmed = activeTech !== null || activeProject !== null;

  const techLit = (name: string) =>
    activeTech === name ||
    (activeProject !== null &&
      (shared.find((t) => t.name === name)?.projects.includes(activeProject) ?? false));

  const projectLit = (slug: string) =>
    activeProject === slug ||
    (activeTech !== null &&
      (shared.find((t) => t.name === activeTech)?.projects.includes(slug) ?? false));

  const edgeLit = (edge: Edge) =>
    (activeTech !== null && edge.tech === activeTech) ||
    (activeProject !== null && edge.slug === activeProject);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto grid h-[26rem] w-full max-w-3xl grid-cols-[auto_minmax(120px,1fr)_auto] items-stretch justify-center gap-x-2 py-3"
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0"
        width={box.w || undefined}
        height={box.h || undefined}
        viewBox={box.w ? `0 0 ${box.w} ${box.h}` : undefined}
      >
        {edges.map((edge) => {
          const lit = edgeLit(edge);
          return (
            <path
              key={edge.key}
              d={edge.d}
              fill="none"
              stroke={lit ? "var(--color-signal)" : "var(--color-line-hi)"}
              strokeWidth={lit ? 1.4 : 1}
              className="transition-[stroke,stroke-opacity,stroke-width] duration-200"
              strokeOpacity={lit ? 0.9 : dimmed ? 0.07 : 0.38}
            />
          );
        })}
      </svg>

      {/* Technologies */}
      <ul className="relative z-10 flex flex-col justify-between">
        {shared.map((tech) => {
          const lit = techLit(tech.name);
          const isPinned = pinned === tech.name;
          return (
            <li key={tech.name}>
              <button
                type="button"
                ref={(el) => {
                  if (el) techRefs.current.set(tech.name, el);
                  else techRefs.current.delete(tech.name);
                }}
                aria-pressed={isPinned}
                onMouseEnter={() => setHoverTech(tech.name)}
                onMouseLeave={() => setHoverTech(null)}
                onFocus={() => setHoverTech(tech.name)}
                onBlur={() => setHoverTech(null)}
                onClick={() => onPin(isPinned ? null : tech.name)}
                className={cn(
                  "flex items-center gap-2.5 border px-3 py-1.5 font-mono text-[12px] tracking-[0.04em] transition-colors duration-200",
                  isPinned
                    ? "border-signal bg-signal/10 text-signal"
                    : lit
                      ? "border-signal-dim bg-panel-hi text-signal"
                      : dimmed
                        ? "border-line bg-panel text-ink-3/50"
                        : "border-line bg-panel text-ink-2 hover:border-line-hi hover:text-ink",
                )}
              >
                <span>{tech.name}</span>
                <span className="tabular-nums text-[10px] opacity-70">{tech.projects.length}</span>
                <span className="sr-only">{usedInLabel(tech.projects.length)}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div aria-hidden />

      {/* Systems */}
      <ul className="relative z-10 flex flex-col justify-between text-right">
        {projects.map((project) => {
          const lit = projectLit(project.slug);
          return (
            <li key={project.slug}>
              <a
                href={hrefFor(project.slug)}
                ref={(el) => {
                  if (el) projectRefs.current.set(project.slug, el);
                  else projectRefs.current.delete(project.slug);
                }}
                onMouseEnter={() => setHoverProject(project.slug)}
                onMouseLeave={() => setHoverProject(null)}
                onFocus={() => setHoverProject(project.slug)}
                onBlur={() => setHoverProject(null)}
                className={cn(
                  "flex items-center justify-end gap-2.5 border px-3 py-1.5 font-display text-[13px] font-medium tracking-[0.02em] transition-colors duration-200",
                  lit
                    ? "border-signal-dim bg-panel-hi text-ink"
                    : dimmed
                      ? "border-line bg-panel text-ink-3/50"
                      : "border-line bg-panel text-ink-2 hover:border-line-hi hover:text-ink",
                )}
              >
                <StatusDot status={project.status} className={cn(dimmed && !lit && "opacity-40")} />
                <span>{project.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
