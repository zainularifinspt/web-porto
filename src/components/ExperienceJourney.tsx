"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  Building2,
  CheckCircle2,
  GitCommit,
  GitBranch,
  Terminal,
  Sparkles,
  Clock,
  Layers
} from "lucide-react";
import { ExperienceItem } from "@/types/about";

interface ExperienceJourneyProps {
  experiences: ExperienceItem[];
}

export default function ExperienceJourney({ experiences }: ExperienceJourneyProps) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Collect all unique technologies used across all experiences
  const allTechs = Array.from(
    new Set(experiences.flatMap((exp) => exp.technologies))
  );

  const filteredExperiences = selectedTech
    ? experiences.filter((exp) => exp.technologies.includes(selectedTech))
    : experiences;

  return (
    <div className="space-y-6">
      {/* Header Bar with Developer Terminal Touch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              Perjalanan Pengalaman Karir
            </h2>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Riwayat kontribusi profesional, peran engineering, dan pencapaian
            </span>
          </div>
        </div>

        {/* Terminal Branch Tag */}
        <span className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400">
          <GitBranch className="w-3.5 h-3.5 text-emerald-500" />
          career-timeline.log
        </span>
      </div>

      {/* Tech Filter Pills */}
      {allTechs.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none -mx-1 px-1 sm:overflow-visible sm:flex-wrap pt-1">
          <span className="text-[11px] font-mono text-zinc-400 mr-1 flex items-center gap-1 shrink-0">
            <Layers className="w-3 h-3 text-emerald-500" /> Filter Stack:
          </span>
          <button
            onClick={() => setSelectedTech(null)}
            className={`shrink-0 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
              selectedTech === null
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold shadow-xs"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            }`}
          >
            Semua ({experiences.length})
          </button>
          {allTechs.slice(0, 7).map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
              className={`shrink-0 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                selectedTech === tech
                  ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950 font-bold shadow-xs"
                  : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      )}

      {/* Timeline Container */}
      {filteredExperiences.length > 0 ? (
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-zinc-300 dark:before:via-zinc-700 before:to-zinc-200 dark:before:to-zinc-800">
          {filteredExperiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative group transition-all"
            >
              {/* Timeline Node Icon / Dot */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  exp.isCurrent
                    ? "bg-emerald-500 border-white dark:border-zinc-900 shadow-md shadow-emerald-500/50 ring-4 ring-emerald-500/20"
                    : "bg-white dark:bg-zinc-900 border-zinc-400 dark:border-zinc-600 group-hover:border-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950"
                }`}
              />

              {/* Experience Card */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-sm dark:shadow-xl backdrop-blur-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                {/* Header with Role and Company */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100 tracking-tight">
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 flex items-center gap-1 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Aktif
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1 text-zinc-400">
                          • <MapPin className="w-3 h-3 shrink-0" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Period Badge */}
                  <div className="self-start sm:self-auto shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 font-mono text-xs border border-zinc-200 dark:border-zinc-700/60 shadow-xs">
                      <Calendar className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{exp.period}</span>
                    </span>
                  </div>
                </div>

                {/* Narrative Summary Paragraph */}
                <div className="mb-5">
                  <p className="text-sm sm:text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                    {exp.summary}
                  </p>
                </div>

                {/* Key Achievements Bullet List */}
                {exp.contributions.length > 0 && (
                  <div className="space-y-2.5 mb-5 p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider block flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                      Dampak & Kontribusi Utama:
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans">
                      {exp.contributions.map((contribution, i) => (
                        <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{contribution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies Badges Footer */}
                <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
                  <span className="text-[11px] font-mono text-zinc-400 mr-1 hidden sm:inline">
                    Stack:
                  </span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State for Filtered Experiences */
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 p-8 text-center font-mono">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
            Tidak ada riwayat pengalaman dengan teknologi &quot;{selectedTech}&quot;.
          </p>
          <button
            onClick={() => setSelectedTech(null)}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition-colors"
          >
            Tampilkan Semua Pengalaman
          </button>
        </div>
      )}
    </div>
  );
}
