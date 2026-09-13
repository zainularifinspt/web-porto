import React from "react";
import { Terminal, UserCheck, CheckCircle2, Flame, Award, BookOpen, GitCommit } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectStoryAndRoleProps {
  project: Project;
}

export default function ProjectStoryAndRole({ project }: ProjectStoryAndRoleProps) {
  return (
    <div className="space-y-6">
      {/* Cerita Lengkap Proyek (The Story) */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-sm">
        {/* Terminal Tab Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/80 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            <span className="ml-2 font-semibold text-zinc-800 dark:text-zinc-200">
              STORY.md
            </span>
          </div>
          <span className="text-[11px] text-zinc-400">markdown preview</span>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Cerita di Balik Pembuatan
          </h2>

          <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
            {project.story}
          </p>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap gap-4 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <GitCommit className="w-3.5 h-3.5 text-emerald-500" />
              Status: Rilis Produksi
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Kualitas: 100% Clean Code &amp; Typed
            </span>
          </div>
        </div>
      </section>

      {/* Peran & Kontribusi Saya (My Role) */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Peran &amp; Tanggung Jawab Saya
            </h3>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1">
              Bagian dan kontribusi teknis yang saya kerjakan secara langsung
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-bold shadow-sm">
            {project.role}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Arsitektur &amp; Fondasi Sistem</span>
            </div>
            <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Merancang arsitektur aplikasi, pemilihan teknologi yang sesuai, dan struktur folder modular yang memudahkan pemeliharaan berkelanjutan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Implementasi UI &amp; State Management</span>
            </div>
            <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Membangun komponen UI responsif dengan Tailwind CSS, memastikan aksesibilitas, dan mengelola state aplikasi secara efisien.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Integrasi API &amp; Backend</span>
            </div>
            <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Menghubungkan frontend ke database dan layanan backend dengan validasi tipe data yang aman (end-to-end type safety).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Optimasi Performa &amp; Deploy</span>
            </div>
            <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Mengoptimalkan skor Core Web Vitals (LCP, CLS, INP) dan mengonfigurasi pipeline deployment otomatis di platform cloud.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
