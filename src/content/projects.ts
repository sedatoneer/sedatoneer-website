import type { ProjectFacts } from "./types";

/**
 * Locale-independent project facts.
 *
 * Order matters — this is the display order, most significant first.
 *
 * `status` is a claim about reality, so keep it honest:
 *   running — in production or actively developed right now
 *   shipped — finished and released, source is public
 *   private — running, but no public source
 *
 * `since` is deliberately absent where the real start date isn't recorded.
 * Add it rather than letting anything guess.
 */
export const PROJECTS: ProjectFacts[] = [
  {
    slug: "qupsoft",
    name: "Qupsoft",
    status: "running",
    since: "2026",
    tech: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
  },
  {
    slug: "pratech",
    name: "Pratech",
    status: "running",
    since: "2025",
    tech: ["FastAPI", "React", "PostgreSQL", "Docker"],
  },
  {
    slug: "nac-system",
    name: "NAC System",
    status: "shipped",
    tech: ["Python", "FastAPI", "FreeRADIUS", "PostgreSQL", "Redis", "Docker"],
    repo: "https://github.com/sedatoneer/nac-system",
    schematic: "nac-system",
  },
  {
    slug: "nac-gap-analyzer",
    name: "NAC Gap Analyzer",
    status: "shipped",
    tech: ["Python", "FastAPI", "React", "TypeScript", "D3.js", "Docker"],
    repo: "https://github.com/sedatoneer/NAC-Gap-Analyzer",
    schematic: "nac-gap-analyzer",
  },
  {
    slug: "autoheal",
    name: "AutoHeal",
    status: "shipped",
    tech: ["TypeScript", "Node.js", "Playwright", "ts-morph", "OpenAI", "Anthropic"],
    repo: "https://github.com/sedatoneer/AutoHeal",
    schematic: "autoheal",
  },
  {
    slug: "cleandev",
    name: "CleanDev",
    status: "shipped",
    tech: ["Electron", "TypeScript", "React", "Node.js"],
    repo: "https://github.com/sedatoneer/cleandev",
  },
  {
    slug: "equaliter",
    name: "eQualiter",
    status: "shipped",
    tech: ["Python", "OpenCV", "MediaPipe", "C++"],
    repo: "https://github.com/sedatoneer/equaliter",
    schematic: "equaliter",
  },
  {
    slug: "whatscontrol",
    name: "WhatsControl",
    status: "shipped",
    tech: ["Python", "Selenium", "ADB"],
    repo: "https://github.com/sedatoneer/whatsapp-remote",
    schematic: "whatscontrol",
  },
  {
    slug: "flexfarm",
    name: "FlexFarm",
    status: "shipped",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/sedatoneer/flexfarm",
    demo: "https://flexfarm-tr.netlify.app",
  },
  {
    slug: "stemxfuture",
    name: "STEMxFuture",
    status: "running",
    since: "2026",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/e330203-blip/stemxfuture",
  },
  {
    slug: "data-bots",
    name: "EKAP Data Bots",
    status: "private",
    since: "2022",
    tech: ["Python", "Selenium", "Pandas"],
  },
];

export const PROJECTS_BY_SLUG = new Map(PROJECTS.map((p) => [p.slug, p]));

export function countByStatus(status: ProjectFacts["status"]): number {
  return PROJECTS.filter((p) => p.status === status).length;
}
