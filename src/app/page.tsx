import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroTerminal from "@/components/HeroTerminal";
import ProjectGallery from "@/components/ProjectGallery";
import CollaborationCTA from "@/components/CollaborationCTA";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import { Terminal, Mail, Cpu, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-zinc-950 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Terminal Hero Section */}
        <HeroTerminal />

        {/* Galeri Project (Main Feature) */}
        <ProjectGallery initialProjects={MOCK_PROJECTS} />

        {/* Tentang Saya (Stub Section for Next Phases) */}
        <section id="about" className="py-12 border-t border-zinc-200 dark:border-zinc-900">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 shadow-sm dark:shadow-none backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                Tentang Saya
              </h2>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-mono leading-relaxed max-w-3xl mb-6">
              Pengembang web yang berdedikasi membangun aplikasi modern dengan arsitektur bersih, performa tinggi, dan pengalaman pengguna yang luar biasa. Berpengalaman di ekosistem TypeScript, Next.js, dan cloud backend.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-emerald-600 dark:text-emerald-400 font-medium">
                  ⚡ Full-Stack Developer
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
                  🚀 Problem Solver
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
                  🛠️ Open Source Enthusiast
                </span>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-mono font-bold text-xs transition-all shadow-sm"
              >
                <span>Lihat Profil Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Kontak & Media Sosial — Ajakan Kerja Sama */}
        <div id="contact" className="pt-6">
          <CollaborationCTA />
        </div>
      </main>

      {/* Terminal-Inspired Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 py-8 text-center text-xs font-mono text-zinc-500 dark:text-zinc-400 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
            <span>~/portfolio (main) — Dibuat dengan dedikasi &amp; kopi</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Powered by Next.js &amp; Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
