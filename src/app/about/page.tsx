"use client";

import { useSite } from "@/context/SiteContext";
import { motion } from "framer-motion";

export default function AboutPage() {
  const { t, lang } = useSite();

  return (
    <div className="pb-20 max-w-3xl relative overflow-hidden">
      {/* Ghost number */}
      <div
        aria-hidden
        className="absolute right-0 top-[-2%] leading-none select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontWeight: 400,
          fontSize: "clamp(180px, 32vw, 420px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.035)",
          lineHeight: 1,
        }}
      >
        03
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-14 relative z-10"
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            color: "var(--fg-mid)",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          {lang === "tr" ? "Hakkımda" : "About Me"}
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
          {lang === "tr" ? "Dosya" : "File"}
        </h1>
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-14 pb-14 relative z-10"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(18px, 2.4vw, 24px)",
            color: "var(--fg)",
            lineHeight: 1.55,
            maxWidth: "620px",
          }}
        >
          {t.about.bio}
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
        className="mb-14 pb-14 relative z-10"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "8.5px",
            letterSpacing: "0.26em",
            color: "var(--fg-mid)",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          {lang === "tr" ? "Deneyim" : "Experience"}
        </div>

        <div className="space-y-9">
          {t.about.timeline.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22 + i * 0.07 }}
              style={{ display: "flex", gap: "32px" }}
            >
              {/* Year */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "8px",
                  color: "var(--fg-dim)",
                  letterSpacing: "0.08em",
                  paddingTop: "5px",
                  lineHeight: 1.6,
                  flexShrink: 0,
                  minWidth: "88px",
                }}
              >
                {item.year}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 400,
                    color: "var(--fg)",
                    fontSize: "21px",
                    lineHeight: 1.2,
                    marginBottom: "3px",
                  }}
                >
                  {item.role}
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "8.5px",
                    color: "var(--accent)",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  {item.company}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-dm)",
                    fontSize: "13.5px",
                    color: "var(--fg-mid)",
                    lineHeight: 1.68,
                    fontWeight: 400,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="relative z-10"
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "8.5px",
            letterSpacing: "0.26em",
            color: "var(--fg-mid)",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          {lang === "tr" ? "Yetkinlikler" : "Skills"}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
          {t.about.skills_section.categories.map((cat: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.07 }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "7.5px",
                  color: "var(--fg-dim)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                {cat.title}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px" }}>
                {cat.skills.map((s: string) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: "var(--font-dm)",
                      fontSize: "13.5px",
                      color: "var(--fg-mid)",
                      fontWeight: 400,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
