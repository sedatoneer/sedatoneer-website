export const LOCALES = ["tr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "tr";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export type Status = "running" | "shipped" | "private";

/** Projects that earn a diagram. Not every project gets one. */
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
    tagline: string;
  };
  nav: {
    home: string;
    projects: string;
    about: string;
    contact: string;
    skip: string;
  };
  window: {
    /** Menu bar labels. Part of the frame, not navigation. */
    menu: string[];
    colorHint: string;
    colorPicked: string;
  };
  home: {
    headline: string;
    lede: string;
    doingLabel: string;
    doing: string[];
    toProjects: string;
    toContact: string;
  };
  projects: {
    heading: string;
    lede: string;
    source: string;
    demo: string;
    noSource: string;
    howItWorks: string;
    copy: Record<string, ProjectCopy>;
  };
  status: Record<Status, string>;
  about: {
    heading: string;
    lede: string;
    timelineHeading: string;
    skillsHeading: string;
    presentWord: string;
    timeline: TimelineEntry[];
    skills: SkillGroup[];
  };
  contact: {
    heading: string;
    lede: string;
    emailLabel: string;
    email: string;
    channels: { label: string; value: string; href: string }[];
    locationLabel: string;
    location: string;
  };
}
