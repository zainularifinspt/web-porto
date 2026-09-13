import React from "react";
import Link from "next/link";
import { Terminal, ArrowLeft, Home } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-zinc-950 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 flex flex-col items-center justify-center text-center py-16">
        <div className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-xl">
          {/* Terminal Window Top Bar */}
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-6 text-xs font-mono text-zinc-400">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            </div>
            <span>bash — error: 404</span>
          </div>

          <div className="py-6 font-mono space-y-4">
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 mb-2">
              <Terminal className="w-8 h-8" />
            </div>

            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              404: Route Not Found
            </h1>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              <code>cat: /requested/page: No such file or directory.</code>
              <br />
              Halaman yang Anda tuju tidak ditemukan atau telah dipindahkan.
            </p>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 text-xs font-mono font-bold transition-all shadow-md"
              >
                <Home className="w-3.5 h-3.5" />
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
