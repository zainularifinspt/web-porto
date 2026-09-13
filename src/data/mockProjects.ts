import { Project } from "@/types/project";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "DevPulse Cloud Metrics",
    slug: "devpulse-cloud-metrics",
    summary: "Platform pemantauan kinerja server real-time dengan visualisasi metrik latensi, CPU, dan utilisasi memori berbasis WebSocket.",
    story: "DevPulse dibangun untuk memecahkan masalah pemantauan mikroservis yang terfragmentasi. Memadukan dashboard interaktif, sistem alerting instan berbasis webhooks, dan visualisasi throughput tinggi hingga 50.000 req/sec.",
    role: "Lead Full-Stack Engineer",
    demoUrl: "https://devpulse-demo.dev",
    repoUrl: "https://github.com/developer/devpulse-cloud",
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    sortOrder: 1,
    createdAt: "2026-01-15T10:00:00Z",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Go", "PostgreSQL", "Docker"],
    stats: {
      stars: 320,
      status: "Live",
      views: "12.4k"
    },
    images: [
      {
        id: "img-1-1",
        projectId: "proj-1",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        caption: "Tampilan Dashboard Utama Metrik Server",
        sortOrder: 1
      },
      {
        id: "img-1-2",
        projectId: "proj-1",
        imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
        caption: "Konfigurasi Rule Alerting dan Webhook",
        sortOrder: 2
      }
    ]
  },
  {
    id: "proj-2",
    title: "CodeScribe AI Reviewer",
    slug: "codescribe-ai-reviewer",
    summary: "Asisten code review otomatis berbasis LLM yang mendeteksi kerentanan keamanan, optimasi performa, dan smell code langsung di pull request.",
    story: "Dibuat untuk mempercepat alur review tim engineering. CodeScribe mengintegrasikan GitHub App API dengan pipeline analisis statis dan model AI untuk memberikan saran kontekstual dalam hitungan detik.",
    role: "Full-Stack & AI Engineer",
    demoUrl: "https://codescribe-ai.dev",
    repoUrl: "https://github.com/developer/codescribe-reviewer",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    sortOrder: 2,
    createdAt: "2026-02-01T08:30:00Z",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "OpenAI"],
    stats: {
      stars: 540,
      status: "Open Source",
      views: "24.8k"
    },
    images: [
      {
        id: "img-2-1",
        projectId: "proj-2",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        caption: "Inline Code Review & Security Analysis",
        sortOrder: 1
      }
    ]
  },
  {
    id: "proj-3",
    title: "Nexus Collaborative Canvas",
    slug: "nexus-collaborative-canvas",
    summary: "Aplikasi papan gambar dan arsitektur sistem multiplayer secara real-time dengan sinkronisasi CRDT tanpa konflik.",
    story: "Dirancang untuk remote-first software teams agar dapat melakukan sprint planning dan diagramming sistem bersama-sama. Mendukung ekspor format SVG, Mermaid.js, dan enkripsi end-to-end pada workspace.",
    role: "Frontend Architect",
    demoUrl: "https://nexus-canvas.dev",
    repoUrl: "https://github.com/developer/nexus-canvas",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    sortOrder: 3,
    createdAt: "2025-11-20T14:10:00Z",
    technologies: ["React", "TypeScript", "Canvas API", "WebSockets", "Zustand", "Node.js"],
    stats: {
      stars: 180,
      status: "Beta",
      views: "8.2k"
    },
    images: [
      {
        id: "img-3-1",
        projectId: "proj-3",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        caption: "Multi-user Canvas Workspace Collaboration",
        sortOrder: 1
      }
    ]
  },
  {
    id: "proj-4",
    title: "OmniCart Headless Storefront",
    slug: "omnicart-headless-storefront",
    summary: "E-Commerce storefront berkecepatan tinggi dengan integrasi Stripe, optimasi Web Vitals 100/100, dan pencarian instan Algolia.",
    story: "Platform e-commerce modern dengan arsitektur headless yang dirancang untuk performa ekstrem dan konversi tinggi. Menghadirkan checkout tanpa hambatan, optimasi cache edge di Vercel, dan manajemen state cart yang fleksibel.",
    role: "Frontend Developer",
    demoUrl: "https://omnicart-store.dev",
    repoUrl: "https://github.com/developer/omnicart-headless",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    sortOrder: 4,
    createdAt: "2025-09-10T12:00:00Z",
    technologies: ["Next.js", "Tailwind CSS", "GraphQL", "Stripe API", "Redis"],
    stats: {
      stars: 95,
      status: "Live",
      views: "5.1k"
    }
  },
  {
    id: "proj-5",
    title: "Terminal CLI Suite & Dotfiles",
    slug: "terminal-cli-suite",
    summary: "Kumpulan tool baris perintah (CLI) untuk otomatisasi alur kerja Git, scaffolding microservices, dan manajemen konfigurasi server.",
    story: "Dibuat untuk mempercepat alur setup harian developer. Dilengkapi generator proyek interaktif, auto-commit formatter berbasis semantic conventional commits, dan integrasi linting pre-commit otomatis.",
    role: "Open Source Contributor",
    demoUrl: "https://cli-suite.dev",
    repoUrl: "https://github.com/developer/cli-developer-suite",
    thumbnailUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    sortOrder: 5,
    createdAt: "2025-08-04T09:00:00Z",
    technologies: ["Rust", "Shell / Bash", "TypeScript", "Clap", "Node.js"],
    stats: {
      stars: 410,
      status: "Open Source",
      views: "18.3k"
    }
  },
  {
    id: "proj-6",
    title: "DocuFlow Markdown Engine",
    slug: "docuflow-markdown-engine",
    summary: "Static site documentation generator dengan dukungan Mermaid diagrams, live search interaktif, dan dark mode otomatis.",
    story: "Alternatif modern untuk dokumentasi teknis API. Mengubah file Markdown dan MDX menjadi situs dokumentasi elegan dengan indeks pencarian fuzzy offline dan rendering komponen React interaktif.",
    role: "Full-Stack Developer",
    demoUrl: "https://docuflow-engine.dev",
    repoUrl: "https://github.com/developer/docuflow-docs",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    sortOrder: 6,
    createdAt: "2025-06-18T16:20:00Z",
    technologies: ["Next.js", "MDX", "Tailwind CSS", "TypeScript", "FlexSearch"],
    stats: {
      stars: 215,
      status: "Live",
      views: "9.7k"
    }
  }
];
