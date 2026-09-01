import { tr } from "./tr";
import { en } from "./en";
import { PROJECTS } from "./projects";
import type { Content, Locale, Project } from "./types";

const CONTENT: Record<Locale, Content> = { tr, en };

/**
 * The two locales must stay the same shape. Editing one and forgetting the
 * other is the failure mode that actually happens, so it fails the build
 * rather than shipping a page that says less in one language.
 */
function assertParity(a: unknown, b: unknown, path = "content"): void {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      throw new Error(`Locale mismatch at ${path}: one side is an array, the other isn't`);
    }
    if (a.length !== b.length) {
      throw new Error(
        `Locale mismatch at ${path}: tr has ${a.length} item(s), en has ${b.length}`,
      );
    }
    a.forEach((item, i) => assertParity(item, b[i], `${path}[${i}]`));
    return;
  }

  if (a && b && typeof a === "object" && typeof b === "object") {
    const left = Object.keys(a as object).sort();
    const right = Object.keys(b as object).sort();
    const missing = left.filter((k) => !right.includes(k)).concat(right.filter((k) => !left.includes(k)));
    if (missing.length > 0) {
      throw new Error(`Locale mismatch at ${path}: keys differ (${missing.join(", ")})`);
    }
    for (const key of left) {
      assertParity(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
        `${path}.${key}`,
      );
    }
  }
}

assertParity(tr, en);

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
