import Link from "next/link";
import type { Content, Locale, Project } from "@/content/types";
import { StatusDot, TechChip } from "@/components/ui";
import { cn } from "@/lib/cn";

interface Props {
  projects: Project[];
  content: Content;
  locale: Locale;
  /** Highlights the matching chip and marks non-matching rows as context. */
  highlight?: string | null;
}

export default function SystemIndex({ projects, content, locale, highlight }: Props) {
  return (
    <ul>
      {projects.map((project) => {
        const matches = !highlight || project.tech.includes(highlight);
        return (
          <li key={project.slug} className={cn(!matches && "opacity-35")}>
            <Link
              href={`/${locale}/projects#${project.slug}`}
              className="group grid grid-cols-1 items-baseline gap-x-5 gap-y-2 border-b border-line px-4 py-4 transition-colors hover:bg-panel-hi sm:px-5 md:grid-cols-[9rem_minmax(0,1fr)_auto]"
            >
              <span className="flex items-center gap-2">
                <StatusDot status={project.status} />
                <span
                  className={cn(
                    "label",
                    project.status === "running" ? "text-signal" : "text-ink-3",
                  )}
                >
                  {content.status[project.status]}
                </span>
              </span>

              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-[17px] font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-signal">
                    {project.name}
                  </span>
                  <span className="label normal-case tracking-[0.08em]">{project.domain}</span>
                </span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <TechChip key={tech} active={highlight === tech}>
                      {tech}
                    </TechChip>
                  ))}
                </span>
              </span>

              <span
                aria-hidden
                className="hidden font-mono text-[13px] text-ink-3 transition-all duration-200 group-hover:translate-x-1 group-hover:text-signal md:block"
              >
                &rarr;
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
