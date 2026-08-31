import type { Content } from "./types";

export const tr: Content = {
  meta: {
    title: "Sedat Öner — Backend ve Otomasyon Mühendisi",
    description:
      "Bilgisayar mühendisliği öğrencisi, Pratech kurucu ortağı, Qupsoft'ta full stack geliştirici. RADIUS policy engine'leri, ağ analiz araçları, kendini onaran test koşucuları ve kazıma botları.",
    tagline: "Kimse bakmazken çalışan sistemler",
  },
  nav: {
    home: "Ana Sayfa",
    projects: "Projeler",
    about: "Hakkımda",
    contact: "İletişim",
    skip: "İçeriğe geç",
  },
  window: {
    menu: ["Dosya", "Düzen", "Görünüm", "Yardım"],
    colorHint: "Renk seçmek için palete tıkla.",
    colorPicked: "Renk seçildi:",
  },
  home: {
    headline: "Merhaba, ben Sedat.",
    lede: "Düzce Üniversitesi'nde bilgisayar mühendisliği okuyorum. Pratech'in kurucu ortağıyım, Qupsoft'ta full stack geliştiriyorum. İşimin çoğu arka planda duruyor: fiş işleyen API'ler, ağ erişimini denetleyen policy engine'ler, gece çalışan kazıma botları.",
    doingLabel: "Yaptığım işler",
    doing: ["Backend", "Otomasyon", "Tersine mühendislik", "Görüntü işleme"],
    toProjects: "Projelere bak",
    toContact: "Bana yaz",
  },
  projects: {
    heading: "Projeler",
    lede: "Yaptığım işler. Kaynağı açık olanların koduna, olmayanların ne yaptığına bakabilirsin.",
    source: "Kaynak",
    demo: "Canlı",
    noSource: "Kapalı kaynak",
    howItWorks: "Nasıl çalışıyor",
    copy: {
      qupsoft: {
        domain: "Full stack · Üretim",
        summary:
          "B2B ve B2C dijital fiş ve gider yönetimi platformu. React arayüzü, FastAPI servisleri ve PostgreSQL şeması üzerinde çalışıyorum; çok kiracılı yapı ve rol tabanlı erişim dahil.",
      },
      pratech: {
        domain: "Kurucu ortak · Üretim",
        summary:
          "Dijital makbuz ve gider yönetimi girişimi. Backend'i, sunucu altyapısını, kurumsal siteyi ve kullanıcı panelini sıfırdan kurdum.",
      },
      "nac-system": {
        domain: "Ağ güvenliği",
        summary:
          "RADIUS (RFC 2865/2866) üzerine kurulu AAA mimarisi. FreeRADIUS kimlik doğrular, FastAPI policy engine kimin hangi VLAN'a düşeceğine karar verir, Redis oturumları tutar. 35 birim testi. S3M Security staj değerlendirmesi için yazıldı.",
      },
      "nac-gap-analyzer": {
        domain: "Güvenlik analizi",
        summary:
          "Yerel ağı tarar, cihazların parmak izini çıkarır ve bir NAC sisteminin ne uygulayacağını hiçbir altyapı kurmadan simüle eder. D3.js force graph ile topoloji görselleştirmesi ve PDF rapor üretimi.",
      },
      autoheal: {
        domain: "Geliştirici araçları",
        summary:
          "Kırılan Playwright testlerini bir LLM ile onarır. DOM anlık görüntüsünü alır, hata bağlamını toplar, ts-morph ile AST üzerinde yama uygular ve testi yeniden koşarak doğrular. OpenAI, Anthropic ve Ollama ile çalışır.",
      },
      cleandev: {
        domain: "Masaüstü uygulaması",
        summary:
          "Cleantr'ın cross-platform fork'u. Terk edilmiş git depolarını on ekosistemde (Node, Python, Rust, Go, Java…) bulan bir Dead Project Detector ve global paket önbelleği tarayıcısı ekliyor. Windows, macOS, Linux.",
      },
      equaliter: {
        domain: "Görüntü işleme",
        summary:
          "El hareketleriyle temassız ses ve medya kontrolü. MediaPipe el landmark'larını çıkarır, OpenCV kareleri işler, jest sistem ses seviyesine bağlanır.",
      },
      whatscontrol: {
        domain: "Otomasyon",
        summary:
          "Selenium ile WhatsApp Web'i dinler, gelen mesajları komut olarak ayrıştırır ve ADB üzerinden Mi Box'ı sürer. Uzaktan kumandayı kaybettiğim için yazdım.",
      },
      flexfarm: {
        domain: "Eğitim · Oyunlaştırma",
        summary:
          "CSS Flexbox'ı oynayarak öğreten interaktif web oyunu. 20 bölüm, hikâye modu ve canlı kod editörü.",
      },
      stemxfuture: {
        domain: "Web · STK",
        summary:
          "STEMxFuture STEM sivil toplum kuruluşunun kurumsal sitesi. Framework kullanmadan, sıfırdan yazıldı. Kuruluşun IT departmanını da yönetiyorum.",
      },
      "data-bots": {
        domain: "Veri mühendisliği",
        summary:
          "EKAP gibi ihale platformlarından binlerce satırı çeken ve işleyen kazıma botları. Gece çalışır, sabah temiz veri bırakır. Kaynak kapalı.",
      },
    },
  },
  status: {
    running: "hâlâ üzerinde çalışıyorum",
    shipped: "bitti",
    private: "kaynağı kapalı",
  },
  about: {
    heading: "Hakkımda",
    lede: "Karmaşıklığı, bakılmadan çalışan altyapıya çeviriyorum. En sevdiğim geri bildirim, bir şeyin aylardır sorunsuz döndüğünü fark etmemiş olmak.",
    timelineHeading: "Deneyim",
    presentWord: "Günümüz",
    skillsHeading: "Yetkinlikler",
    timeline: [
      {
        period: "Mar 2026 — Günümüz",
        role: "Full Stack Developer",
        org: "Qupsoft",
        detail:
          "B2B ve B2C dijital fiş platformunun tam yığın geliştirmesi. React, FastAPI ve PostgreSQL üzerinde ölçeklenebilir mimari. Düzce, hibrit.",
      },
      {
        period: "Mar 2026 — Günümüz",
        role: "IT Departmanı Başkanı",
        org: "STEMxFuture",
        detail:
          "STEM sivil toplum kuruluşunun IT altyapısı ve dijital dönüşüm süreçleri. İstanbul, uzaktan.",
      },
      {
        period: "Eyl 2025 — Günümüz",
        role: "Kurucu Ortak",
        org: "Pratech",
        detail:
          "Dijital makbuz ve gider yönetimi girişiminin tüm teknik altyapısının tasarımı ve geliştirilmesi. Düzce, hibrit.",
      },
      {
        period: "May 2025 — Günümüz",
        role: "Proje ve Ar-Ge Departmanı Başkanı",
        org: "Düzce Üni. Kalite Topluluğu",
        detail: "Teknik projelerin yönetimi, araştırma süreçlerinin yürütülmesi ve ekip koordinasyonu.",
      },
      {
        period: "Şub 2025 — May 2025",
        role: "Proje ve Ar-Ge Departmanı Üyesi",
        org: "Düzce Üni. Kalite Topluluğu",
        detail: "Araştırma projelerine katkı ve geliştirme süreçlerinde aktif rol.",
      },
      {
        period: "2023 — 2028",
        role: "Bilgisayar Mühendisliği",
        org: "Düzce Üniversitesi",
        detail: "Lisans.",
      },
      {
        period: "2022 — Günümüz",
        role: "Freelance Geliştirici",
        org: "Bağımsız",
        detail:
          "Python ve Selenium ile otomasyon ve veri kazıma; çeşitli web teknolojileriyle kurumsal projeler.",
      },
    ],
    skills: [
      {
        title: "Diller",
        items: ["Python", "TypeScript", "JavaScript", "C++", "C#", "SQL"],
      },
      {
        title: "Uzmanlık",
        items: [
          "Backend geliştirme",
          "Otomasyon",
          "Web scraping",
          "Görüntü işleme",
          "Tersine mühendislik",
          "Full stack",
        ],
      },
      {
        title: "Araçlar",
        items: ["FastAPI", "React", "PostgreSQL", "Docker", "Selenium", "OpenCV", "Git"],
      },
      {
        title: "Konuştuğum diller",
        items: ["Türkçe — anadil", "İngilizce — teknik"],
      },
    ],
  },
  contact: {
    heading: "İletişim",
    lede: "Yeni projelere açığım. En hızlı yol e-posta.",
    emailLabel: "E-posta",
    email: "sedatoneer@gmail.com",
    channels: [
      { label: "GitHub", value: "github.com/sedatoneer", href: "https://github.com/sedatoneer" },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/sedatoneer",
        href: "https://linkedin.com/in/sedatoneer",
      },
    ],
    locationLabel: "Konum",
    location: "İstanbul, Türkiye",
  },
};
