"use client";

import React, { useState, useMemo } from "react";
import {
  Layers,
  Search,
  X,
  Terminal,
  Star,
  Code2,
  Server,
  Cpu,
  Sparkles,
  Filter,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { SkillCategory, SkillItem } from "@/types/about";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export default function SkillsSection({ categories }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const categoryList = useMemo(() => {
    return [
      { id: "all", name: "Semua Kategori" },
      ...categories.map((c) => ({ id: c.id, name: c.name }))
    ];
  }, [categories]);

  // Filter skills based on category, level, and query
  const filteredCategories = useMemo(() => {
    return categories
      .filter((cat) => selectedCategory === "all" || cat.id === selectedCategory)
      .map((cat) => {
        const filteredSkills = cat.skills.filter((skill) => {
          const matchQuery =
            !searchQuery ||
            skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (skill.description &&
              skill.description.toLowerCase().includes(searchQuery.toLowerCase()));

          const matchLevel =
            selectedLevel === "all" ||
            skill.level.toLowerCase() === selectedLevel.toLowerCase();

          return matchQuery && matchLevel;
        });

        return {
          ...cat,
          skills: filteredSkills
        };
      })
      .filter((cat) => cat.skills.length > 0);
  }, [categories, selectedCategory, searchQuery, selectedLevel]);

  const totalFilteredSkills = filteredCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "frontend":
        return <Code2 className="w-4 h-4 text-cyan-500" />;
      case "backend":
        return <Server className="w-4 h-4 text-emerald-500" />;
      case "devops":
        return <Cpu className="w-4 h-4 text-indigo-500" />;
      default:
        return <Layers className="w-4 h-4 text-zinc-400" />;
    }
  };

  const getLevelBadge = (level: SkillItem["level"]) => {
    switch (level) {
      case "Expert":
        return "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/80";
      case "Advanced":
        return "bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800/80";
      case "Intermediate":
        return "bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800/80";
      default:
        return "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700";
    }
  };

  const getProficiencyPercentage = (level: SkillItem["level"]) => {
    switch (level) {
      case "Expert":
        return 95;
      case "Advanced":
        return 85;
      case "Intermediate":
        return 70;
      default:
        return 50;
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedLevel("all");
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              Keahlian & Kemampuan Teknis
            </h2>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Stack dan teknologi yang saya gunakan sehari-hari
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari keahlian teknis..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category and Level Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none -mx-1 px-1 sm:overflow-visible sm:flex-wrap">
          {categoryList.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isActive
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold shadow-xs"
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                }`}
              >
                {cat.id !== "all" && getCategoryIcon(cat.id)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Level Selector */}
        <div className="flex items-center gap-1.5 text-xs font-mono overflow-x-auto pb-1 scrollbar-none shrink-0">
          <span className="text-zinc-400 text-[11px] hidden md:inline">Level:</span>
          {["all", "Expert", "Advanced", "Intermediate"].map((lvl) => {
            const isActive = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`shrink-0 px-2.5 py-1 rounded-md text-[11px] transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950 font-bold shadow-xs"
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                {lvl === "all" ? "Semua" : lvl}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="font-mono font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {getCategoryIcon(category.id)}
                    {category.name}
                  </span>
                  <span className="text-[11px] font-normal text-emerald-600 dark:text-emerald-400 font-mono">
                    {category.skills.length} Stack
                  </span>
                </h3>

                <div className="space-y-3">
                  {category.skills.map((skill) => {
                    const percentage = getProficiencyPercentage(skill.level);
                    return (
                      <div
                        key={skill.name}
                        className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-emerald-500/40 transition-all group"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5 font-mono text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {skill.name}
                            </span>
                            {skill.isKey && (
                              <span title="Keahlian Inti (Primary Skill)">
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            {skill.yearsOfExp && (
                              <span className="text-[10px] text-zinc-400">
                                {skill.yearsOfExp} thn
                              </span>
                            )}
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${getLevelBadge(
                                skill.level
                              )}`}
                            >
                              {skill.level}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1 rounded-full overflow-hidden mb-2">
                          <div
                            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>

                        {skill.description && (
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State UI */
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 p-8 sm:p-12 text-center">
          <div className="max-w-md mx-auto space-y-4 font-mono">
            {/* Terminal Style Command Result */}
            <div className="p-3.5 rounded-xl bg-zinc-950 text-left text-xs border border-zinc-800 space-y-1 text-zinc-300">
              <p className="text-emerald-400">
                $ grep -i &quot;{searchQuery || selectedLevel}&quot; /var/log/skills.log
              </p>
              <p className="text-rose-400">
                exit status 1: No matching skill capabilities found.
              </p>
            </div>

            <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Keahlian Tidak Ditemukan
            </h3>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              Tidak ada keahlian yang cocok dengan kata kunci{" "}
              <span className="font-mono text-zinc-700 dark:text-zinc-200 font-semibold">
                &quot;{searchQuery || selectedLevel}&quot;
              </span>
              . Silakan coba kata kunci lain atau reset filter untuk menampilkan semua keahlian.
            </p>

            <div className="pt-2">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-mono font-bold text-xs transition-all shadow-sm"
              >
                <Filter className="w-3.5 h-3.5" />
                Reset Semua Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
