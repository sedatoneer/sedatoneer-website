"use client";

import { useState } from "react";
import type { Content, Locale, Project } from "@/content/types";
import { orderForGraph, type TechNode } from "@/lib/graph";
import StackGraph from "@/components/graph/StackGraph";
import SystemIndex from "./SystemIndex";
import { Panel, PanelHeader, Label } from "@/components/ui";
import { cn } from "@/lib/cn";

interface Props {
  shared: TechNode[];
  specialist: TechNode[];
  projects: Project[];
  content: Content;
  locale: Locale;
}

/**
 * Owns the selected technology so the graph and the index below it stay in
 * sync — picking a technology in either place filters both.
 */
export default function StackExplorer({
  shared,
  specialist,
  projects,
  content,
  locale,
}: Props) {
  const [pinned, setPinned] = useState<string | null>(null);
  const { home, projects: labels } = content;

  const usedInLabel = (count: number) => labels.usedIn.replace("{n}", String(count));

  return (
    <div className="space-y-px">
      <Panel as="section" className="rise" aria-labelledby="graph-heading">
        <PanelHeader
          aside={
            pinned ? (
              <button
                type="button"
                onClick={() => setPinned(null)}
                className="label text-signal transition-opacity hover:opacity-70"
              >
                {home.graphReset} &times;
              </button>
            ) : (
              <span className="hidden sm:inline">{home.graphHint}</span>
            )
          }
        >
          <span id="graph-heading">{home.graphHeading}</span>
        </PanelHeader>

        <div className="px-4 pt-4 sm:px-5">
          <p className="max-w-[62ch] text-[13.5px] leading-relaxed text-ink-3">{home.graphNote}</p>
        </div>

        {/* Desktop: measured bipartite graph */}
        <div className="hidden lg:block">
          <StackGraph
            shared={shared}
            projects={orderForGraph(projects, shared).map((p) => ({
              slug: p.slug,
              name: p.name,
              status: p.status,
            }))}
            pinned={pinned}
            onPin={setPinned}
            hrefFor={(slug) => `/${locale}/projects#${slug}`}
            usedInLabel={usedInLabel}
          />
        </div>

        {/* Small screens: same data, same interaction, no drawing */}
        <div className="flex flex-wrap gap-1.5 p-4 sm:p-5 lg:hidden">
          {shared.map((tech) => {
            const active = pinned === tech.name;
            return (
              <button
                key={tech.name}
                type="button"
                aria-pressed={active}
                onClick={() => setPinned(active ? null : tech.name)}
                className={cn(
                  "flex items-center gap-2 border px-2.5 py-1.5 font-mono text-[12px] transition-colors",
                  active
                    ? "border-signal bg-signal/10 text-signal"
                    : "border-line text-ink-2 hover:border-line-hi hover:text-ink",
                )}
              >
                {tech.name}
                <span className="tabular-nums text-[10px] opacity-70">{tech.projects.length}</span>
                <span className="sr-only">{usedInLabel(tech.projects.length)}</span>
              </button>
            );
          })}
        </div>

        {/* Used exactly once — the distinction is itself the information */}
        <div className="border-t border-line px-4 py-4 sm:px-5">
          <Label className="mb-2.5 block">
            {locale === "tr" ? "Tek projede" : "Used once"}
          </Label>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {specialist.map((tech) => (
              <span key={tech.name} className="font-mono text-[11.5px] text-ink-3">
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </Panel>

      <Panel as="section" className="rise" aria-labelledby="index-heading">
        <PanelHeader aside={pinned ? `${labels.filteredBy}: ${pinned}` : undefined}>
          <span id="index-heading">{home.indexHeading}</span>
        </PanelHeader>
        <div className="px-4 pt-4 sm:px-5">
          <p className="max-w-[62ch] text-[13.5px] leading-relaxed text-ink-3">{home.indexNote}</p>
        </div>
        <div className="pt-2">
          <SystemIndex
            projects={projects}
            content={content}
            locale={locale}
            highlight={pinned}
          />
        </div>
      </Panel>
    </div>
  );
}
