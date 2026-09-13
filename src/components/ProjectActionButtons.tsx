"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Code2,
  Copy,
  Check,
  Terminal,
  Lock,
  Sparkles,
  GitFork,
  ChevronDown
} from "lucide-react";

interface ProjectActionButtonsProps {
  demoUrl?: string;
  repoUrl?: string;
  title: string;
  status?: string;
  stars?: number;
}

export default function ProjectActionButtons({
  demoUrl,
  repoUrl,
  title,
  status = "Live",
  stars
}: ProjectActionButtonsProps) {
  const [copiedClone, setCopiedClone] = useState(false);
  const [copiedDemo, setCopiedDemo] = useState(false);
  const [showCloneDropdown, setShowCloneDropdown] = useState(false);

  const cloneCommand = repoUrl ? `git clone ${repoUrl}.git` : "";

  const handleCopyClone = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!cloneCommand) return;
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const handleCopyDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!demoUrl) return;
    navigator.clipboard.writeText(demoUrl);
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2000);
  };

  return (
    <div className="space-y-3 pt-2">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Tombol Demo Utama */}
        {demoUrl ? (
          <div className="relative inline-flex w-full sm:w-auto rounded-xl shadow-lg shadow-emerald-500/10 group">
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center sm:justify-start gap-2.5 px-5 py-2.5 rounded-l-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-mono font-bold text-xs transition-all tracking-tight"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white dark:bg-zinc-950 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white dark:bg-zinc-950"></span>
              </span>
              <span>Buka Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={handleCopyDemo}
              title="Salin link live demo"
              className="px-3 rounded-r-xl bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white dark:text-zinc-950 border-l border-emerald-500/40 transition-colors flex items-center justify-center shrink-0"
            >
              {copiedDemo ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100" />
              )}
            </button>
          </div>
        ) : (
          <button
            disabled
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 font-mono text-xs cursor-not-allowed border border-zinc-200 dark:border-zinc-700 w-full sm:w-auto"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Demo Lingkungan Internal</span>
          </button>
        )}

        {/* Tombol Source Code Repository */}
        {repoUrl ? (
          <div className="relative inline-flex w-full sm:w-auto rounded-xl shadow-xs">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 rounded-l-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-semibold border border-r-0 border-zinc-300 dark:border-zinc-700 transition-colors"
            >
              <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate">Lihat Repository Kode</span>
              {stars && (
                <span className="px-1.5 py-0.5 text-[10px] rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 shrink-0">
                  ★ {stars}
                </span>
              )}
            </a>
            <button
              onClick={() => setShowCloneDropdown(!showCloneDropdown)}
              title="Buka opsi git clone"
              className="px-2.5 rounded-r-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 transition-colors flex items-center justify-center shrink-0"
            >
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showCloneDropdown ? "rotate-180" : ""}`} />
            </button>
          </div>
        ) : (
          <span className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 font-mono text-xs border border-zinc-200 dark:border-zinc-700/60 w-full sm:w-auto">
            <Lock className="w-3.5 h-3.5" />
            <span>Kode Sumber Privat</span>
          </span>
        )}
      </div>

      {/* Dropdown Clone Command Bar */}
      {showCloneDropdown && repoUrl && (
        <div className="p-3.5 rounded-xl bg-zinc-900 text-zinc-100 border border-zinc-700 shadow-xl max-w-lg font-mono text-xs animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Clone repository ke lokal mesin Anda:</span>
            </div>
            <span className="text-[10px] text-zinc-500">SSH / HTTPS</span>
          </div>
          <div className="flex items-center justify-between gap-2 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
            <code className="text-[11px] text-emerald-400 select-all truncate">
              {cloneCommand}
            </code>
            <button
              onClick={handleCopyClone}
              className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] transition-colors"
            >
              {copiedClone ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
