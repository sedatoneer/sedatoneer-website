"use client";

import { useSite } from "@/context/SiteContext";
import { motion } from "framer-motion";
import { useState } from "react";

function ProjectCard({ project, lang, index }: { project: any; lang: string; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.055, duration: 0.45 }}
      className="group flex flex-col"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div
        className="flex flex-col h-full relative"
        style={{
          backgroundColor: hovered ? "var(--surface-hi)" : "var(--surface)",
          transition: "background-color 0.18s ease",
          borderLeft: hovered ? "2px solid var(--accent)" : "2px solid transparent",
          padding: hovered ? "30px 30px 30px 28px" : "30px",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Card top row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Category label */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: "var(--fg-mid)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              {project.category}
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 400,
                color: "var(--fg)",
                fontSize: "clamp(22px, 2.8vw, 29px)",
                lineHeight: 1.1,
                letterSpacing: "0.01em",
              }}
            >
              {project.title}
            </h2>
          </div>

          {/* Stat badge — gold border + gold text for legibility */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "7px",
              color: "var(--accent)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              flexShrink: 0,
              border: "1px solid rgba(200, 165, 122, 0.45)",
              padding: "4px 8px",
              lineHeight: 1,
              whiteSpace: "nowrap",
              marginTop: "2px",
            }}
          >
            {project.stat}
          </span>
        </div>

        {/* Description */}
        <p
          className="flex-1 mb-6"
          style={{
            fontFamily: "var(--font-dm)",
            fontSize: "13.5px",
            color: "var(--fg-mid)",
            lineHeight: 1.72,
            fontWeight: 400,
          }}
        >
          {project.description}
        </p>

        {/* Footer */}
        <div
          className="flex items-end justify-between flex-wrap gap-3 pt-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {/* Tech tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px" }}>
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "8px",
                  color: "var(--fg-mid)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span style={{ color: "var(--accent)", opacity: 0.6, fontSize: "6px" }}>▪</span>
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "20px", flexShrink: 0 }}>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "8px",
                  color: "var(--fg-mid)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  transition: "color 0.15s",
                  borderBottom: "1px solid transparent",
                  paddingBottom: "1px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--fg)";
                  (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--fg-dim)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--fg-mid)";
                  (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
                }}
              >
                {lang === "tr" ? "Kaynak" : "Source"}
                <span style={{ transition: "transform 0.15s" }}>→</span>
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "8px",
                  color: "var(--accent)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  borderBottom: "1px solid transparent",
                  paddingBottom: "1px",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(200,165,122,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
                }}
              >
                {lang === "tr" ? "Demo" : "Live"}
                <span>→</span>
              </a>
            )}
            {!project.link && !project.demoLink && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "8px",
                  color: "var(--fg-dim)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ opacity: 0.5 }}>—</span>
                {lang === "tr" ? "Gizli" : "Classified"}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { t, lang } = useSite();

  return (
    <div className="pb-20 relative overflow-hidden">
      {/* Ghost number */}
      <div
        aria-hidden
        className="absolute right-0 top-[-2%] leading-none select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontWeight: 300,
          fontSize: "clamp(180px, 32vw, 420px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.035)",
          lineHeight: 1,
        }}
      >
        02
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-12 relative z-10"
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            color: "var(--fg-mid)",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}
        >
          {lang === "tr" ? "Seçili Çalışmalar" : "Selected Work"}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 400,
            color: "var(--fg)",
            fontSize: "clamp(44px, 8vw, 88px)",
            lineHeight: 1,
            letterSpacing: "0.02em",
          }}
        >
          {lang === "tr" ? "Projeler" : "Projects"}
        </h1>
      </motion.div>

      {/* Count strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.4 }}
        className="mb-8 relative z-10 flex items-center gap-4"
        style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "8px",
            color: "var(--fg-dim)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {t.projects_page.items.length.toString().padStart(2, "0")} {lang === "tr" ? "proje" : "projects"}
        </span>
        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "8px",
            color: "var(--fg-dim)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          2022 — {new Date().getFullYear()}
        </span>
      </motion.div>

      {/* Card grid */}
      <div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ backgroundColor: "var(--border)" }}
      >
        {t.projects_page.items.map((project: any, i: number) => (
          <ProjectCard key={project.id} project={project} lang={lang} index={i} />
        ))}
      </div>
    </div>
  );
}
