"use client";

import { useSite } from "@/context/SiteContext";
import { ExternalLink, Cpu, Code2, Terminal, Layers, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const { t } = useSite();

  const projectsList = t.projects_page.items;
  const pageTitle = t.projects_page.title;
  const pageDesc = t.projects_page.desc;

  return (
    <div className="max-w-6xl mx-auto pt-10 pb-20 px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">{pageTitle}</h2>
        <p className="text-gray-400 mb-8 max-w-2xl text-sm md:text-base">{pageDesc}</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsList.map((project: any, index: number) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-6 rounded-3xl bg-[#0c0c0e] border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  {getIconByCategory(project.stat)}
               </div>
               <span className="text-[10px] md:text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded">
                 {project.stat}
               </span>
            </div>

            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {project.title}
            </h4>
            
            <p className="text-sm text-gray-400 mb-6 grow leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech: string) => (
                    <span key={tech} className="text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                      {tech}
                    </span>
                ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-4">
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-blue-400 transition-colors group/link"
                >
                    {t.projects_page.view_code}
                    <ExternalLink size={12} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              )}
              
              {project.demoLink && (
                <a 
                  href={project.demoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-green-400 hover:text-green-300 transition-colors group/demo"
                >
                    {t.projects_page.live_demo}
                    <PlayCircle size={12} className="group-hover/demo:scale-110 transition-transform" />
                </a>
              )}

              {!project.link && !project.demoLink && (
                <span className="text-xs font-mono text-gray-600 cursor-not-allowed">
                  {t.projects_page.private}
                </span>
              )}
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
}

function getIconByCategory(category: string) {
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes("otomasyon") || lowerCat.includes("automation")) return <Cpu size={24} />;
  if (lowerCat.includes("yapay") || lowerCat.includes("ai")) return <Layers size={24} />;
  if (lowerCat.includes("modding") || lowerCat.includes("reverse")) return <Code2 size={24} />;
  if (lowerCat.includes("data") || lowerCat.includes("veri")) return <Terminal size={24} />;
  return <Cpu size={24} />;
}