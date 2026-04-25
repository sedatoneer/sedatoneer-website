"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Instagram, Menu, X } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { useState, useEffect } from "react";

export default function TopNav() {
  const { t, isIntro, lang, setLang } = useSite();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  if (isIntro) return null;

  const links = [
    { href: "/", label: t.sidebar.menu.dashboard },
    { href: "/projects", label: t.sidebar.menu.projects },
    { href: "/about", label: t.sidebar.menu.about },
    { href: "/contact", label: t.sidebar.menu.contact },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-12"
        style={{
          height: "56px",
          background: scrolled ? "rgba(9,9,11,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo */}
        <Link href="/">
          <span
            className="font-extrabold uppercase tracking-[-0.03em] text-base"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            S<span style={{ color: "var(--teal)" }}>·</span>Ö
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}>
                <span className={`nav-item ${active ? "active" : ""}`}>
                  {label}
                  {active && (
                    <motion.span
                      layoutId="underline"
                      className="absolute -bottom-px left-0 right-0"
                      style={{ height: "1px", background: "var(--teal)" }}
                    />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Lang + hamburger */}
        <div className="flex items-center gap-4">
          <div
            className="hidden md:flex items-center gap-0.5 rounded-full p-0.5"
            style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            {(["tr", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="rounded-full transition-all duration-200"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  padding: "3px 10px",
                  background: lang === l ? "var(--teal)" : "transparent",
                  color: lang === l ? "#09090b" : "var(--text-2)",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className="md:hidden"
            style={{ color: "var(--text-2)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 flex flex-col justify-between px-8 py-20"
            style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
          >
            <nav className="flex flex-col gap-0">
              {links.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <Link href={href}>
                    <div
                      className="flex items-center justify-between py-6"
                      style={{ color: pathname === href ? "var(--teal)" : "var(--text)" }}
                    >
                      <span
                        className="font-extrabold uppercase tracking-[-0.02em]"
                        style={{
                          fontFamily: "var(--font-syne)",
                          fontSize: "clamp(28px, 6vw, 42px)",
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          color: "var(--text-3)",
                        }}
                      >
                        0{i + 1}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                {[
                  { href: "https://github.com/sedatoneer", i: <Github size={16} /> },
                  { href: "https://linkedin.com/in/sedatoneer", i: <Linkedin size={16} /> },
                  { href: "https://instagram.com/sedatoneer", i: <Instagram size={16} /> },
                ].map(({ href, i }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--text-2)", padding: "6px" }}
                  >
                    {i}
                  </a>
                ))}
              </div>
              <div
                className="flex items-center gap-0.5 rounded-full p-0.5"
                style={{ border: "1px solid var(--border)" }}
              >
                {(["tr", "en"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className="rounded-full transition-all"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: "700",
                      padding: "5px 14px",
                      background: lang === l ? "var(--teal)" : "transparent",
                      color: lang === l ? "#09090b" : "var(--text-2)",
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
