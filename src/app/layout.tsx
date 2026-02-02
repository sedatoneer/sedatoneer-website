"use client";

import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteProvider, useSite } from "@/context/SiteContext";
import Sidebar from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

function DynamicSEO() {
  const { lang } = useSite();
  
  useEffect(() => {
    const title = lang === "tr" 
      ? "Sedat Öner | Bilgisayar Mühendisi & Pratech Kurucu Ortak" 
      : "Sedat Öner | Computer Engineer & Pratech Co-Founder";
    
    const description = lang === "tr"
      ? "Görüntü İşleme, Otomasyon ve Backend teknolojileri üzerine odaklanan Bilgisayar Mühendisliği öğrencisi ve Pratech kurucu ortağı."
      : "Computer Engineering student and Pratech co-founder specializing in Computer Vision, Automation, and Backend technologies.";

    document.title = title;
    
    // Meta açıkla
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
  }, [lang]);

  return null;
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isIntro, lang, setLang } = useSite();

  return (
    <body className={`${inter.variable} ${jetbrains.variable} bg-[#09090b] text-white antialiased selection:bg-blue-500/30 overflow-x-hidden`}>
      <DynamicSEO />
      
      {/* Intro Overlay [cite: 1, 51] */}
      <AnimatePresence>
        {isIntro && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b]">
            <motion.div layoutId="brand-wrapper" className="flex flex-col items-center">
              <motion.h1 layoutId="brand-text" className="text-5xl md:text-8xl font-bold tracking-tighter text-white uppercase">
                Sedat Öner
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar />

      <main className="flex-1 md:ml-72 min-h-screen relative">
        
        {/* Dil Seçici - Sabit ve Blur Efektli */}
        {!isIntro && (
            <div className="fixed top-8 right-8 z-100 flex items-center gap-2 bg-[#0c0c0e]/80 backdrop-blur-md border border-white/10 p-1 rounded-full shadow-2xl">
               <button 
                 onClick={() => setLang("tr")} 
                 className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === "tr" ? "bg-white text-black" : "text-gray-500 hover:text-white"}`}
               >
                 TR
               </button>
               <button 
                 onClick={() => setLang("en")} 
                 className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === "en" ? "bg-white text-black" : "text-gray-500 hover:text-white"}`}
               >
                 EN
               </button>
            </div>
        )}

        <div className="fixed inset-0 z-[-1] opacity-[0.02] pointer-events-none" 
              style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
        </div>

        <div className="p-6 md:p-16">
          {!isIntro && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
    <html lang="tr" className="dark">
      <SiteProvider>
        <LayoutContent>{children}</LayoutContent>
      </SiteProvider>
    </html>
  );
}