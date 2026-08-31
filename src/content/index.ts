import { tr } from "./tr";
import { en } from "./en";
import { PROJECTS } from "./projects";
import type { Content, Locale, Project } from "./types";

const CONTENT: Record<Locale, Content> = { tr, en };

export function getContent(locale: Locale): Content {
  return CONTENT[locale];
}

/** Merges locale-independent facts with the copy for that locale. */
export function getProjects(locale: Locale): Project[] {
  const { copy } = CONTENT[locale].projects;
  return PROJECTS.map((facts) => {
    const text = copy[facts.slug];
    if (!text) throw new Error(`Missing ${locale} copy for project "${facts.slug}"`);
    return { ...facts, ...text };
  });
}

export * from "./types";
export { PROJECTS, PROJECTS_BY_SLUG, countByStatus } from "./projects";
