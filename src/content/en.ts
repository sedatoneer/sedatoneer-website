import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Sedat Öner — Backend & Automation Engineer",
    description:
      "Computer engineering student, Pratech co-founder, full stack developer at Qupsoft. RADIUS policy engines, network analysis tools, self-healing test runners, and scrapers.",
    ogTagline: "Systems that run when nobody's watching",
  },
  nav: {
    home: "Overview",
    projects: "Systems",
    about: "Record",
    contact: "Contact",
    skip: "Skip to content",
  },
  rail: {
    heading: "Sedat Öner",
    role: "Backend & automation engineer",
    running: "running",
    shipped: "shipped",
    localTime: "Istanbul",
    language: "Language",
  },
  home: {
    headline: ["Systems that run", "when nobody's watching."],
    lede: "I study computer engineering at Düzce University, co-founded Pratech, and build full stack at Qupsoft. Most of my work sits in the background: APIs that process receipts, policy engines that gate network access, scrapers that run overnight.",
    disciplines: ["Backend", "Automation", "Reverse engineering", "Computer vision"],
    toProjects: "Browse the systems",
    toContact: "Get in touch",
    indexHeading: "System index",
    indexNote: "Every row is something that shipped. Status means status, not a badge.",
    graphHeading: "Stack connections",
    graphNote:
      "Each edge is a technology actually used in that project. The graph is generated from the project data, not drawn by hand.",
    graphHint: "Pick a technology to light up the systems that use it.",
    graphReset: "Clear selection",
  },
  projects: {
    heading: "Systems",
    lede: "Things I shipped. Read the source where it's open, read what it does where it isn't.",
    source: "Source",
    demo: "Live",
    noSource: "Closed source",
    stack: "Stack",
    schematic: "How it works",
    filterAll: "All",
    filteredBy: "Filtered by",
    empty: "No system uses this technology.",
    usedIn: "used in {n} systems",
    count: "{n} systems",
    copy: {
      qupsoft: {
        domain: "Full stack · Production",
        summary:
          "B2B and B2C digital receipt and expense platform. I work across the React interface, the FastAPI services, and the PostgreSQL schema, including multi-tenancy and role-based access.",
      },
      pratech: {
        domain: "Co-founder · Production",
        summary:
          "Digital receipt and expense management startup. I built the backend, the server infrastructure, the corporate site, and the user dashboard from scratch.",
      },
      "nac-system": {
        domain: "Network security",
        summary:
          "AAA architecture built on RADIUS (RFC 2865/2866). FreeRADIUS authenticates, a FastAPI policy engine decides who lands on which VLAN, Redis holds the sessions. 35 unit tests. Written for the S3M Security internship evaluation.",
      },
      "nac-gap-analyzer": {
        domain: "Security analysis",
        summary:
          "Scans a local network, fingerprints the devices, and simulates what a NAC system would enforce — without deploying any infrastructure. Topology visualisation via a D3.js force graph, plus PDF reports.",
      },
      autoheal: {
        domain: "Developer tools",
        summary:
          "Repairs broken Playwright tests with an LLM. Captures a DOM snapshot, assembles the failure context, patches the AST through ts-morph, then re-runs the test to verify. Works with OpenAI, Anthropic, and Ollama.",
      },
      cleandev: {
        domain: "Desktop app",
        summary:
          "Cross-platform fork of Cleantr. Adds a Dead Project Detector that finds abandoned git repos across ten ecosystems (Node, Python, Rust, Go, Java…) and a global package cache scanner. Windows, macOS, Linux.",
      },
      equaliter: {
        domain: "Computer vision",
        summary:
          "Contactless audio and media control from hand gestures. MediaPipe extracts hand landmarks, OpenCV processes the frames, and the gesture maps to system volume.",
      },
      whatscontrol: {
        domain: "Automation",
        summary:
          "Listens to WhatsApp Web through Selenium, parses incoming messages as commands, and drives a Mi Box over ADB. I wrote it because I lost the remote.",
      },
      flexfarm: {
        domain: "Education · Gamification",
        summary:
          "An interactive web game that teaches CSS Flexbox by playing it. Twenty levels, a story mode, and a live code editor.",
      },
      stemxfuture: {
        domain: "Web · NGO",
        summary:
          "Corporate site for the STEMxFuture STEM non-profit, written from scratch without a framework. I also run the organisation's IT department.",
      },
      "data-bots": {
        domain: "Data engineering",
        summary:
          "Scrapers that pull and process thousands of rows from tender platforms like EKAP. They run overnight and leave clean data by morning. Source is closed.",
      },
    },
  },
  status: {
    running: "running",
    shipped: "shipped",
    private: "private",
  },
  about: {
    heading: "Record",
    lede: "I turn complexity into infrastructure that runs unattended. My favourite feedback is not noticing that something has been running fine for months.",
    timelineHeading: "Experience",
    presentWord: "Present",
    skillsHeading: "Capabilities",
    timeline: [
      {
        period: "Mar 2026 — Present",
        role: "Full Stack Developer",
        org: "Qupsoft",
        detail:
          "Full stack development of a B2B and B2C digital receipt platform. Scalable architecture on React, FastAPI, and PostgreSQL. Düzce, hybrid.",
      },
      {
        period: "Mar 2026 — Present",
        role: "Head of IT",
        org: "STEMxFuture",
        detail: "IT infrastructure and digital transformation for a STEM non-profit. Istanbul, remote.",
      },
      {
        period: "Sep 2025 — Present",
        role: "Co-Founder",
        org: "Pratech",
        detail:
          "Designed and built the entire technical infrastructure for a digital receipt and expense management startup. Düzce, hybrid.",
      },
      {
        period: "May 2025 — Present",
        role: "Head of Project & R&D",
        org: "Düzce Univ. Quality Community",
        detail: "Running technical projects, leading research, and coordinating the team.",
      },
      {
        period: "Feb 2025 — May 2025",
        role: "Project & R&D Member",
        org: "Düzce Univ. Quality Community",
        detail: "Contributed to research projects and took an active role in development.",
      },
      {
        period: "2023 — 2028",
        role: "Computer Engineering",
        org: "Düzce University",
        detail: "Bachelor's degree.",
      },
      {
        period: "2022 — Present",
        role: "Freelance Developer",
        org: "Independent",
        detail:
          "Automation and web scraping with Python and Selenium; corporate projects across various web technologies.",
      },
    ],
    skills: [
      {
        title: "Languages",
        items: ["Python", "TypeScript", "JavaScript", "C++", "C#", "SQL"],
      },
      {
        title: "Focus",
        items: [
          "Backend development",
          "Automation",
          "Web scraping",
          "Computer vision",
          "Reverse engineering",
          "Full stack",
        ],
      },
      {
        title: "Tools",
        items: ["FastAPI", "React", "PostgreSQL", "Docker", "Selenium", "OpenCV", "Git"],
      },
      {
        title: "Spoken",
        items: ["Turkish — native", "English — technical"],
      },
    ],
  },
  contact: {
    heading: "Contact",
    lede: "Open to new projects. Email is the fastest route.",
    availability: "Open to work",
    emailLabel: "Email",
    email: "sedatoneer@gmail.com",
    channels: [
      { label: "GitHub", value: "github.com/sedatoneer", href: "https://github.com/sedatoneer" },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/sedatoneer",
        href: "https://linkedin.com/in/sedatoneer",
      },
    ],
    location: "Istanbul, Türkiye",
  },
};
