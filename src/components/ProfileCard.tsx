"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Terminal,
  MapPin,
  Mail,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  User,
  Code2
} from "lucide-react";
import { AboutProfile } from "@/types/about";

interface ProfileCardProps {
  profile: AboutProfile;
  showBio?: boolean;
  showMetrics?: boolean;
  className?: string;
}

export default function ProfileCard({
  profile,
  showBio = true,
  showMetrics = true,
  className = ""
}: ProfileCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div
      className={`relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-10 backdrop-blur-xl shadow-sm dark:shadow-2xl overflow-hidden transition-all ${className}`}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-3 mb-6 text-xs font-mono text-zinc-400">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
        </div>
        <span className="flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-emerald-500" />
          bash — whoami --profile
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Image with Fallback */}
        <div className="relative shrink-0 group">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 shadow-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            {!imageFailed && profile.photoUrl ? (
              <Image
                src={profile.photoUrl}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 640px) 144px, 176px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageFailed(true)}
              />
            ) : (
              /* Fallback UI: Initial Avatar with Terminal Gradient */
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-600 to-teal-900 text-white font-mono p-4 text-center select-none">
                <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center mb-2 border border-white/20">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-wider">
                  {profile.avatarFallback || profile.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="text-[10px] text-emerald-200 tracking-tight font-sans mt-0.5">
                  Web Developer
                </span>
              </div>
            )}
          </div>

          {/* Status Indicator Pill */}
          <div className="absolute -bottom-2.5 -right-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700/60 text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-300 shadow-md flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{profile.status.includes("Tersedia") ? "Open for Work" : "Active"}</span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-600 dark:text-zinc-300 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Full-Stack Web Architect</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-zinc-900 dark:text-zinc-100 tracking-tight">
              {profile.name}
            </h1>
            <p className="text-sm sm:text-base font-mono text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              {profile.headline}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{profile.location}</span>
            </span>
            <div className="flex items-center gap-1.5 bg-zinc-100/80 dark:bg-zinc-800/60 px-2.5 py-1 rounded-lg border border-zinc-200/60 dark:border-zinc-700/60">
              <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="select-all truncate max-w-[180px] sm:max-w-none">{profile.email}</span>
              <button
                onClick={handleCopyEmail}
                title="Salin email"
                className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-400 hover:text-emerald-500 transition-colors ml-0.5 shrink-0"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Social Links & Primary CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3">
            <Link
              href="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-mono font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Hubungi Saya</span>
            </Link>

            <Link
              href="/#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-mono font-semibold text-xs border border-zinc-200 dark:border-zinc-700 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Lihat Project</span>
            </Link>

            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-zinc-200 dark:border-zinc-700 transition-colors"
                aria-label="GitHub Profile"
                title="Kunjungi GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            )}

            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-zinc-200 dark:border-zinc-700 transition-colors"
                aria-label="LinkedIn Profile"
                title="Kunjungi LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      {showMetrics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 text-center sm:text-left">
            <span className="text-zinc-400 block text-[11px] mb-1">Pengalaman</span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {profile.stats.yearsOfExperience}+ Tahun
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 text-center sm:text-left">
            <span className="text-zinc-400 block text-[11px] mb-1">Project Selesai</span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {profile.stats.completedProjects}+ Web Apps
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 text-center sm:text-left">
            <span className="text-zinc-400 block text-[11px] mb-1">Kontribusi Kode</span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {profile.stats.codeCommits} Commits
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 text-center sm:text-left">
            <span className="text-zinc-400 block text-[11px] mb-1">Kepuasan Klien</span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {profile.stats.clientSatisfaction}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
