"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CONTENT = {
  tr: {
    seo: {
      title: "Sedat Öner | Bilgisayar Mühendisi & Pratech Kurucu Ortak",
      description: "Görüntü İşleme, Otomasyon ve Backend teknolojileri üzerine odaklanan Bilgisayar Mühendisliği öğrencisi ve Pratech kurucu ortağı."
    },
    intro_titles: [
      "Sedat Öner.",
      "Bilgisayar Mühendisiyim.",
      "Pratech Kurucu Ortağıyım.",
      "Backend & Otomasyon Mimarıyım.",
      "Freelancerım."
    ],
    sidebar: {
      role: "Mühendis ve Kurucu Ortak",
      menu: { dashboard: "Ana Sayfa", projects: "Projeler", about: "Hakkımda", contact: "İletişim" }
    },
    hero: {
      badge: "Backend ve Otomasyon Geliştirici",
      title_line1: "Merhaba, Ben",
      description: "Bilgisayar Mühendisliği öğrencisiyim, aynı zamanda Pratech girişiminin kurucu ortağıyım. Genellikle arka planda çalışan sistemler, otomasyonlar ve tersine mühendislik üzerine kafa yoruyorum. Ayrıca freelance olarak veri madenciliği ve otomasyon çözümleri sunuyorum.",
      cta_primary: "Neler Yaptım?",
      cta_secondary: "GitHub Profilim",
    },
    projects_page: {
      title: "Seçili Projeler",
      desc: "Geliştirdiğim bazı açık kaynak ve ticari projeler.",
      view_code: "Kodu İncele",
      live_demo: "Canlı Demo",
      private: "Gizli / Geliştiriliyor",
      items: [
        {
          id: 5,
          title: "FlexFarm",
          category: "Eğitim ve Oyunlaştırma",
          description: "CSS Flexbox mantığını oyunlaştırarak öğreten interaktif web uygulaması. 20 bölümlük müfredat, hikaye modu ve canlı kod editörü içerir.",
          tech: ["React", "TypeScript", "Tailwind CSS"],
          link: "https://github.com/sedatoneer/flexfarm",
          demoLink: "https://flexfarm-tr.netlify.app",
          stat: "Gamification"
        },
        {
          id: 1,
          title: "WhatsControl",
          category: "Otomasyon ve Python",
          description: "Selenium ile WhatsApp Web'i dinleyerek gelen mesajları ('Netflix aç', 'TV kapat' vb.) algılayan ve ADB komutlarıyla Mi Box'ı yöneten otomasyon sistemi.",
          tech: ["Python", "Selenium", "ADB"],
          link: "https://github.com/sedatoneer/whatsapp-remote",
          stat: "Otomasyon"
        },
        {
          id: 2,
          title: "eQualiter",
          category: "Görüntü İşleme",
          description: "El hareketleri ile bilgisayar ses ve medya kontrolü. MediaPipe ve OpenCV kullanıldı.",
          tech: ["Python", "OpenCV", "C++"],
          link: "https://github.com/sedatoneer/equaliter",
          stat: "Yapay Zeka"
        },
        {
          id: 6,
          title: "Pratech",
          category: "Full Stack ve Startup",
          description: "Dijital Makbuz ve Gider Yönetimi girişimi. Tüm backend ve sunucu altyapısını, kurumsal web sitesini ve kullanıcı panelini sıfırdan tasarlayıp geliştirdim.",
          tech: ["Full Stack", "Backend", "Database"],
          link: "", 
          stat: "Startup"
        },
        {
          id: 4,
          title: "Veri Botları",
          category: "Veri Mühendisliği",
          description: "EKAP gibi platformlardan binlerce satır veriyi çekip işleyen botlar. (Freelance işler olduğu için kaynak kodları kapalıdır.)",
          tech: ["Python", "Selenium", "Pandas"],
          link: "",
          stat: "Big Data"
        },
        {
          id: 3,
          title: "Stardew Valley Modları",
          category: "Tersine Mühendislik",
          description: "Kedinizi yanınıza çağıran ve ona çeşitli işlevler kazandıran, Harmony API ile geliştirilmiş oyun modu.",
          tech: ["C#", ".NET", "Harmony"],
          link: "",
          stat: "Modding"
        }
      ]
    },
    about: {
      title: "Hakkımda ve Deneyim",
      timeline: [
        {
          year: "2025 - Günümüz",
          role: "Kurucu Ortak",
          company: "Pratech",
          desc: "Dijital Makbuz ve Gider Yönetimi altyapısının sıfırdan kurulması. Veritabanı optimizasyonu ve teknik yol haritasının yönetimi."
        },
        {
          year: "2025 - Günümüz",
          role: "Ar-Ge Başkanı",
          company: "Düzce Üni. Kalite Topluluğu",
          desc: "Teknik ekiplere liderlik ve eğitim süreçlerinin yönetimi."
        },
        {
          year: "2023 - 2028",
          role: "Bilgisayar Mühendisliği",
          company: "Düzce Üniversitesi",
          desc: "Lisans Eğitimi"
        },
        {
          year: "2022 - Günümüz",
          role: "Freelance Geliştirici",
          company: "Remote",
          desc: "- Python ve Selenium ile veri kazıma ve otomasyon botları geliştirme.\n- Çeşitli web projeleri."
        }
      ],
      skills_section: {
        title: "Teknik Yetkinlikler",
        categories: [
          { title: "Programlama Dilleri", skills: ["Python", "C++", "C#", "JavaScript", "SQL"] },
          { title: "Uzmanlık Alanları", skills: ["Web Scraping", "Otomasyon", "Backend Dev", "Görüntü İşleme", "Tersine Mühendislik"] },
          { title: "Araçlar & Kütüphaneler", skills: ["Git/GitHub", "Selenium", "Pandas", "MediaPipe", ".NET Core", "OpenCV"] },
          { title: "Diller", skills: ["Türkçe (Anadil)", "İngilizce (Teknik Yetkinlik)"] }
        ]
      }
    },
    contact: {
      title: "İletişime Geç",
      desc: "Projeleriniz veya iş birlikleri için bana ulaşabilirsiniz.",
      email: "sedatoneer@gmail.com",
      linkedin: "linkedin.com/in/sedatoneer",
      location: "İstanbul, Türkiye",
      terminal_note: "Yeni projelere açığım..."
    }
  },
  en: {
    seo: {
      title: "Sedat Oner | Computer Engineer & Pratech Co-Founder",
      description: "Computer Engineering student and Pratech co-founder specializing in Computer Vision, Automation, and Backend technologies."
    },
    intro_titles: [
      "Sedat Oner.",
      "a Computer Engineer.",
      "a Backend Architect.",
      "the Co-Founder of Pratech.",
      "a Freelancer"
    ],
    sidebar: {
      role: "Engineer and Co-Founder",
      menu: { dashboard: "Home", projects: "Projects", about: "About Me", contact: "Contact" }
    },
    hero: {
      badge: "Backend and Automation Developer",
      title_line1: "Hello, I'm",
      description: "I am a Computer Engineering student and also a co-founder of the Pratech startup. I usually focus on systems that run in the background, automation, and reverse engineering. I also offer data mining and automation solutions as a freelancer.",
      cta_primary: "My Work",
      cta_secondary: "GitHub Profile",
    },
    projects_page: {
      title: "Selected Projects",
      desc: "Some open source and commercial projects I've built.",
      view_code: "View Code",
      live_demo: "Live Demo",
      private: "Private / In Progress",
      items: [
        {
          id: 5,
          title: "FlexFarm",
          category: "Education & Gamification",
          description: "An interactive web game teaching CSS Flexbox logic. Features 20 levels, story mode, and a live code editor.",
          tech: ["React", "TypeScript", "Tailwind CSS"],
          link: "https://github.com/sedatoneer/flexfarm",
          demoLink: "https://flexfarm-tr.netlify.app",
          stat: "Gamification"
        },
        {
          id: 1,
          title: "WhatsControl",
          category: "Automation & Python",
          description: "Automation system that controls Mi Box via WhatsApp messages using Selenium and ADB.",
          tech: ["Python", "Selenium", "ADB"],
          link: "https://github.com/sedatoneer/whatsapp-remote",
          stat: "Automation"
        },
        {
          id: 2,
          title: "eQualiter",
          category: "Computer Vision",
          description: "Contactless media control via hand gestures using MediaPipe and OpenCV.",
          tech: ["Python", "OpenCV", "C++"],
          link: "https://github.com/sedatoneer/equaliter",
          stat: "AI/ML"
        },
        {
          id: 6,
          title: "Pratech",
          category: "Full Stack & Startup",
          description: "Digital Receipt & Expense Management startup backend and infrastructure.",
          tech: ["Full Stack", "Backend", "Database"],
          link: "",
          stat: "Startup"
        },
        {
          id: 4,
          title: "Data Bots",
          category: "Data Engineering",
          description: "High-performance data scraping bots. Private source code.",
          tech: ["Python", "Selenium", "Pandas"],
          link: "",
          stat: "Big Data"
        },
        {
          id: 3,
          title: "Stardew Valley Mods",
          category: "Reverse Engineering",
          description: "Harmony API based game mod for cat companion functions.",
          tech: ["C#", ".NET", "Harmony"],
          link: "",
          stat: "Modding"
        }
      ]
    },
    about: {
      title: "About Me",
      timeline: [
        {
          year: "2025 - Present",
          role: "Co-Founder",
          company: "Pratech",
          desc: "Infrastructure design and technical roadmap management."
        },
        {
          year: "2025 - Present",
          role: "R&D Lead",
          company: "Duzce Univ. Quality Community",
          desc: "Technical mentorship and team management."
        },
        {
          year: "2023 - 2028",
          role: "Computer Engineering",
          company: "Duzce University",
          desc: "Bachelor's Degree"
        },
        {
          year: "2022 - Present",
          role: "Freelance Developer",
          company: "Remote",
          desc: "- Web scraping and automation bots.\n- Various web projects."
        }
      ],
      skills_section: {
        title: "Technical Skills",
        categories: [
          { title: "Programming Languages", skills: ["Python", "C++", "C#", "JavaScript", "SQL"] },
          { title: "Core Competencies", skills: ["Web Scraping", "Automation", "Backend", "Computer Vision", "Reverse Engineering"] },
          { title: "Tools & Libraries", skills: ["Git/GitHub", "Selenium", "Pandas", "MediaPipe", ".NET Core", "OpenCV"] },
          { title: "Languages", skills: ["Turkish (Native)", "English (Technical Proficiency)"] }
        ]
      }
    },
    contact: {
      title: "Contact",
      desc: "Reach out for projects or collaborations.",
      email: "sedatoneer@gmail.com",
      linkedin: "linkedin.com/in/sedatoneer",
      location: "Istanbul, Turkey",
      terminal_note: "Open to new projects..."
    }
  }
};

type Language = "tr" | "en";
type ContentType = typeof CONTENT["tr"];

interface SiteContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: ContentType;
  isIntro: boolean;
  setIsIntro: (status: boolean) => void;
}

const SiteContext = React.createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<Language>("tr");
  const [isIntro, setIsIntro] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SiteContext.Provider value={{ lang, setLang, t: CONTENT[lang], isIntro, setIsIntro }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = React.useContext(SiteContext);
  if (!context) throw new Error("useSite must be used within a SiteProvider");
  return context;
}