import React from "react";
import Navbar from "@/components/Navbar";
import HeroTerminal from "@/components/HeroTerminal";
import ProjectGallery from "@/components/ProjectGallery";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import { Terminal, Mail, Cpu, Sparkles, Globe, Code } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-zinc-950">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Terminal Hero Section */}
        <HeroTerminal />

        {/* Galeri Project (Main Feature) */}
        <ProjectGallery initialProjects={MOCK_PROJECTS} />

        {/* Tentang Saya (Stub Section for Next Phases) */}
        <section id="about" className="py-12 border-t border-zinc-900">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold font-mono text-zinc-100">
                Tentang Saya
              </h2>
            </div>
            <p className="text-sm text-zinc-400 font-mono leading-relaxed max-w-3xl mb-6">
              Pengembang web yang berdedikasi membangun aplikasi modern dengan arsitektur bersih, performa tinggi, dan pengalaman pengguna yang luar biasa. Berpengalaman di ekosistem TypeScript, Next.js, dan cloud backend.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-emerald-400">
                ⚡ Full-Stack Developer
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                🚀 Problem Solver
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                🛠️ Open Source Enthusiast
              </span>
            </div>
          </div>
        </section>

        {/* Kontak & Media Sosial (Stub Section) */}
        <section id="contact" className="py-12 border-t border-zinc-900">
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900/80 via-zinc-950 to-emerald-950/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold font-mono text-zinc-100 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Mari Bangun Sesuatu yang Hebat Bersama
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Punya ide proyek, tawaran kolaborasi, atau sekadar ingin berdiskusi teknologi? Hubungi saya.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="mailto:contact@developer.dev"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
              >
                <Mail className="w-4 h-4" />
                Kirim Pesan
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-emerald-400 border border-zinc-800 transition-colors"
                aria-label="GitHub Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-emerald-400 border border-zinc-800 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Terminal-Inspired Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 py-8 text-center text-xs font-mono text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>~/portfolio (main) — Dibuat dengan cinta &amp; kopi</span>
          </div>
          <div className="text-zinc-400 flex items-center gap-1">
            <span>Powered by Next.js &amp; Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
