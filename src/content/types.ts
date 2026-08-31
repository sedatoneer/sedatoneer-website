export const LOCALES = ["tr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "tr";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Lifecycle state of a system. This is the structural device the whole site is
 * organised around, so it has to mean something precise:
 *
 *  running — in production or under active development right now
 *  shipped — finished and released, source is public
 *  private — running, but no public source to point at
 */
export type Status = "running" | "shipped" | "private";

/** Projects that earn a hand-drawn schematic. Not every project gets one. */
export type SchematicId =
  | "nac-system"
  | "nac-gap-analyzer"
  | "autoheal"
  | "equaliter"
  | "whatscontrol";

/** Locale-independent facts about a project. Single source of truth. */
export interface ProjectFacts {
  slug: string;
  /** Proper noun — identical in every locale. */
  name: string;
  status: Status;
  /** Omitted where the real date isn't known. Never guessed. */
  since?: string;
  tech: string[];
  repo?: string;
  demo?: string;
  schematic?: SchematicId;
}

/** Locale-dependent copy, keyed by slug. */
export interface ProjectCopy {
  domain: string;
  summary: string;
}

export interface Project extends ProjectFacts, ProjectCopy {}

export interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  detail: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Content {
  meta: {
    title: string;
    description: string;
    ogTagline: string;
  };
  nav: {
    home: string;
    projects: string;
    about: string;
    contact: string;
    skip: string;
  };
  rail: {
    heading: string;
    role: string;
    running: string;
    shipped: string;
    localTime: string;
    language: string;
  };
  home: {
    headline: string[];
    lede: string;
    disciplines: string[];
    toProjects: string;
    toContact: string;
    indexHeading: string;
    indexNote: string;
    graphHeading: string;
    graphNote: string;
    graphHint: string;
    graphReset: string;
  };
  projects: {
    heading: string;
    lede: string;
    source: string;
    demo: string;
    noSource: string;
    stack: string;
    schematic: string;
    filterAll: string;
    filteredBy: string;
    empty: string;
    usedIn: string;
    count: string;
    copy: Record<string, ProjectCopy>;
  };
  status: Record<Status, string>;
  about: {
    heading: string;
    lede: string;
    timelineHeading: string;
    /** The word marking an ongoing role, used to light the live dot. */
    presentWord: string;
    skillsHeading: string;
    timeline: TimelineEntry[];
    skills: SkillGroup[];
  };
  contact: {
    heading: string;
    lede: string;
    availability: string;
    emailLabel: string;
    email: string;
    channels: { label: string; value: string; href: string }[];
    location: string;
  };
}
