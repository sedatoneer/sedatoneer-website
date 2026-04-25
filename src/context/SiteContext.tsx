"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CONTENT = {
  tr: {
    seo: {
      title: "Sedat Öner | Bilgisayar Mühendisi & Pratech Kurucu Ortak",
      description:
        "Görüntü İşleme, Otomasyon ve Backend teknolojileri üzerine odaklanan Bilgisayar Mühendisliği öğrencisi ve Pratech kurucu ortağı.",
    },
    sidebar: {
      role: "Mühendis ve Kurucu Ortak",
      menu: {
        dashboard: "Ana Sayfa",
        projects: "Projeler",
        about: "Hakkımda",
        contact: "İletişim",
      },
    },
    hero: {
      badge: "Backend & Otomasyon Geliştirici",
      description:
        "Bilgisayar Mühendisliği öğrencisiyim, aynı zamanda Pratech ve Qupsoft girişimlerinde geliştirici olarak çalışıyorum. Arka planda sessizce çalışan sistemler, otomasyon ve tersine mühendislik üzerine kafa yoruyorum.",
      cta_primary: "Projelerime Bak",
    },
    scroll_section: {
      label: "Seçili Çalışmalar",
      title: "Neler Yaptım",
    },
    projects_page: {
      title: "Projeler",
      desc: "Geliştirdiğim bazı açık kaynak ve ticari projeler.",
      view_code: "Kodu Gör",
      live_demo: "Canlı Demo",
      private: "Gizli / Geliştiriliyor",
      items: [
        {
          id: 10,
          title: "NAC Sistemi",
          category: "Ağ Güvenliği",
          description:
            "S3M Security staj değerlendirmesi için geliştirdiğim NAC sistemi. RADIUS protokolü (RFC 2865/2866) tabanlı AAA mimarisi — FreeRADIUS, PostgreSQL, Redis ve FastAPI policy engine. 35 birim testi.",
          tech: ["Python", "FastAPI", "FreeRADIUS", "PostgreSQL", "Redis", "Docker"],
          link: "https://github.com/sedatoneer/nac-system",
          stat: "Siber Güvenlik",
        },
        {
          id: 11,
          title: "NAC Gap Analyzer",
          category: "Güvenlik Analizi",
          description:
            "Yerel ağı tarayan, cihazları risk seviyesine göre sınıflandıran ve NAC sisteminin ne yapacağını simüle eden açık kaynak güvenlik analiz aracı. D3.js force graph ve PDF rapor üretimi.",
          tech: ["Python", "FastAPI", "React", "TypeScript", "D3.js", "Docker"],
          link: "https://github.com/sedatoneer/NAC-Gap-Analyzer",
          stat: "Güvenlik",
        },
        {
          id: 12,
          title: "AutoHeal",
          category: "Geliştirici Araçları",
          description:
            "Playwright testlerini izleyip LLM ile otomatik düzelten araç. DOM snapshot alır, hata bağlamını analiz eder, ts-morph ile AST patch uygular ve testi yeniden çalıştırarak doğrular. OpenAI, Anthropic ve Ollama desteği.",
          tech: ["TypeScript", "Node.js", "Playwright", "ts-morph", "OpenAI", "Anthropic"],
          link: "https://github.com/sedatoneer/AutoHeal",
          stat: "AI / OSS",
        },
        {
          id: 13,
          title: "CleanDev",
          category: "Masaüstü Uygulama",
          description:
            "Cleantr'ın cross-platform fork'u. Terk edilmiş git projelerini tespit eden Dead Project Detector (10 ekosistem: Node, Python, Rust, Go, Java...) ve global paket önbelleği tarayıcı ekler. Windows, macOS, Linux.",
          tech: ["Electron", "TypeScript", "React", "Node.js"],
          link: "https://github.com/sedatoneer/cleandev",
          stat: "OSS",
        },
        {
          id: 6,
          title: "Pratech",
          category: "Full Stack ve Startup",
          description:
            "Dijital Makbuz ve Gider Yönetimi girişimi. Tüm backend ve sunucu altyapısını, kurumsal web sitesini ve kullanıcı panelini sıfırdan tasarlayıp geliştirdim.",
          tech: ["FastAPI", "React", "PostgreSQL", "Docker"],
          link: "",
          stat: "Startup",
        },
        {
          id: 7,
          title: "Qupsoft",
          category: "Full Stack",
          description:
            "B2B + B2C dijital fiş ve gider yönetimi platformunun tam yığın geliştirmesi. React, FastAPI ve PostgreSQL ile ölçeklenebilir mimari.",
          tech: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
          link: "",
          stat: "Full Stack",
        },
        {
          id: 5,
          title: "FlexFarm",
          category: "Eğitim ve Oyunlaştırma",
          description:
            "CSS Flexbox mantığını oyunlaştırarak öğreten interaktif web uygulaması. 20 bölümlük müfredat, hikaye modu ve canlı kod editörü içerir.",
          tech: ["React", "TypeScript", "Tailwind CSS"],
          link: "https://github.com/sedatoneer/flexfarm",
          demoLink: "https://flexfarm-tr.netlify.app",
          stat: "Gamification",
        },
        {
          id: 14,
          title: "STEMxFuture",
          category: "Web Geliştirme",
          description:
            "STEMxFuture STEM STK'sının kurumsal web sitesi. HTML, CSS ve JavaScript ile sıfırdan geliştirildi.",
          tech: ["HTML", "CSS", "JavaScript"],
          link: "https://github.com/e330203-blip/stemxfuture",
          stat: "NGO / Web",
        },
        {
          id: 1,
          title: "WhatsControl",
          category: "Otomasyon",
          description:
            "Selenium ile WhatsApp Web'i dinleyerek gelen mesajları algılayan ve ADB komutlarıyla Mi Box'ı yöneten otomasyon sistemi.",
          tech: ["Python", "Selenium", "ADB"],
          link: "https://github.com/sedatoneer/whatsapp-remote",
          stat: "Otomasyon",
        },
        {
          id: 2,
          title: "eQualiter",
          category: "Görüntü İşleme",
          description:
            "El hareketleri ile bilgisayar ses ve medya kontrolü. MediaPipe ile el izi takibi, OpenCV ile görüntü işleme.",
          tech: ["Python", "OpenCV", "MediaPipe", "C++"],
          link: "https://github.com/sedatoneer/equaliter",
          stat: "Görüntü İşleme",
        },
        {
          id: 4,
          title: "Veri Botları",
          category: "Veri Mühendisliği",
          description:
            "EKAP gibi platformlardan binlerce satır veriyi çekip işleyen botlar.",
          tech: ["Python", "Selenium", "Pandas"],
          link: "",
          stat: "Big Data",
        },
      ],
    },
    about: {
      title: "Hakkımda",
      bio: "Backend sistemleri, otomasyon ve görüntü işleme üzerine yoğunlaşan bir mühendis olarak; karmaşıklığı güvenilir ve sessiz çalışan sistemlere dönüştürmeye odaklanıyorum.",
      principles: [
        "Arka planda çalışan sistemler inşa ederim.",
        "Otomasyon, tekrarın düşmanıdır.",
        "Kod; altyapıdır, sadece özellik değil.",
      ],
      timeline: [
        {
          year: "Mar 2026 — Günümüz",
          role: "Full Stack Developer",
          company: "Qupsoft",
          desc: "B2B + B2C dijital fiş yönetimi platformunun tam yığın geliştirmesi. React, FastAPI ve PostgreSQL mimarisi ile ölçeklenebilir altyapı kurulumu. Düzce, Hibrit.",
        },
        {
          year: "Mar 2026 — Günümüz",
          role: "IT Departmanı Başkanı",
          company: "STEMxFuture",
          desc: "STEM STK'sının IT altyapısı ve dijital dönüşüm süreçlerinin yönetimi. İstanbul, Uzaktan.",
        },
        {
          year: "Sep 2025 — Günümüz",
          role: "Kurucu Ortak",
          company: "Pratech",
          desc: "Dijital Makbuz ve Gider Yönetimi girişiminin tüm teknik altyapısının sıfırdan tasarımı ve geliştirilmesi. Düzce, Hibrit.",
        },
        {
          year: "May 2025 — Günümüz",
          role: "Proje & Ar-Ge Departmanı Başkanı",
          company: "Düzce Üni. Kalite Topluluğu",
          desc: "Teknik projelerin yönetimi, araştırma süreçlerine liderlik ve ekip koordinasyonu.",
        },
        {
          year: "Feb 2025 — May 2025",
          role: "Proje & Ar-Ge Departmanı Üyesi",
          company: "Düzce Üni. Kalite Topluluğu",
          desc: "Araştırma projelerine katkı ve geliştirme süreçlerinde aktif rol.",
        },
        {
          year: "2023 — 2028",
          role: "Bilgisayar Mühendisliği",
          company: "Düzce Üniversitesi",
          desc: "Lisans Eğitimi",
        },
        {
          year: "2022 — Günümüz",
          role: "Freelance Geliştirici",
          company: "Bağımsız",
          desc: "Python, Selenium ve çeşitli web teknolojileriyle otomasyon, veri kazıma ve kurumsal web projeleri.",
        },
      ],
      skills_section: {
        title: "Teknik Yetkinlikler",
        categories: [
          {
            title: "Programlama Dilleri",
            skills: ["Python", "C++", "C#", "JavaScript", "TypeScript", "SQL"],
          },
          {
            title: "Uzmanlık Alanları",
            skills: [
              "Web Scraping",
              "Otomasyon",
              "Backend Dev",
              "Görüntü İşleme",
              "Tersine Mühendislik",
              "Full Stack",
            ],
          },
          {
            title: "Araçlar & Kütüphaneler",
            skills: ["Git/GitHub", "Selenium", "FastAPI", "React", "Pandas", "OpenCV"],
          },
          {
            title: "Diller",
            skills: ["Türkçe (Anadil)", "İngilizce (Teknik)"],
          },
        ],
      },
    },
    contact: {
      title: "İletişim",
      desc: "Projeleriniz veya iş birlikleri için bana ulaşabilirsiniz.",
      email: "sedatoneer@gmail.com",
      linkedin: "linkedin.com/in/sedatoneer",
      location: "İstanbul, Türkiye",
      terminal_note: "Yeni projelere açığım.",
    },
  },
  en: {
    seo: {
      title: "Sedat Oner | Computer Engineer & Pratech Co-Founder",
      description:
        "Computer Engineering student and Pratech co-founder specializing in Computer Vision, Automation, and Backend technologies.",
    },
    sidebar: {
      role: "Engineer and Co-Founder",
      menu: {
        dashboard: "Home",
        projects: "Projects",
        about: "About",
        contact: "Contact",
      },
    },
    hero: {
      badge: "Backend & Automation Developer",
      description:
        "Computer Engineering student, co-founder at Pratech, and full-stack developer at Qupsoft. I focus on systems that run silently in the background — automation, scraping, and the infrastructure beneath the surface.",
      cta_primary: "View My Work",
    },
    scroll_section: {
      label: "Selected Work",
      title: "What I've Built",
    },
    projects_page: {
      title: "Projects",
      desc: "Some open source and commercial projects I've built.",
      view_code: "View Code",
      live_demo: "Live Demo",
      private: "Private / In Progress",
      items: [
        {
          id: 10,
          title: "NAC System",
          category: "Network Security",
          description:
            "NAC system built for S3M Security internship evaluation. AAA architecture on RADIUS protocol (RFC 2865/2866) — FreeRADIUS, PostgreSQL, Redis, and FastAPI policy engine. 35 unit tests.",
          tech: ["Python", "FastAPI", "FreeRADIUS", "PostgreSQL", "Redis", "Docker"],
          link: "https://github.com/sedatoneer/nac-system",
          stat: "Cybersec",
        },
        {
          id: 11,
          title: "NAC Gap Analyzer",
          category: "Security Analysis",
          description:
            "Open-source tool that scans your local network, fingerprints devices by risk level, and simulates what a NAC system would enforce — without deploying any infrastructure. D3.js force graph and PDF report generation.",
          tech: ["Python", "FastAPI", "React", "TypeScript", "D3.js", "Docker"],
          link: "https://github.com/sedatoneer/NAC-Gap-Analyzer",
          stat: "Security",
        },
        {
          id: 12,
          title: "AutoHeal",
          category: "Developer Tools",
          description:
            "Watches Playwright tests break and auto-fixes them with an LLM. Captures DOM snapshot, assembles failure context, applies AST patches via ts-morph, and re-runs to verify. Supports OpenAI, Anthropic, and Ollama.",
          tech: ["TypeScript", "Node.js", "Playwright", "ts-morph", "OpenAI", "Anthropic"],
          link: "https://github.com/sedatoneer/AutoHeal",
          stat: "AI / OSS",
        },
        {
          id: 13,
          title: "CleanDev",
          category: "Desktop App",
          description:
            "Cross-platform fork of Cleantr. Adds a Dead Project Detector (10 ecosystems: Node, Python, Rust, Go, Java…) that finds abandoned git repos and clears build artifacts, plus a global package cache scanner. Windows, macOS, Linux.",
          tech: ["Electron", "TypeScript", "React", "Node.js"],
          link: "https://github.com/sedatoneer/cleandev",
          stat: "OSS",
        },
        {
          id: 6,
          title: "Pratech",
          category: "Full Stack & Startup",
          description:
            "Digital Receipt & Expense Management startup. Designed and built the entire backend, server infrastructure, corporate website, and user dashboard from scratch.",
          tech: ["FastAPI", "React", "PostgreSQL", "Docker"],
          link: "",
          stat: "Startup",
        },
        {
          id: 7,
          title: "Qupsoft",
          category: "Full Stack",
          description:
            "Full-stack development of a B2B + B2C digital receipt management platform. Scalable architecture using React, FastAPI, and PostgreSQL.",
          tech: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
          link: "",
          stat: "Full Stack",
        },
        {
          id: 5,
          title: "FlexFarm",
          category: "Education & Gamification",
          description:
            "An interactive web game teaching CSS Flexbox logic. Features 20 levels, story mode, and a live code editor.",
          tech: ["React", "TypeScript", "Tailwind CSS"],
          link: "https://github.com/sedatoneer/flexfarm",
          demoLink: "https://flexfarm-tr.netlify.app",
          stat: "Gamification",
        },
        {
          id: 14,
          title: "STEMxFuture",
          category: "Web Development",
          description:
            "Official website for the STEMxFuture STEM NGO. Built from scratch with HTML, CSS, and JavaScript.",
          tech: ["HTML", "CSS", "JavaScript"],
          link: "https://github.com/e330203-blip/stemxfuture",
          stat: "NGO / Web",
        },
        {
          id: 1,
          title: "WhatsControl",
          category: "Automation",
          description:
            "Automation system that controls Mi Box via WhatsApp messages using Selenium and ADB commands.",
          tech: ["Python", "Selenium", "ADB"],
          link: "https://github.com/sedatoneer/whatsapp-remote",
          stat: "Automation",
        },
        {
          id: 2,
          title: "eQualiter",
          category: "Computer Vision",
          description:
            "Contactless media control via hand gestures. MediaPipe for hand tracking, OpenCV for image processing.",
          tech: ["Python", "OpenCV", "MediaPipe", "C++"],
          link: "https://github.com/sedatoneer/equaliter",
          stat: "CV / ML",
        },
        {
          id: 4,
          title: "Data Bots",
          category: "Data Engineering",
          description:
            "High-performance data scraping bots for platforms like EKAP. Private source code.",
          tech: ["Python", "Selenium", "Pandas"],
          link: "",
          stat: "Big Data",
        },
      ],
    },
    about: {
      title: "About",
      bio: "An engineer focused on backend systems, automation, and computer vision — turning complexity into reliable, quietly-running infrastructure.",
      principles: [
        "I build systems that run without supervision.",
        "Automation is the enemy of repetition.",
        "Code is infrastructure, not just features.",
      ],
      timeline: [
        {
          year: "Mar 2026 — Present",
          role: "Full Stack Developer",
          company: "Qupsoft",
          desc: "Full-stack development of a B2B + B2C digital receipt management platform. Scalable architecture using React, FastAPI, and PostgreSQL. Düzce, Hybrid.",
        },
        {
          year: "Mar 2026 — Present",
          role: "Head of IT Department",
          company: "STEMxFuture",
          desc: "Managing IT infrastructure and digital transformation for a STEM NGO. Istanbul, Remote.",
        },
        {
          year: "Sep 2025 — Present",
          role: "Co-Founder",
          company: "Pratech",
          desc: "Designed and built the entire technical infrastructure for a digital receipt and expense management startup from the ground up. Düzce, Hybrid.",
        },
        {
          year: "May 2025 — Present",
          role: "Project & R&D Dept. Head",
          company: "Duzce Univ. Quality Community",
          desc: "Leading technical projects, research processes, and team coordination.",
        },
        {
          year: "Feb 2025 — May 2025",
          role: "Project & R&D Dept. Member",
          company: "Duzce Univ. Quality Community",
          desc: "Contributing to research projects and active involvement in development processes.",
        },
        {
          year: "2023 — 2028",
          role: "Computer Engineering",
          company: "Duzce University",
          desc: "Bachelor's Degree",
        },
        {
          year: "2022 — Present",
          role: "Freelance Developer",
          company: "Independent",
          desc: "Automation, web scraping, and corporate web projects using Python, Selenium, and various web technologies.",
        },
      ],
      skills_section: {
        title: "Technical Skills",
        categories: [
          {
            title: "Programming Languages",
            skills: ["Python", "C++", "C#", "JavaScript", "TypeScript", "SQL"],
          },
          {
            title: "Core Competencies",
            skills: [
              "Web Scraping",
              "Automation",
              "Backend",
              "Computer Vision",
              "Reverse Engineering",
              "Full Stack",
            ],
          },
          {
            title: "Tools & Libraries",
            skills: ["Git/GitHub", "Selenium", "FastAPI", "React", "Pandas", "OpenCV"],
          },
          {
            title: "Languages",
            skills: ["Turkish (Native)", "English (Technical)"],
          },
        ],
      },
    },
    contact: {
      title: "Contact",
      desc: "Reach out for projects or collaborations.",
      email: "sedatoneer@gmail.com",
      linkedin: "linkedin.com/in/sedatoneer",
      location: "Istanbul, Turkey",
      terminal_note: "Open to new projects.",
    },
  },
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
    <SiteContext.Provider
      value={{ lang, setLang, t: CONTENT[lang], isIntro, setIsIntro }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = React.useContext(SiteContext);
  if (!context) throw new Error("useSite must be used within a SiteProvider");
  return context;
}
