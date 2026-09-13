"use client";

import React, { useState } from "react";
import {
  Layers,
  Code2,
  Server,
  Database,
  Cpu,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  Box,
  Sparkles,
  ChevronRight
} from "lucide-react";

export type TechCategory = "Semua" | "Frontend" | "Backend" | "Database" | "DevOps & Tools" | "AI & Protocol";

interface TechDetails {
  category: Exclude<TechCategory, "Semua">;
  description: string;
  docsUrl: string;
  pkgName?: string;
  version?: string;
}

const TECH_CATALOG: Record<string, TechDetails> = {
  "Next.js": {
    category: "Frontend",
    description: "App Router, Server Components & SEO SSR rendering",
    docsUrl: "https://nextjs.org",
    pkgName: "next",
    version: "^15.1"
  },
  "React": {
    category: "Frontend",
    description: "Library UI berbasis komponen & declarative state",
    docsUrl: "https://react.dev",
    pkgName: "react",
    version: "^19.0"
  },
  "TypeScript": {
    category: "Frontend",
    description: "Type safety statis untuk skalabilitas & kontrak data ketat",
    docsUrl: "https://www.typescriptlang.org",
    pkgName: "typescript",
    version: "^5.6"
  },
  "Tailwind CSS": {
    category: "Frontend",
    description: "Utility-first modern CSS framework untuk layout responsif",
    docsUrl: "https://tailwindcss.com",
    pkgName: "tailwindcss",
    version: "^4.0"
  },
  "Vue.js": {
    category: "Frontend",
    description: "Progressive JavaScript framework dengan Composition API",
    docsUrl: "https://vuejs.org",
    pkgName: "vue",
    version: "^3.5"
  },
  "Go": {
    category: "Backend",
    description: "High-concurrency compiled backend service & goroutines",
    docsUrl: "https://go.dev",
    pkgName: "golang",
    version: "1.23"
  },
  "Python": {
    category: "Backend",
    description: "Ekosistem pemrosesan data & inferensi model ML",
    docsUrl: "https://www.python.org",
    pkgName: "python",
    version: "3.12"
  },
  "FastAPI": {
    category: "Backend",
    description: "Modern asynchronous web framework dengan validasi Pydantic",
    docsUrl: "https://fastapi.tiangolo.com",
    pkgName: "fastapi",
    version: "^0.115"
  },
  "Node.js": {
    category: "Backend",
    description: "Runtime JavaScript asynchronous event-driven I/O",
    docsUrl: "https://nodejs.org",
    pkgName: "node",
    version: "v22"
  },
  "Rust": {
    category: "Backend",
    description: "Memory-safe systems programming language tanpa GC",
    docsUrl: "https://www.rust-lang.org",
    pkgName: "rustc",
    version: "1.82"
  },
  "PostgreSQL": {
    category: "Database",
    description: "Relational database ACID-compliant dengan dukungan JSONB & indexing canggih",
    docsUrl: "https://www.postgresql.org",
    pkgName: "pg",
    version: "16.4"
  },
  "SQLite": {
    category: "Database",
    description: "Serverless zero-configuration embedded SQL database engine",
    docsUrl: "https://sqlite.org",
    pkgName: "better-sqlite3",
    version: "3.45"
  },
  "Redis": {
    category: "Database",
    description: "In-memory data store untuk caching super cepat & pub/sub streaming",
    docsUrl: "https://redis.io",
    pkgName: "ioredis",
    version: "7.2"
  },
  "Supabase": {
    category: "Database",
    description: "Open-source Firebase alternative dengan Postgres auth & realtime CDC",
    docsUrl: "https://supabase.com",
    pkgName: "@supabase/supabase-js",
    version: "^2.45"
  },
  "Docker": {
    category: "DevOps & Tools",
    description: "Containerization terisolasi untuk konsistensi dev hingga prod",
    docsUrl: "https://www.docker.com",
    pkgName: "docker",
    version: "27.0"
  },
  "Prometheus": {
    category: "DevOps & Tools",
    description: "Time-series monitoring & scraping metrik sistem berkala",
    docsUrl: "https://prometheus.io",
    pkgName: "prom-client",
    version: "2.53"
  },
  "Grafana": {
    category: "DevOps & Tools",
    description: "Visualisasi analitik metrik dashboard dengan alert query",
    docsUrl: "https://grafana.com",
    pkgName: "grafana",
    version: "11.1"
  },
  "Tauri": {
    category: "DevOps & Tools",
    description: "Lightweight cross-platform desktop wrapper dengan Rust backend",
    docsUrl: "https://tauri.app",
    pkgName: "@tauri-apps/api",
    version: "^2.0"
  },
  "OpenAI": {
    category: "AI & Protocol",
    description: "API integrasi GPT-4o untuk pemrosesan teks kontekstual & parsing code",
    docsUrl: "https://platform.openai.com",
    pkgName: "openai",
    version: "^4.70"
  },
  "OAuth 2.0": {
    category: "AI & Protocol",
    description: "Standar otorisasi terdesentralisasi dengan PKCE & JWT session tokens",
    docsUrl: "https://oauth.net/2/",
    pkgName: "oauth",
    version: "RFC-6749"
  },
  "gRPC": {
    category: "AI & Protocol",
    description: "High-performance RPC framework berbasis HTTP/2 & Protocol Buffers",
    docsUrl: "https://grpc.io",
    pkgName: "@grpc/grpc-js",
    version: "^1.11"
  }
};

function getCategoryIcon(cat: TechCategory) {
  switch (cat) {
    case "Frontend":
      return <Code2 className="w-3.5 h-3.5 text-cyan-500" />;
    case "Backend":
      return <Server className="w-3.5 h-3.5 text-emerald-500" />;
    case "Database":
      return <Database className="w-3.5 h-3.5 text-amber-500" />;
    case "DevOps & Tools":
      return <Cpu className="w-3.5 h-3.5 text-indigo-500" />;
    case "AI & Protocol":
      return <Sparkles className="w-3.5 h-3.5 text-fuchsia-500" />;
    default:
      return <Box className="w-3.5 h-3.5 text-zinc-400" />;
  }
}

interface ProjectTechBadgesProps {
  technologies: string[];
  projectTitle: string;
}

export default function ProjectTechBadges({
  technologies,
  projectTitle
}: ProjectTechBadgesProps) {
  const [selectedCategory, setSelectedCategory] = useState<TechCategory>("Semua");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [copiedPkg, setCopiedPkg] = useState<string | null>(null);

  // Available categories based on present technologies
  const presentCategories = Array.from(
    new Set(
      technologies.map(
        (t) => TECH_CATALOG[t]?.category || ("Frontend" as const)
      )
    )
  );

  const categoriesList: TechCategory[] = ["Semua", ...presentCategories];

  const filteredTechnologies = technologies.filter((t) => {
    if (selectedCategory === "Semua") return true;
    const cat = TECH_CATALOG[t]?.category || "Frontend";
    return cat === selectedCategory;
  });

  const activeTechInfo = selectedTech ? TECH_CATALOG[selectedTech] : null;

  const handleCopyInstall = (pkgName: string) => {
    navigator.clipboard.writeText(`npm install ${pkgName}`);
    setCopiedPkg(pkgName);
    setTimeout(() => setCopiedPkg(null), 2000);
  };

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 shadow-sm dark:shadow-xl backdrop-blur-xl transition-all">
      {/* Header with Developer Style */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              Tech Stack & Dependencies
            </h3>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              {technologies.length} modul aktif di {projectTitle}
            </span>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
          <Terminal className="w-3 h-3 text-emerald-500" />
          package.json
        </span>
      </div>

      {/* Category Tabs Filter */}
      {categoriesList.length > 2 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          {categoriesList.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedTech(null);
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all ${
                  isActive
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700/60 border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                {cat !== "Semua" && getCategoryIcon(cat)}
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid of Badges / Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filteredTechnologies.map((tech) => {
          const detail = TECH_CATALOG[tech];
          const isSelected = selectedTech === tech;
          const category = detail?.category || "Frontend";

          return (
            <button
              key={tech}
              onClick={() => setSelectedTech(isSelected ? null : tech)}
              className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs transition-all text-left border ${
                isSelected
                  ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20 shadow-md scale-[1.02]"
                  : "bg-zinc-50 dark:bg-zinc-950/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 shadow-xs"
              }`}
            >
              <span className="shrink-0">{getCategoryIcon(category)}</span>
              <span className="font-semibold tracking-tight">{tech}</span>

              {detail?.version && (
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-normal">
                  {detail.version}
                </span>
              )}

              <span
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  isSelected ? "bg-emerald-500 animate-pulse" : "bg-zinc-300 dark:bg-zinc-700 group-hover:bg-emerald-400"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Detail Inspector Card (When clicked) */}
      {selectedTech && activeTechInfo && (
        <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/90 border border-emerald-500/30 dark:border-emerald-500/30 text-xs font-mono animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {getCategoryIcon(activeTechInfo.category)}
              </span>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                  {selectedTech}
                </h4>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                  {activeTechInfo.category} {activeTechInfo.version ? `• ${activeTechInfo.version}` : ""}
                </span>
              </div>
            </div>

            <a
              href={activeTechInfo.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 hover:underline"
            >
              Dokumentasi <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
            {activeTechInfo.description}
          </p>

          {activeTechInfo.pkgName && (
            <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px]">
              <span className="text-zinc-500 dark:text-zinc-400 select-all truncate">
                $ npm install {activeTechInfo.pkgName}
              </span>
              <button
                onClick={() => handleCopyInstall(activeTechInfo.pkgName!)}
                className="shrink-0 inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                title="Salin perintah install"
              >
                {copiedPkg === activeTechInfo.pkgName ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Helper Footer Hint */}
      {!selectedTech && (
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
          <ChevronRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          <span>Klik salah satu badge untuk melihat detail peran dan referensi dokumentasi.</span>
        </div>
      )}
    </div>
  );
}
