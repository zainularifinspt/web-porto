import { AboutProfile } from "@/types/about";

export const MOCK_ABOUT: AboutProfile = {
  name: "M. Zainul Arifin",
  headline: "Full-Stack Software Engineer & Web Architect",
  bio: [
    "Halo! Saya adalah seorang pengembang web yang antusias merancang dan membangun sistem perangkat lunak yang cepat, andal, dan menyenangkan saat digunakan.",
    "Perjalanan saya dimulai dari rasa penasaran mendalam tentang bagaimana protokol web bekerja hingga kini berfokus pada ekosistem Next.js, arsitektur microservices berbasis TypeScript & Go, serta desain antarmuka modern yang berpusat pada kepuasan pengguna.",
    "Bagi saya, menulis kode bukan sekadar membuat instruksi berjalan di mesin, melainkan seni menyederhanakan masalah rumit menjadi solusi elegan yang tahan uji dan mudah dipelihara oleh tim engineering."
  ],
  photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  avatarFallback: "ZA",
  status: "Tersedia untuk Proyek Baru & Kolaborasi",
  location: "Indonesia (WIB / UTC+7)",
  email: "zainul@developer.dev",
  githubUrl: "https://github.com/developer",
  linkedinUrl: "https://linkedin.com/in/developer",
  stats: {
    yearsOfExperience: 4,
    completedProjects: 28,
    codeCommits: "3.4k+",
    clientSatisfaction: "99.4%"
  },
  skills: [
    {
      id: "frontend",
      name: "Frontend Development",
      iconName: "Layout",
      skills: [
        { name: "React", level: "Expert", yearsOfExp: 4, description: "Component architecture, custom hooks, concurrent mode", isKey: true },
        { name: "Next.js", level: "Expert", yearsOfExp: 4, description: "App Router, SSR, SSG, Server Actions, Middleware", isKey: true },
        { name: "TypeScript", level: "Expert", yearsOfExp: 4, description: "Strict typing, generics, schema contract validations", isKey: true },
        { name: "Tailwind CSS", level: "Expert", yearsOfExp: 4, description: "Design systems, responsive layouts, dark mode tokenization", isKey: true },
        { name: "Vue.js", level: "Intermediate", yearsOfExp: 2, description: "Composition API, Pinia state management" }
      ]
    },
    {
      id: "backend",
      name: "Backend & Systems",
      iconName: "Server",
      skills: [
        { name: "Node.js", level: "Advanced", yearsOfExp: 4, description: "Asynchronous APIs, event streams, microservices", isKey: true },
        { name: "Go (Golang)", level: "Advanced", yearsOfExp: 3, description: "High-throughput concurrent services, goroutines", isKey: true },
        { name: "PostgreSQL", level: "Advanced", yearsOfExp: 4, description: "Query optimization, indexing, triggers, JSONB", isKey: true },
        { name: "Redis", level: "Advanced", yearsOfExp: 3, description: "Pub/Sub streams, distributed lock, caching layer" },
        { name: "FastAPI / Python", level: "Intermediate", yearsOfExp: 2, description: "Data parsing, REST contracts, AI agent services" }
      ]
    },
    {
      id: "devops",
      name: "DevOps & Tooling",
      iconName: "Cpu",
      skills: [
        { name: "Docker", level: "Advanced", yearsOfExp: 3, description: "Multi-stage builds, compose orchestration, lightweight images", isKey: true },
        { name: "CI/CD & GitHub Actions", level: "Advanced", yearsOfExp: 3, description: "Automated linting, testing, and deployment pipelines" },
        { name: "Linux / Shell", level: "Advanced", yearsOfExp: 4, description: "Bash scripting, systemd, server provisioning" },
        { name: "Cloud & Vercel", level: "Advanced", yearsOfExp: 4, description: "Edge functions, blob storage, cloud serverless" }
      ]
    }
  ],
  experiences: [
    {
      id: "exp-1",
      role: "Senior Full-Stack Engineer",
      company: "TechNova Solutions",
      location: "Jakarta (Remote)",
      period: "2024 — Sekarang",
      isCurrent: true,
      summary: "Memimpin perancangan dan modernisasi arsitektur web aplikasi enterprise dengan fokus pada performa frontend dan skalabilitas backend.",
      contributions: [
        "Memimpin migrasi monolitik legasi ke arsitektur Next.js App Router yang memangkas First Contentful Paint (FCP) hingga 42%.",
        "Merancang microservice ingest data metrik berbasis Go dan PostgreSQL yang memproses 10 juta event harian tanpa downtime.",
        "Mengembangkan reusable UI component library yang digunakan oleh 4 tim engineering independen."
      ],
      technologies: ["Next.js", "TypeScript", "Go", "PostgreSQL", "Tailwind CSS", "Docker"]
    },
    {
      id: "exp-2",
      role: "Full-Stack Web Developer",
      company: "Inovasi Digital Studio",
      location: "Surabaya",
      period: "2022 — 2024",
      isCurrent: false,
      summary: "Membangun lebih dari 15 aplikasi web responsif dan portal SaaS untuk klien dari berbagai industri mulai dari fintech hingga edutech.",
      contributions: [
        "Membangun portal e-commerce headless berkecepatan tinggi dengan integrasi payment gateway dan webhook real-time.",
        "Mengimplementasikan caching berlapis menggunakan Redis yang menurunkan beban database sebesar 60% saat flash sale.",
        "Menulis suite unit & integration test komprehensif yang meningkatkan keandalan deployment hingga 99.8%."
      ],
      technologies: ["React", "Node.js", "Express", "PostgreSQL", "Redis", "Tailwind CSS"]
    },
    {
      id: "exp-3",
      role: "Frontend Developer",
      company: "Creative Byte Labs",
      location: "Malang",
      period: "2021 — 2022",
      isCurrent: false,
      summary: "Fokus pada pembuatan antarmuka web interaktif, slicing desain UI/UX dengan standar aksesibilitas tinggi, dan integrasi RESTful API.",
      contributions: [
        "Mentransformasikan wireframe Figma menjadi halaman web responsif dengan pixel-perfect precision.",
        "Mengoptimalkan performa aset grafis dan font hingga meraih skor Google Lighthouse 95+ di semua halaman kunci.",
        "Bekerja sama erat dengan tim desainer untuk menyusun panduan tokenisasi warna dan typography."
      ],
      technologies: ["JavaScript", "React", "HTML5", "CSS3 / Sass", "Webpack", "Git"]
    }
  ],
  education: [
    {
      degree: "Sarjana Komputer (S.Kom) — Teknik Informatika",
      institution: "Universitas Terkemuka",
      year: "2017 — 2021",
      focus: "Rekayasa Perangkat Lunak, Struktur Data & Algoritma, dan Jaringan Komputer"
    }
  ]
};
