"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Mail,
  CheckCircle2,
  Terminal,
  Copy,
  Check,
  Zap,
} from "lucide-react";
import { MOCK_CONTACT } from "@/data/mockContact";

interface CollaborationCTAProps {
  title?: string;
  subtitle?: string;
  email?: string;
  calendarUrl?: string;
  showBadges?: boolean;
  className?: string;
}

export default function CollaborationCTA({
  title = "Tertarik Merancang Solusi Web Bersama?",
  subtitle = "Saya siap membantu mentransformasikan ide kompleks Anda menjadi aplikasi web modern yang cepat, andal, dan menyenangkan digunakan oleh pengguna.",
  email = MOCK_CONTACT.email,
  calendarUrl = "https://cal.com",
  showBadges = true,
  className = "",
}: CollaborationCTAProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const highlights = [
    { label: "Arsitektur Skalabel & Clean Code", icon: Zap },
    { label: "Respon Kilat & Transparan (< 24 Jam)", icon: CheckCircle2 },
    { label: "Desain Berpusat Pada Pengguna", icon: Sparkles },
  ];

  return (
    <section
      aria-label="Ajakan Kerja Sama"
      className={`rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-gradient-to-br from-emerald-600 via-teal-700 to-zinc-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none -ml-16 -mb-16" />

      <div className="relative z-10 space-y-8">
        {/* Terminal Tag */}
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-200">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
            <Terminal className="w-3.5 h-3.5 text-amber-300" />
            <span>git commit -m &quot;feat: open-collaboration&quot;</span>
          </span>
          <span className="hidden sm:inline-block text-emerald-200/80">
            // Tersedia untuk proyek baru
          </span>
        </div>

        {/* Content Heading */}
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono tracking-tight text-white leading-tight">
            {title}
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Value Highlights */}
        {showBadges && (
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/20 border border-white/10 text-xs font-mono text-emerald-100 backdrop-blur-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span>{h.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Button Strip */}
        <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Primary Action Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-zinc-950 hover:bg-emerald-50 font-mono font-bold text-xs transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group"
            >
              <span>Mulai Diskusi Proyek</span>
              <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary Action: Calendar Meet */}
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-semibold text-xs transition-all backdrop-blur-sm"
            >
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>Sesi 1-on-1 (30 Menit)</span>
            </a>
          </div>

          {/* Quick Copy Email Snippet */}
          <div className="flex items-center gap-2 bg-black/30 px-3.5 py-2 rounded-xl border border-white/10 text-xs font-mono">
            <Mail className="w-4 h-4 text-emerald-300 shrink-0" />
            <span className="text-emerald-100 truncate max-w-[200px]">{email}</span>
            <button
              onClick={handleCopyEmail}
              className="p-1 rounded hover:bg-white/10 text-emerald-200 transition-colors ml-1"
              title="Salin alamat surel"
              aria-label="Salin email"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
