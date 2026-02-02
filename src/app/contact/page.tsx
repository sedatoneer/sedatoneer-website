"use client";

import { useSite } from "@/context/SiteContext";
import { Terminal, Mail, MapPin, Copy, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const { t } = useSite();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(t.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2 text-white">{t.contact.title}</h2>
        <p className="text-gray-400 mb-6 text-lg">{t.contact.desc}</p>
      </motion.div>
      
      <div className="grid grid-cols-1 gap-4">
        {/* E-MAIL KARTI */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="group p-6 bg-[#0c0c0e] border border-white/5 rounded-2xl flex items-center gap-6 hover:border-blue-500/30 transition-all duration-300"
        >
            <div className="p-4 bg-blue-500/10 text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                <Mail size={28} />
            </div>
            <div className="grow">
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">E-Mail</div>
                <a href={`mailto:${t.contact.email}`} className="text-xl font-bold text-white hover:text-blue-400 break-all transition-colors">
                    {t.contact.email}
                </a>
            </div>
            <button 
                onClick={handleCopyEmail} 
                className="p-2 text-gray-500 hover:text-white transition-colors relative"
                title="Kopyala"
            >
                {copied ? <span className="text-xs text-green-500 font-bold">Kopyalandı!</span> : <Copy size={20} />}
            </button>
        </motion.div>

        {/* LINKEDIN KARTI */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="group p-6 bg-[#0c0c0e] border border-white/5 rounded-2xl flex items-center gap-6 hover:border-blue-600/30 transition-all duration-300"
        >
            <div className="p-4 bg-blue-600/10 text-blue-500 rounded-xl group-hover:scale-110 transition-transform">
                <Linkedin size={28} />
            </div>
            <div className="grow">
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">LinkedIn</div>
                <a 
                  href={`https://${t.contact.linkedin}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-white hover:text-blue-500 transition-colors"
                >
                    Sedat Öner
                </a>
            </div>
        </motion.div>

        {/* LOKASYON KARTI */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="group p-6 bg-[#0c0c0e] border border-white/5 rounded-2xl flex items-center gap-6 hover:border-purple-500/30 transition-all duration-300"
        >
            <div className="p-4 bg-purple-500/10 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
                <MapPin size={28} />
            </div>
            <div>
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Konum / Location</div>
                <div className="text-xl font-bold text-white">
                    {t.contact.location}
                </div>
            </div>
        </motion.div>

        {/* TERMINAL NOTU */}
        <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="pt-6 flex items-center gap-2 text-gray-600 text-sm font-mono"
        >
            <Terminal size={14} />
            <span>echo "{t.contact.terminal_note}"</span>
            <span className="w-2 h-4 bg-blue-500/50 animate-pulse"></span>
        </motion.div>
      </div>
    </div>
  );
}