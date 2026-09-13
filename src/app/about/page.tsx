import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  Terminal,
  User,
  Sparkles,
  MapPin,
  Mail,
  ArrowLeft,
  Briefcase,
  Code2,
  Calendar,
  CheckCircle2,
  GraduationCap,
  ExternalLink,
  GitBranch,
  Layers,
  Cpu
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { MOCK_ABOUT } from "@/data/mockAbout";

export const metadata: Metadata = {
  title: `Tentang Saya — ${MOCK_ABOUT.name} | Portofolio Dev Kece`,
  description: `${MOCK_ABOUT.name} — ${MOCK_ABOUT.headline}. Pelajari perjalanan karir, keahlian teknis, dan filosofi pengembangan web saya.`,
};

export default function AboutPage() {
  const profile = MOCK_ABOUT;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-zinc-950 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Breadcrumb & Navigation Info */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>cd ~ / Beranda</span>
          </Link>

          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0">
              <GitBranch className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              main@profile
            </span>
            <span className="hidden md:inline-block">
              ~/portfolio/pages/about.md
            </span>
          </div>
        </div>

        {/* Hero Banner / Whoami Header */}
        <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-10 backdrop-blur-xl shadow-sm dark:shadow-2xl overflow-hidden">
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-3 mb-6 text-xs font-mono text-zinc-400">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>
            <span>bash — whoami</span>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Avatar / Photo Container */}
            <div className="relative shrink-0">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 shadow-xl bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={profile.photoUrl}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 144px, 176px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700/60 text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-300 shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available</span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-600 dark:text-zinc-300 mb-3">
                  <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                  <span>$ cat /etc/identity.json</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold font-mono text-zinc-900 dark:text-zinc-100 tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-base sm:text-lg font-mono text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  {profile.headline}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                  {profile.email}
                </span>
              </div>

              {/* Action Contact & Resume Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-mono font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Hubungi Saya
                </Link>
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-mono font-semibold text-xs border border-zinc-200 dark:border-zinc-700 transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Lihat Karya Project
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
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
        </div>

        {/* Narrative Biography / Cerita Diri */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800/80">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">
                Filosofi & Pendekatan Engineering
              </h2>
              <span className="text-xs font-mono text-zinc-400">
                // Cerita singkat tentang bagaimana saya membangun aplikasi
              </span>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans pt-2">
            {profile.bio.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Skills Overview Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100">
                  Keahlian & Kemampuan Teknis
                </h2>
                <span className="text-xs font-mono text-zinc-400">
                  Daftar stack dan teknologi yang saya gunakan sehari-hari
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.skills.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-mono font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className="text-[11px] font-normal text-emerald-600 dark:text-emerald-400 font-mono">
                      {category.skills.length} Stack
                    </span>
                  </h3>

                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-emerald-500/40 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1 font-mono text-xs">
                          <span className="font-bold text-zinc-800 dark:text-zinc-200">
                            {skill.name}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/60">
                            {skill.level}
                          </span>
                        </div>
                        {skill.description && (
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Journey Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100">
                Perjalanan Pengalaman Karir
              </h2>
              <span className="text-xs font-mono text-zinc-400">
                Jejak karir dan peran penting yang pernah saya emban
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {profile.experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-sm backdrop-blur-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-zinc-100 dark:border-zinc-800/80 font-mono">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {exp.role}
                    </h3>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      {exp.company} {exp.location ? `• ${exp.location}` : ""}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                    {exp.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  {exp.summary}
                </p>

                <div className="space-y-2 mb-4">
                  <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
                    Pencapaian Kunci:
                  </span>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    {exp.contributions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100">
                Pendidikan Formal
              </h2>
              <span className="text-xs font-mono text-zinc-400">
                Fondasi akademis di bidang sains komputer dan rekayasa perangkat lunak
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {profile.education.map((edu, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 font-mono">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {edu.degree}
                  </h3>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">
                    {edu.year}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mb-2">
                  {edu.institution}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  {edu.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-mono">
              Tertarik Berkolaborasi?
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              Saya selalu terbuka untuk mendiskusikan posisi full-time, freelance, maupun konsultasi arsitektur sistem web modern.
            </p>
          </div>
          <Link
            href="/#contact"
            className="shrink-0 px-6 py-3 rounded-xl bg-white text-zinc-950 hover:bg-emerald-50 font-mono font-bold text-xs transition-all shadow-lg"
          >
            Mulai Percakapan →
          </Link>
        </div>
      </main>
    </div>
  );
}
