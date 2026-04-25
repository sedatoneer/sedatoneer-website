"use client";

import { useSite } from "@/context/SiteContext";
import Link from "next/link";
import { motion } from "framer-motion";

const STACK = ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "OpenCV", "Selenium", "C++"];

export default function Home() {
  const { t, lang } = useSite();

  return (
    <div className="min-h-[84vh] flex flex-col justify-end relative overflow-hidden">
      {/* Ghost section number */}
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
        01
      </div>

      <div className="relative z-10 pb-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            color: "var(--fg-mid)",
            textTransform: "uppercase",
            marginBottom: "40px",
          }}
        >
          Portfolio &mdash; 2025
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.07 }}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 400,
            color: "var(--fg)",
            fontSize: "clamp(68px, 13vw, 156px)",
            lineHeight: 0.9,
            letterSpacing: "0.02em",
          }}
        >
          SEDAT
          <br />
          ÖNER
        </motion.h1>

        {/* Accent bar + role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.27 }}
          style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "32px" }}
        >
          <div style={{ width: "28px", height: "1px", backgroundColor: "var(--accent)", flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9.5px",
              letterSpacing: "0.26em",
              color: "var(--fg-mid)",
              textTransform: "uppercase",
            }}
          >
            {lang === "tr" ? t.hero.badge : "Backend & Automation Engineer"}
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-dm)",
            fontSize: "14.5px",
            color: "var(--fg-mid)",
            lineHeight: 1.78,
            maxWidth: "440px",
            fontWeight: 400,
            marginTop: "28px",
          }}
        >
          {t.hero.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          style={{ display: "flex", alignItems: "center", gap: "28px", marginTop: "36px" }}
        >
          <Link href="/projects">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9.5px",
                letterSpacing: "0.24em",
                color: "var(--fg)",
                textTransform: "uppercase",
                borderBottom: "1px solid var(--fg)",
                paddingBottom: "2px",
                cursor: "pointer",
                transition: "opacity 0.15s",
              }}
            >
              {lang === "tr" ? "Çalışmalar" : "View Work"}
            </span>
          </Link>
          <Link href="/contact">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9.5px",
                letterSpacing: "0.24em",
                color: "var(--fg-mid)",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "color 0.15s",
              }}
            >
              {lang === "tr" ? "İletişim" : "Contact"}
            </span>
          </Link>
        </motion.div>

        {/* Stack strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            marginTop: "48px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px 28px",
          }}
        >
          {STACK.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "8px",
                color: "var(--fg-dim)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
