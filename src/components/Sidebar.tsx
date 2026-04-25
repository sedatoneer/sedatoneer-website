"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSite } from "@/context/SiteContext";
import { useState, useEffect } from "react";

const NAV = [
  { href: "/",         num: "01", tr: "Ana Sayfa",  en: "Home"      },
  { href: "/projects", num: "02", tr: "Projeler",   en: "Projects"  },
  { href: "/about",    num: "03", tr: "Hakkımda",   en: "About"     },
  { href: "/contact",  num: "04", tr: "İletişim",   en: "Contact"   },
];

export default function Sidebar() {
  const { isIntro, lang } = useSite();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  if (isIntro) return null;

  const label = (item: (typeof NAV)[0]) => (lang === "tr" ? item.tr : item.en);

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 h-14 z-[150] flex items-center justify-between px-6 border-b"
        style={{ backgroundColor: "var(--bg-sidebar)", borderColor: "var(--border)" }}
      >
        <Link href="/">
          <span
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--fg)",
              fontSize: "16px",
              letterSpacing: "0.14em",
              fontWeight: 400,
            }}
          >
            SEDAT ÖNER
          </span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--fg-mid)",
            fontSize: "8.5px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {/* Sidebar panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[140] w-56 flex flex-col border-r
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        style={{ backgroundColor: "var(--bg-sidebar)", borderColor: "var(--border)" }}
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="px-7 py-7 border-b" style={{ borderColor: "var(--border)" }}>
            <Link href="/">
              <div
                style={{
                  fontFamily: "var(--font-cormorant)",
                  color: "var(--fg)",
                  fontSize: "15px",
                  letterSpacing: "0.16em",
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                SEDAT ÖNER
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--fg-mid)",
                  fontSize: "8px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginTop: "6px",
                }}
              >
                {lang === "tr" ? "Müh. & Kurucu Ortak" : "Eng. & Co-Founder"}
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-7 py-7">
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "7.5px",
                letterSpacing: "0.26em",
                color: "var(--fg-dim)",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              Navigation
            </div>
            <div className="space-y-0.5">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className="flex items-center gap-4 py-2 pl-3 transition-all"
                      style={{
                        borderLeft: `1px solid ${active ? "var(--accent)" : "transparent"}`,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "8px",
                          color: active ? "var(--accent)" : "var(--fg-dim)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {item.num}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-dm)",
                          fontSize: "12px",
                          color: active ? "var(--fg)" : "var(--fg-mid)",
                          fontWeight: active ? 500 : 400,
                          letterSpacing: "0.03em",
                          transition: "color 0.15s",
                        }}
                      >
                        {label(item)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="px-7 py-6 border-t" style={{ borderColor: "var(--border)" }}>
            <div className="space-y-2.5 mb-5">
              {[
                { label: "GitHub",   href: "https://github.com/sedatoneer"      },
                { label: "LinkedIn", href: "https://linkedin.com/in/sedatoneer" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "8px",
                      color: "var(--fg-dim)",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      transition: "color 0.15s",
                    }}
                    className="group-hover:!text-[var(--fg)]"
                  >
                    {label}
                  </span>
                </a>
              ))}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "7.5px",
                color: "var(--fg-dim)",
                letterSpacing: "0.1em",
                lineHeight: 1.8,
              }}
            >
              Istanbul, Turkey
              <br />
              2025
            </div>
          </div>
        </div>
      </aside>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[130] md:hidden"
            style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
