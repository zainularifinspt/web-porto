"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Terminal,
  ArrowDown,
  Sparkles,
  FolderGit2,
  CheckCircle2,
  CornerDownLeft,
  Copy,
  Check,
  RotateCcw,
  GitBranch,
  Cpu,
  Code2,
  ExternalLink,
  ShieldCheck,
  Maximize2,
  Minimize2
} from "lucide-react";

interface CommandHistory {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

const INITIAL_COMMANDS: CommandHistory[] = [
  {
    command: "whoami",
    output: (
      <div className="space-y-1.5 text-zinc-300">
        <div className="flex items-center gap-2">
          <span className="font-bold text-emerald-400 text-base sm:text-lg">
            M. Zainul Arifin
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-mono">
            Full-Stack Web Craftsman
          </span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Membangun arsitektur web modern, performa tinggi, clean code, serta pengalaman UI/UX yang memikat dan teruji di level produksi.
        </p>
      </div>
    ),
    timestamp: "12:00:01",
  },
  {
    command: "cat ./specialties.json",
    output: (
      <div className="flex flex-wrap gap-2 text-xs pt-1">
        {[
          "Next.js 16",
          "TypeScript",
          "React 19",
          "Tailwind CSS",
          "Node.js",
          "PostgreSQL",
          "Docker",
          "REST & tRPC",
          "Clean Architecture",
        ].map((spec) => (
          <span
            key={spec}
            className="px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-700/60 text-emerald-300 font-mono hover:border-emerald-500/50 transition-colors"
          >
            &quot;{spec}&quot;
          </span>
        ))}
      </div>
    ),
    timestamp: "12:00:02",
  },
  {
    command: "systemctl status developer.service",
    output: (
      <div className="text-xs space-y-1 text-zinc-300">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Active: active (running) since 2026</span>
        </div>
        <div className="text-zinc-400 pl-5 space-y-0.5">
          <p>• Status: Siap berkolaborasi untuk proyek inovatif & freelance/full-time.</p>
          <p>• Memory: 100% focused | Load average: ready to ship high-impact features.</p>
        </div>
      </div>
    ),
    timestamp: "12:00:03",
  },
];

export default function HeroTerminal() {
  const [history, setHistory] = useState<CommandHistory[]>(INITIAL_COMMANDS);
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"terminal" | "sysinfo">("terminal");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const availableCommands = [
    { cmd: "whoami", desc: "Ringkasan profil developer" },
    { cmd: "cat skills.json", desc: "Daftar teknologi dan keahlian utama" },
    { cmd: "git status", desc: "Cek cabang aktif & status pipeline" },
    { cmd: "projects", desc: "Tampilkan highlight portofolio proyek" },
    { cmd: "sudo hire", desc: "Koneksi langsung & kontak kolaborasi" },
    { cmd: "sysinfo", desc: "Tampilkan telemetry lingkungan sistem" },
    { cmd: "clear", desc: "Bersihkan output konsol terminal" },
  ];

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommandExecution = (cmdString: string) => {
    const trimmed = cmdString.trim().toLowerCase();
    if (!trimmed) return;

    const now = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    if (trimmed === "clear" || trimmed === "cls") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let outputNode: React.ReactNode = null;

    if (trimmed === "whoami") {
      outputNode = (
        <div className="space-y-1 text-zinc-300">
          <p className="font-bold text-emerald-400">M. Zainul Arifin</p>
          <p className="text-xs text-zinc-400">
            Professional Web Developer & Modern Full-Stack Engineer.
          </p>
        </div>
      );
    } else if (trimmed === "cat skills.json" || trimmed === "skills") {
      outputNode = (
        <div className="flex flex-wrap gap-2 text-xs pt-1">
          {[
            "TypeScript",
            "Next.js",
            "React",
            "Node.js",
            "Tailwind CSS",
            "PostgreSQL",
            "Prisma / Drizzle",
            "Docker",
            "Git CI/CD",
          ].map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700/70 text-cyan-300 font-mono"
            >
              {s}
            </span>
          ))}
        </div>
      );
    } else if (trimmed === "git status" || trimmed === "git log") {
      outputNode = (
        <div className="text-xs font-mono text-zinc-300 space-y-1">
          <p className="text-emerald-400">On branch main</p>
          <p className="text-zinc-400">Your branch is up to date with &apos;origin/main&apos;.</p>
          <div className="mt-2 text-zinc-400 border-l-2 border-emerald-500/50 pl-2 space-y-0.5">
            <p>
              <span className="text-amber-400">commit 37e92d3</span> (HEAD -&gt; main)
            </p>
            <p className="text-zinc-300">feat(developer-touch): responsive terminal &amp; telemetry</p>
            <p className="text-zinc-500">Author: Zainul Arifin &lt;dev@zainularifin.com&gt;</p>
          </div>
        </div>
      );
    } else if (trimmed === "projects" || trimmed === "ls ./projects") {
      outputNode = (
        <div className="text-xs font-mono space-y-2 text-zinc-300">
          <p className="text-zinc-400">Proyek Unggulan Terverifikasi:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800">
              <span className="text-emerald-400 font-bold block">1. LMS Platform Edukasi</span>
              <span className="text-[11px] text-zinc-400">Next.js, TypeScript, PostgreSQL</span>
            </div>
            <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800">
              <span className="text-emerald-400 font-bold block">2. E-Commerce Multi-Vendor</span>
              <span className="text-[11px] text-zinc-400">React, Tailwind, Node.js REST API</span>
            </div>
          </div>
          <Link
            href="#projects"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline pt-1"
          >
            <span>Buka semua proyek di galeri</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      );
    } else if (trimmed.includes("hire") || trimmed === "sudo hire") {
      outputNode = (
        <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/80 text-xs space-y-2 text-emerald-200">
          <div className="flex items-center gap-2 font-bold text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Akses Diberikan: mari bangun hal luar biasa bersama!</span>
          </div>
          <p className="text-zinc-300">
            Saya terbuka untuk proyek pengembangan website baru, optimasi aplikasi, maupun kerja sama jangka panjang.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors"
          >
            Kirim Pesan Kolaborasi Sekarang
            <ArrowDown className="w-3 h-3" />
          </a>
        </div>
      );
    } else if (trimmed === "sysinfo" || trimmed === "neofetch") {
      outputNode = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-zinc-300">
          <div className="p-2.5 rounded bg-zinc-900/80 border border-zinc-800 space-y-1">
            <p className="text-emerald-400 font-bold">OS &amp; Stack</p>
            <p className="text-zinc-400">OS: macOS / Linux (Production Ready)</p>
            <p className="text-zinc-400">Shell: zsh 5.9 (developer-env)</p>
            <p className="text-zinc-400">Runtime: Node.js v20.x / Next.js 16</p>
          </div>
          <div className="p-2.5 rounded bg-zinc-900/80 border border-zinc-800 space-y-1">
            <p className="text-cyan-400 font-bold">Performance Metrics</p>
            <p className="text-zinc-400">Lighthouse SEO: 100/100</p>
            <p className="text-zinc-400">Lighthouse Perf: 98/100</p>
            <p className="text-zinc-400">Responsiveness: Mobile &amp; Desktop Tested</p>
          </div>
        </div>
      );
    } else if (trimmed === "help") {
      outputNode = (
        <div className="text-xs space-y-1 text-zinc-300">
          <p className="text-emerald-400 font-bold">Perintah Konsol Tersedia:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1 pl-2">
            {availableCommands.map((c) => (
              <div key={c.cmd} className="flex items-center gap-2">
                <span className="text-zinc-200 font-semibold">{c.cmd}</span>
                <span className="text-zinc-500">- {c.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      outputNode = (
        <div className="text-xs text-rose-400">
          zsh: command not found: <span className="text-zinc-200">{cmdString}</span>. Ketik{" "}
          <span
            className="underline cursor-pointer text-emerald-400 font-bold"
            onClick={() => handleCommandExecution("help")}
          >
            help
          </span>{" "}
          untuk melihat daftar instruksi.
        </div>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cmdString,
        output: outputNode,
        timestamp: now,
      },
    ]);
    setInputVal("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommandExecution(inputVal);
  };

  const copyTerminalOutput = () => {
    const rawText = history
      .map((h) => `$ ${h.command}`)
      .join("\n");
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetTerminal = () => {
    setHistory(INITIAL_COMMANDS);
    setInputVal("");
  };

  return (
    <section className="relative pt-6 pb-12 overflow-hidden" id="terminal-hero">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[320px] h-[220px] bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />

      <div className={`relative mx-auto transition-all duration-300 ${isExpanded ? "max-w-6xl" : "max-w-4xl"}`}>
        {/* Main Terminal Window */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/95 shadow-2xl backdrop-blur-xl overflow-hidden ring-1 ring-zinc-800/80">
          {/* Window Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/90 bg-zinc-900/80 select-none">
            {/* Window Controls (Traffic Lights) */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={resetTerminal}
                title="Reset konsol (Restore initial)"
                className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-400 inline-block shadow-sm transition-transform active:scale-90"
              />
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title="Toggle expand lebar jendela"
                className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400 inline-block shadow-sm transition-transform active:scale-90"
              />
              <button
                type="button"
                onClick={() => handleCommandExecution("sysinfo")}
                title="Cek telemetry sistem"
                className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 inline-block shadow-sm transition-transform active:scale-90"
              />

              {/* Tab Navigation */}
              <div className="hidden sm:flex items-center gap-1 ml-4 border-l border-zinc-700/60 pl-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("terminal")}
                  className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
                    activeTab === "terminal"
                      ? "bg-zinc-800 text-zinc-200 border border-zinc-700/80"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>zsh (interactive)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("sysinfo")}
                  className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
                    activeTab === "sysinfo"
                      ? "bg-zinc-800 text-zinc-200 border border-zinc-700/80"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>sysinfo.sh</span>
                </button>
              </div>

              <span className="sm:hidden ml-2 text-[11px] font-mono text-zinc-400">
                dev@zainul:~/portfolio
              </span>
            </div>

            {/* Path & Status Indicators */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-zinc-300">main</span>
                <span className="text-emerald-400 font-bold">•</span>
                <span className="text-zinc-500">clean</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={copyTerminalOutput}
                  className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                  title="Salin log terminal"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="hidden sm:block p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                  title={isExpanded ? "Kecilkan" : "Perlebar"}
                >
                  {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Suggested Commands Toolbar */}
          <div className="px-4 py-2 bg-zinc-900/40 border-b border-zinc-800/60 flex items-center gap-2 overflow-x-auto text-[11px] font-mono scrollbar-none">
            <span className="text-zinc-500 shrink-0">Quick Run:</span>
            {availableCommands.slice(0, 5).map((item) => (
              <button
                key={item.cmd}
                type="button"
                onClick={() => handleCommandExecution(item.cmd)}
                className="shrink-0 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-emerald-300 transition-colors active:scale-95"
              >
                ${item.cmd}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleCommandExecution("clear")}
              className="shrink-0 px-3 py-1.5 rounded bg-zinc-900 hover:bg-rose-950/40 border border-zinc-800 hover:border-rose-900/60 text-zinc-400 hover:text-rose-300 transition-colors flex items-center gap-1 active:scale-95"
            >
              <RotateCcw className="w-3 h-3" />
              clear
            </button>
          </div>

          {/* Terminal Content: Tab View */}
          {activeTab === "sysinfo" ? (
            <div className="p-6 font-mono text-xs text-zinc-300 space-y-4">
              <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/30">
                <p className="text-emerald-400 font-bold mb-2">SYSTEM TELEMETRY REPORT [FASTFETCH]</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-zinc-400">
                  <div className="space-y-1">
                    <p><span className="text-zinc-200">Host:</span> Zainul Web Workstation v2026</p>
                    <p><span className="text-zinc-200">Kernel / Engine:</span> Next.js 16 (App Router + Turbopack)</p>
                    <p><span className="text-zinc-200">Uptime:</span> 99.98% High Availability</p>
                    <p><span className="text-zinc-200">Shell:</span> ZSH Interactive CLI</p>
                  </div>
                  <div className="space-y-1">
                    <p><span className="text-zinc-200">Core Stack:</span> React 19, TypeScript 5, Tailwind CSS</p>
                    <p><span className="text-zinc-200">Database:</span> PostgreSQL / SQLite Unified Migration</p>
                    <p><span className="text-zinc-200">Deployment:</span> Vercel / Edge Network Ready</p>
                    <p><span className="text-zinc-200">Security:</span> HttpOnly Auth &amp; CSRF Protected</p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("terminal")}
                className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors"
              >
                &larr; Kembali ke konsol interaktif
              </button>
            </div>
          ) : (
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-4 max-h-[480px] overflow-y-auto">
              {/* Command History Output */}
              {history.map((item, index) => (
                <div key={index} className="space-y-1.5 animate-fadeIn">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span className="text-emerald-400 font-bold shrink-0">
                      zainul@portfolio:~$
                    </span>
                    <span className="text-zinc-100 font-semibold">{item.command}</span>
                    <span className="ml-auto text-[10px] text-zinc-600 hidden sm:inline">
                      {item.timestamp}
                    </span>
                  </div>
                  <div className="pl-3 sm:pl-5 border-l border-zinc-800/80">{item.output}</div>
                </div>
              ))}

              {/* Active Interactive Input Form */}
              <form onSubmit={handleFormSubmit} className="pt-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-emerald-400 font-bold shrink-0">
                    zainul@portfolio:~$
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="ketik perintah misal 'skills', 'projects', 'help'..."
                    className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-600 font-mono text-xs sm:text-sm focus:ring-0 p-0"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <button
                    type="submit"
                    title="Jalankan perintah"
                    className="px-3 py-2 rounded-lg bg-zinc-900 hover:bg-emerald-600 hover:text-zinc-950 text-zinc-400 text-xs font-mono transition-colors flex items-center gap-1 border border-zinc-800 min-w-[52px] min-h-[36px] active:scale-95"
                  >
                    <span>Run</span>
                    <CornerDownLeft className="w-3 h-3" />
                  </button>
                </div>
              </form>

              <div ref={terminalEndRef} />
            </div>
          )}

          {/* Terminal Footer Quick Actions */}
          <div className="px-4 sm:px-6 py-3 border-t border-zinc-800/80 bg-zinc-900/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto">
              <a
                href="#projects"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs font-mono transition-all shadow-md shadow-emerald-500/20 active:scale-95"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Lihat Karya Project</span>
                <ArrowDown className="w-3 h-3 animate-bounce" />
              </a>
              <a
                href="#contact"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 text-xs font-mono transition-colors active:scale-95"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Hubungi Saya</span>
              </a>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-zinc-500">
              <span>Tip: Ketik &quot;sudo hire&quot; di konsol terminal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
