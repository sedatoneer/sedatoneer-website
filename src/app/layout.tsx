"use client";

import { Cormorant, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteProvider, useSite } from "@/context/SiteContext";
import Sidebar from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "600"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

function DynamicSEO() {
  const { lang } = useSite();
  useEffect(() => {
    document.title =
      lang === "tr"
        ? "Sedat Öner | Bilgisayar Mühendisi & Kurucu Ortak"
        : "Sedat Öner | Software Engineer & Co-Founder";
  }, [lang]);
  return null;
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isIntro, lang, setLang } = useSite();

  const btnStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    letterSpacing: "0.22em",
    color: active ? "var(--fg)" : "var(--fg-dim)",
    background: "none",
    border: "none",
    borderBottom: active ? "1px solid var(--accent)" : "1px solid transparent",
    paddingBottom: "2px",
    cursor: "pointer",
    transition: "color 0.15s, border-color 0.15s",
    textTransform: "uppercase",
  });

  return (
    <body className={`${cormorant.variable} ${instrumentSans.variable} ${ibmPlexMono.variable}`}>
      <DynamicSEO />

      <AnimatePresence>
        {isIntro && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 400,
                  fontSize: "clamp(32px, 7vw, 72px)",
                  letterSpacing: "0.22em",
                  color: "var(--fg)",
                  lineHeight: 1,
                  textAlign: "center",
                }}
              >
                SEDAT ÖNER
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "8px",
                  letterSpacing: "0.32em",
                  color: "var(--fg-mid)",
                  textTransform: "uppercase",
                  textAlign: "center",
                  marginTop: "14px",
                }}
              >
                Istanbul, Turkey
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar />

      <main className="md:ml-56 min-h-screen">
        {!isIntro && (
          <div className="fixed top-6 right-7 z-[100] flex items-center gap-5">
            <button style={btnStyle(lang === "tr")} onClick={() => setLang("tr")}>TR</button>
            <button style={btnStyle(lang === "en")} onClick={() => setLang("en")}>EN</button>
          </div>
        )}

        <div className="px-8 py-12 pt-20 md:pt-12 md:px-14 lg:px-16">
          {!isIntro && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </main>
    </body>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <SiteProvider>
        <LayoutContent>{children}</LayoutContent>
      </SiteProvider>
    </html>
  );
}
