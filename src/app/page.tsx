import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroTerminal from "@/components/HeroTerminal";
import ProjectGallery from "@/components/ProjectGallery";
import CollaborationCTA from "@/components/CollaborationCTA";
import ScrollReveal from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { getProjects, getAboutContent } from "@/db";
import {
  Terminal,
  Cpu,
  Sparkles,
  ArrowRight,
  GitBranch,
  ShieldCheck,
  Zap,
  Code2,
  CheckCircle2,
  ExternalLink,
  Layers,
  FileCode2,
  FolderGit2,
  UserCheck,
  MailQuestion
} from "lucide-react";

export const metadata: Metadata = {
  title: "Portofolio Dev Kece | Full-Stack Web Developer",
  description:
    "Portofolio developer profesional dengan galeri project interaktif, arsitektur modern, dan sentuhan visual terminal.",
};

export default async function Home() {
  const [projects, about] = await Promise.all([
    getProjects(),
    getAboutContent(),
  ]);

  const featuredProjects = projects.filter((p) => p.isFeatured);
  const totalStars = projects.reduce((acc, p) => acc + (p.stats?.stars || 0), 0);
  const totalTech = new Set(projects.flatMap((p) => p.technologies)).size;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-zinc-950 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Developer System Status Ribbon */}
        <ScrollReveal animation="fade-down" delay={50}>
          <section className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-xs text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                STATUS: AVAILABLE
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                <GitBranch className="w-3.5 h-3.5 text-emerald-500" />
                <span>branch: main (clean)</span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400 text-[11px]">
              <span className="hidden md:inline-flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" />
                <span>Latency: &lt; 35ms</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Type-Safe: 100%</span>
              </span>
            </div>
          </section>
        </ScrollReveal>

        {/* Terminal Hero Section */}
        <ScrollReveal animation="fade-up" delay={100}>
          <HeroTerminal />
        </ScrollReveal>

        {/* Developer Metrics & Telemetry Bar */}
        <ScrollReveal animation="fade-up" delay={150}>
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md shadow-sm font-mono space-y-1 hover:border-emerald-500/40 transition-colors">
              <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                <span>PROJECTS</span>
                <Layers className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                {projects.length}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                {featuredProjects.length} di antaranya unggulan
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md shadow-sm font-mono space-y-1 hover:border-emerald-500/40 transition-colors">
              <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                <span>EXPERIENCE</span>
                <Cpu className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                {about.stats?.yearsOfExperience || 5}+ thn
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                Full-Stack &amp; Arsitektur Web
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md shadow-sm font-mono space-y-1 hover:border-emerald-500/40 transition-colors">
              <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                <span>TECH STACK</span>
                <Code2 className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                {totalTech}+
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                Framework &amp; Cloud Tools
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 backdrop-blur-md shadow-sm font-mono space-y-1 hover:border-emerald-500/40 transition-colors">
              <div className="text-[11px] text-zinc-400 flex items-center justify-between">
                <span>GITHUB STARS</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                {totalStars}★
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                Simulasi metriks open source
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Visual Divider: Galeri Karya */}
        <SectionDivider
          label="Galeri Proyek &amp; Implementasi Nyata"
          icon={<FolderGit2 className="w-3 h-3 text-emerald-500" />}
        />

        {/* Galeri Project (Main Feature) */}
        <ScrollReveal animation="fade-up" delay={150}>
          <section id="projects" className="scroll-mt-24 space-y-6">
            <ProjectGallery initialProjects={projects} />
          </section>
        </ScrollReveal>

        {/* Visual Divider: Filosofi Rekayasa */}
        <SectionDivider
          label="Prinsip Rekayasa Perangkat Lunak"
          icon={<Code2 className="w-3 h-3 text-cyan-500" />}
        />

        {/* Engineering Philosophy & Clean Code Pillars */}
        <ScrollReveal animation="fade-up" delay={150}>
          <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-10 backdrop-blur-md shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    DEVELOPER PHILOSOPHY
                  </span>
                </div>
                <h2 className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 tracking-tight">
                  Prinsip Arsitektur Rekayasa Perangkat Lunak
                </h2>
              </div>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 max-w-md">
                // Mengutamakan kejelasan kode, skalabilitas sistem, dan performa pengguna tanpa kompromi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/50 space-y-3 hover:border-emerald-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100">
                  01. Performance First
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                  Optimasi bundle agresif, server-side rendering, caching berlapis, dan skor Core Web Vitals 95+ untuk pengalaman pengguna instan.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/50 space-y-3 hover:border-cyan-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100">
                  02. Type-Safe End-to-End
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                  TypeScript ketat di seluruh lapisan frontend dan backend API, meminimalkan bug runtime dan mempermudah kolaborasi tim.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/50 space-y-3 hover:border-purple-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <FileCode2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100">
                  03. Clean Modular Architecture
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                  Komponen terisolasi, pemisahan data layer (repository pattern), dan kemudahan migrasi database berbasis SQL yang rapi.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Visual Divider: Profil */}
        <SectionDivider
          label="Tentang Pengembang"
          icon={<UserCheck className="w-3 h-3 text-emerald-500" />}
        />

        {/* Tentang Saya — Quick Snapshot Preview */}
        <ScrollReveal animation="fade-up" delay={150}>
          <section id="about" className="scroll-mt-24 py-2">
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-10 backdrop-blur-md shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-black text-xl text-emerald-600 dark:text-emerald-400">
                    {about.avatarFallback || "MZA"}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100">
                      {about.name}
                    </h3>
                    <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                      {about.headline}
                    </p>
                  </div>
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-mono font-semibold text-xs transition-colors shadow-sm"
                >
                  <span>Lihat Profil &amp; Riwayat Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    // BIOGRAFI SINGKAT
                  </h4>
                  <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {about.bio?.[0] ||
                      "Pengembang web yang berdedikasi membangun aplikasi modern dengan performa tinggi dan pengalaman pengguna yang luar biasa."}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    // KEAHLIAN INTI
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["Next.js", "TypeScript", "Tailwind CSS", "Go", "Node.js", "PostgreSQL", "Docker"].map((sk) => (
                      <span
                        key={sk}
                        className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-700 dark:text-zinc-300"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Visual Divider: Ajakan Kolaborasi */}
        <SectionDivider
          label="Mulai Kolaborasi"
          icon={<MailQuestion className="w-3 h-3 text-amber-500" />}
        />

        {/* Seksi Kontak & Kolaborasi */}
        <ScrollReveal animation="zoom-in" delay={150}>
          <section id="contact" className="scroll-mt-24">
            <CollaborationCTA />
          </section>
        </ScrollReveal>
      </main>

      {/* Floating Scroll To Top Button */}
      <ScrollToTopButton />

      {/* Terminal-Inspired Developer Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-white/90 dark:bg-zinc-950/90 py-8 text-xs font-mono text-zinc-500 dark:text-zinc-400 transition-colors duration-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>~/portfolio (main) — Dibuat dengan clean architecture &amp; passion</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/about" className="hover:text-emerald-500 transition-colors">
              tentang
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <Link href="/contact" className="hover:text-emerald-500 transition-colors">
              kontak
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
