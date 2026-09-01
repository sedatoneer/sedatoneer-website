import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Sedat Öner — Backend & Automation Engineer",
    description:
      "Computer engineering student, Pratech co-founder, full stack developer at Qupsoft. RADIUS policy engines, network analysis tools, self-healing test runners, and scrapers.",
    tagline: "Systems that run when nobody's watching",
  },
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    skip: "Skip to content",
  },
  window: {
    menus: {
      file: {
        label: "File",
        newDrawing: "New",
        savePng: "Save drawing as PNG",
        print: "Print...",
        close: "Exit",
      },
      edit: {
        label: "Edit",
        undo: "Undo",
        clear: "Clear drawing",
        copyEmail: "Copy my email",
      },
      view: {
        label: "View",
        toolbox: "Tool box",
        colorbox: "Colour box",
        maximize: "Full screen",
      },
      help: { label: "Help", about: "About" },
    },
    tools: {
      pages: "Pages",
      draw: "Draw",
      brush: "Brush",
      eraser: "Eraser",
      size: "Width",
    },
    controls: {
      minimize: "Minimise",
      maximize: "Maximise",
      restore: "Restore",
      close: "Close",
    },
    dialog: {
      closeTitle: "Paint",
      closeBody: "The changes to your drawing have not been saved. Save them?",
      save: "Save",
      dontSave: "Don't save",
      cancel: "Cancel",
      ok: "OK",
      aboutTitle: "About sedatoneer.com",
      aboutBody:
        "This site is a Paint window. Pick a colour from the palette, grab the brush, and draw on the page. You can download what you draw as a PNG from the File menu.",
      aboutCredit: "Sedat Öner · Backend & automation engineer",
    },
    status: {
      hint: "Click the palette to pick a colour.",
      picked: "Colour picked:",
      copied: "Email copied to the clipboard.",
      cleared: "Drawing cleared.",
      saved: "Drawing downloaded as PNG.",
      undone: "Last brush stroke undone.",
      nothingToUndo: "Nothing to undo.",
      drawing: "Draw right on the page. Ctrl+Z undoes.",
    },
    taskbar: { start: "Start" },
  },
  home: {
    headline: "Hi, I'm Sedat.",
    lede: "I study computer engineering at Düzce University, co-founded Pratech, and build full stack at Qupsoft. Most of my work sits in the background: APIs that process receipts, policy engines that gate network access, scrapers that run overnight.",
    doingLabel: "What I do",
    doing: ["Backend", "Automation", "Reverse engineering", "Computer vision"],
    toProjects: "See the projects",
    toContact: "Email me",
  },
  projects: {
    heading: "Projects",
    lede: "Things I built. Read the source where it's open, read what it does where it isn't.",
    source: "Source",
    demo: "Live",
    noSource: "Closed source",
    howItWorks: "How it works",
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
    running: "still working on it",
    shipped: "done",
    private: "source is closed",
  },
  about: {
    heading: "About",
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
    locationLabel: "Location",
    location: "Istanbul, Türkiye",
  },
};
