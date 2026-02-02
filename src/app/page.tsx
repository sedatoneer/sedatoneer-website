"use client";

import { useSite } from "@/context/SiteContext";
import { ArrowRight, Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  const { t, lang } = useSite();

  return (
    <div className="max-w-5xl mx-auto pt-10 pb-20 px-4 md:px-0">
        
        {/* Badge - Rozet */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] md:text-xs font-mono border border-blue-500/20 mb-6 uppercase tracking-wider">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
               {t.hero.badge}
          </span>
        </motion.div>
        
        {/* Ana Başlık ve Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-6 tracking-tighter flex flex-wrap gap-x-2 md:gap-x-3">
                <span>{t.hero.title_line1}</span>
                <span className="text-blue-500 min-h-[1.2em]">
                    <Typewriter
                        key={lang} 
                        words={t.intro_titles}
                        loop={0}
                        cursor
                        cursorStyle='|'
                        typeSpeed={60}
                        deleteSpeed={40}
                        delaySpeed={2000}
                    />
                </span>
            </h2>
        </motion.div>
        
        {/* Açıklama Metni */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed mb-10"
        >
            {t.hero.description}
        </motion.p>

        {/* Butonlar ve Sosyal Medya */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4"
        >
          <Link href="/projects">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-95 cursor-pointer shadow-xl shadow-white/5">
              {t.hero.cta_primary} <ArrowRight size={18} />
            </button>
          </Link>
          
          <div className="flex items-center gap-5 px-2">
            <SocialIcon icon={<Github size={22} />} href="https://github.com/sedatoneer" />
            <SocialIcon icon={<Linkedin size={22} />} href="https://linkedin.com/in/sedatoneer" />
            <SocialIcon icon={<Instagram size={22} />} href="https://instagram.com/sedatoneer" />
          </div>
        </motion.div>
    </div>
  );
}

function SocialIcon({ icon, href }: { icon: any, href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-white transition-all p-2 hover:bg-white/10 rounded-lg transform hover:-translate-y-1 duration-200"
    >
      {icon}
    </a>
  )
}