"use client";

import React from "react";
import Link from "next/link";
import { Terminal, ArrowDown, Sparkles, FolderGit2, CheckCircle2 } from "lucide-react";

export default function HeroTerminal() {
  return (
    <section className="relative pt-8 pb-12 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[200px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Main Terminal Window */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl backdrop-blur-xl overflow-hidden ring-1 ring-zinc-800/80">
          {/* Window Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/90 bg-zinc-900/70">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-sm"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm"></span>
              <span className="ml-3 text-xs font-mono text-zinc-400">
                dev@workstation:~ (bash)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400/90">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block"></span>
              <span>online</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-8 font-mono text-sm space-y-4">
            {/* Command 1 */}
            <div>
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="text-zinc-200 font-semibold">whoami</span>
              </div>
              <div className="mt-1 pl-4 text-zinc-300">
                <span className="text-emerald-400 font-bold text-lg sm:text-xl">
                  Web Developer & Software Craftsman
                </span>
                <p className="text-xs text-zinc-400 mt-1">
                  Membangun aplikasi web berperforma tinggi, elegan secara visual, dan siap skala produksi.
                </p>
              </div>
            </div>

            {/* Command 2 */}
            <div>
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="text-zinc-200 font-semibold">cat ./specialties.json</span>
              </div>
              <div className="mt-2 pl-4 flex flex-wrap gap-2 text-xs">
                {["Next.js", "TypeScript", "Tailwind CSS", "React", "Node.js", "PostgreSQL", "Docker"].map(
                  (spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700/60 text-emerald-300 font-mono"
                    >
                      &quot;{spec}&quot;
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Command 3 */}
            <div>
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="text-zinc-200 font-semibold">echo $CURRENT_STATUS</span>
              </div>
              <div className="mt-1 pl-4 flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Siap berkolaborasi & mewujudkan solusi web berstandar tinggi.</span>
              </div>
            </div>

            {/* Terminal Actions */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs font-mono transition-all shadow-lg shadow-emerald-500/20"
              >
                <FolderGit2 className="w-4 h-4" />
                Jelajahi Galeri Project
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 text-xs font-mono transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Tentang Saya
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
