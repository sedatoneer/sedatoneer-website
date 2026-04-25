"use client";

import { useSite } from "@/context/SiteContext";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const { t, lang } = useSite();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(t.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="pb-20 max-w-lg relative overflow-hidden">
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
        04
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
          {lang === "tr" ? "İletişim" : "Get in Touch"}
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
          {t.contact.title}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-dm)",
            fontSize: "14px",
            color: "var(--fg-mid)",
            lineHeight: 1.75,
            fontWeight: 400,
            marginTop: "16px",
          }}
        >
          {t.contact.desc}
        </p>
      </motion.div>

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="mb-12 pb-12 relative z-10"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "8px",
            color: "var(--fg-dim)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          {lang === "tr" ? "E-Posta" : "Email"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <a
            href={`mailto:${t.contact.email}`}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(17px, 2.8vw, 26px)",
              color: "var(--fg)",
              letterSpacing: "0.01em",
              transition: "opacity 0.15s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.55")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            {t.contact.email}
          </a>
          <button
            onClick={handleCopy}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "8.5px",
              color: copied ? "var(--accent)" : "var(--fg-dim)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.15s",
            }}
          >
            {copied
              ? lang === "tr" ? "Kopyalandı" : "Copied"
              : lang === "tr" ? "Kopyala"    : "Copy"}
          </button>
        </div>
      </motion.div>

      {/* Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.22 }}
        className="mb-12 relative z-10"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {[
          { label: "LinkedIn",                              value: "/in/sedatoneer",   href: "https://linkedin.com/in/sedatoneer" },
          { label: "GitHub",                               value: "/sedatoneer",      href: "https://github.com/sedatoneer"      },
          { label: lang === "tr" ? "Konum" : "Location",  value: t.contact.location, href: null                                 },
        ].map(({ label, value, href }) => (
          <div key={label} style={{ display: "flex", alignItems: "baseline", gap: "32px" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "7.5px",
                color: "var(--fg-dim)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                minWidth: "68px",
                flexShrink: 0,
              }}
            >
              {label}
            </span>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-dm)",
                  fontSize: "14px",
                  color: "var(--fg-mid)",
                  fontWeight: 400,
                  transition: "color 0.15s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg-mid)")}
              >
                {value}
              </a>
            ) : (
              <span
                style={{
                  fontFamily: "var(--font-dm)",
                  fontSize: "14px",
                  color: "var(--fg-mid)",
                  fontWeight: 400,
                }}
              >
                {value}
              </span>
            )}
          </div>
        ))}
      </motion.div>

      {/* Availability */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.34 }}
        className="relative z-10"
        style={{ display: "flex", alignItems: "center", gap: "12px" }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            backgroundColor: "var(--accent)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            color: "var(--fg-mid)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {lang === "tr" ? "Yeni projelere açık" : "Available for new projects"}
        </span>
      </motion.div>
    </div>
  );
}
