import React from "react";
import Link from "next/link";
import { Terminal, ArrowLeft, Home, FolderGit2, Search, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";
import { MOCK_PROJECTS } from "@/data/mockProjects";

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-zinc-950 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
        <div className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-6 text-xs font-mono text-zinc-400">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            </div>
            <span>bash — error: 404_PROJECT_NOT_FOUND</span>
          </div>

          <div className="font-mono space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="inline-flex items-center justify-center p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 shrink-0">
                <Terminal className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  Project Tidak Ditemukan
                </h1>
                <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">
                  fatal: project slug query does not match any registered repository.
                </p>
              </div>
            </div>

            {/* Terminal Code Box */}
            <div className="p-4 rounded-xl bg-zinc-950 text-zinc-300 font-mono text-xs border border-zinc-800 space-y-1">
              <p className="text-emerald-400">
                $ find /portfolio/projects -name &quot;$(basename $REQUEST_URI)&quot;
              </p>
              <p className="text-rose-400">
                find: &apos;requested-project&apos;: No such project file or slug in index
              </p>
              <p className="text-zinc-500">
                # Kemungkinan URL salah ketik, project telah diarsipkan, atau sedang dalam mode draft.
              </p>
            </div>

            {/* Action Back Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <BackButton
                fallbackHref="/#projects"
                label="Kembali ke Sebelumnya"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-mono font-bold border border-zinc-200 dark:border-zinc-700 transition-colors"
              />

              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 text-xs font-mono font-bold transition-all shadow-md shadow-emerald-500/20"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                Kembali ke Galeri Project
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-mono transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                <Home className="w-3.5 h-3.5" />
                Halaman Utama
              </Link>
            </div>

            {/* Suggested Projects Section */}
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-500" />
                Rekomendasi Project Lain yang Tersedia:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOCK_PROJECTS.slice(0, 4).map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/project/${proj.slug}`}
                    className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 bg-zinc-50/50 dark:bg-zinc-950/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {proj.title}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {proj.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {proj.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
