import React from "react";
import Link from "next/link";
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
import ProfileCard from "@/components/ProfileCard";
import SkillsSection from "@/components/SkillsSection";
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

        {/* Hero Banner / Profile with Photo & Fallback */}
        <ProfileCard profile={profile} />

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

        {/* Skills Overview Section with Filtering & Empty State */}
        <SkillsSection categories={profile.skills} />

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
