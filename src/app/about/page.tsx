"use client";

import { useSite } from "@/context/SiteContext";
import { motion } from "framer-motion";
import { 
  Briefcase, GraduationCap, Calendar, 
  Code2, Terminal, Wrench, Languages 
} from "lucide-react";

export default function AboutPage() {
  const { t } = useSite();

  const skillCategories = [
    {
      title: t.about.skills_section.categories[0].title,
      icon: <Code2 size={20} />,
      skills: t.about.skills_section.categories[0].skills
    },
    {
      title: t.about.skills_section.categories[1].title,
      icon: <Terminal size={20} />,
      skills: t.about.skills_section.categories[1].skills
    },
    {
      title: t.about.skills_section.categories[2].title,
      icon: <Wrench size={20} />,
      skills: t.about.skills_section.categories[2].skills
    },
    {
      title: t.about.skills_section.categories[3].title,
      icon: <Languages size={20} />,
      skills: t.about.skills_section.categories[3].skills
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pt-10 pb-20 px-4 md:px-0">
       <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
       >
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">{t.about.title}</h2>
       </motion.div>

       <div className="relative space-y-12 border-l border-white/10 pl-6 md:pl-8 ml-2 md:ml-4 mb-20">
           {t.about.timeline.map((item: any, index: number) => (
               <motion.div
                   key={index}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.1 }}
                   className="relative group"
               >
                   <div className="absolute -left-6.75 md:-left-8.75 top-1.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-[#09090b] border-2 border-blue-500 rounded-full group-hover:scale-125 group-hover:bg-blue-500 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
                   
                   <div className="mb-2">
                     <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20 uppercase">
                        <Calendar size={12} />
                        {item.year}
                     </span>
                   </div>

                   <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                       {item.role}
                   </h3>
                   
                   <div className="text-sm text-gray-300 font-medium mb-3 flex items-center gap-2">
                       {(item.company.includes("Üniversite") || item.company.includes("University") || item.company.includes("Üni")) 
                          ? <GraduationCap size={16} className="text-gray-500"/> 
                          : <Briefcase size={16} className="text-gray-500"/>
                       }
                       {item.company}
                   </div>

                   <p className="text-gray-400 text-sm leading-relaxed max-w-2xl whitespace-pre-line">
                       {item.desc}
                   </p>
               </motion.div>
           ))}
       </div>

       <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="pt-10 border-t border-white/5"
       >
          <h2 className="text-2xl font-bold mb-8 text-white uppercase tracking-tight">{t.about.skills_section.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {skillCategories.map((cat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-5 md:p-6 rounded-2xl bg-[#0c0c0e] border border-white/5 hover:border-blue-500/20 transition-all duration-300 flex flex-col h-full"
                  >
                      <div className="flex items-center gap-3 mb-4 text-blue-400 font-bold">
                          {cat.icon}
                          <span className="text-xs uppercase tracking-widest">{cat.title}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto">
                          {cat.skills.map(skill => (
                              <span key={skill} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] md:text-xs text-gray-400 hover:text-white hover:border-white/20 transition-colors">
                                  {skill}
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