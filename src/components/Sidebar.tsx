"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, FolderGit2, User, Send, 
  Github, Linkedin, Instagram, Menu, X 
} from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const { t, isIntro } = useSite();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (isIntro) return null;

  const menuItems = [
    { href: "/", label: t.sidebar.menu.dashboard, icon: <LayoutDashboard size={18} /> },
    { href: "/projects", label: t.sidebar.menu.projects, icon: <FolderGit2 size={18} /> },
    { href: "/about", label: t.sidebar.menu.about, icon: <User size={18} /> },
    { href: "/contact", label: t.sidebar.menu.contact, icon: <Send size={18} /> },
  ];

  return (
    <>
      {/* MOBİL ÜST BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0c0c0e]/80 backdrop-blur-lg border-b border-white/5 z-110 flex items-center justify-between px-6">
        {/* Mobilde İsim Logosu */}
        <Link href="/" className="group">
          <span className="font-bold text-white uppercase text-sm tracking-widest group-hover:text-blue-400 transition-colors">
            Sedat Öner
          </span>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR ANA GÖVDE */}
      <aside className={`
        fixed inset-y-0 left-0 z-120 w-72 bg-[#0c0c0e] border-r border-white/5 flex flex-col
        transition-transform duration-300 ease-in-out shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
      `}>
        {/* Logo ve Ünvan Alanı - Tıklanabilir Yapıldı */}
        <div className="h-32 flex flex-col justify-center px-8 border-b border-white/5">
          <Link href="/" className="group inline-block">
            <motion.div layoutId="brand-wrapper" className="flex flex-col">
              <motion.h1 layoutId="brand-text" className="text-2xl font-bold tracking-tighter text-white group-hover:text-blue-400 transition-colors">
                SEDAT ÖNER
              </motion.h1>
              <motion.span layoutId="brand-subtitle" className="text-[10px] text-blue-500 uppercase font-mono mt-1 tracking-widest">
                {t.sidebar.role}
              </motion.span>
            </motion.div>
          </Link>
        </div>

        {/* Navigasyon Linkleri */}
        <nav className="flex flex-col p-4 gap-2 overflow-y-auto grow custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? "bg-white/10 text-white border border-white/10 shadow-lg shadow-blue-500/5" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                  <span className={isActive ? "text-blue-400" : "text-gray-500 group-hover:text-white"}>
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-8 border-t border-white/5 bg-[#0c0c0e]">
          <div className="flex gap-4 justify-center md:justify-start">
            <SocialIcon icon={<Github size={20} />} href="https://github.com/sedatoneer" />
            <SocialIcon icon={<Linkedin size={20} />} href="https://linkedin.com/in/sedatoneer" />
            <SocialIcon icon={<Instagram size={20} />} href="https://instagram.com/sedatoneer" />
          </div>
        </div>
      </aside>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-115 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}

function SocialIcon({ icon, href }: { icon: any, href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-white transition-all p-2 hover:bg-white/10 rounded-lg active:scale-95"
    >
      {icon}
    </a>
  );
}