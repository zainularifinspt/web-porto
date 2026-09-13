"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Terminal,
  FolderGit2,
  Star,
  CheckCircle2,
  LayoutGrid,
  List,
  ExternalLink,
  Code2,
  ArrowUpRight
} from "lucide-react";
import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";

interface ProjectGalleryProps {
  initialProjects: Project[];
}

export default function ProjectGallery({ initialProjects }: ProjectGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "featured" | string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extract all unique technologies for quick tag filtering
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    initialProjects.forEach((p) => p.technologies.forEach((t) => techSet.add(t)));
    return Array.from(techSet).slice(0, 6);
  }, [initialProjects]);

  // Filter projects based on filter tab and search query
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Tab filter
      if (activeFilter === "featured" && !project.isFeatured) {
        return false;
      }
      if (
        activeFilter !== "all" &&
        activeFilter !== "featured" &&
        !project.technologies.includes(activeFilter)
      ) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesSummary = project.summary.toLowerCase().includes(q);
        const matchesTech = project.technologies.some((t) => t.toLowerCase().includes(q));
        const matchesRole = project.role.toLowerCase().includes(q);
        return matchesTitle || matchesSummary || matchesTech || matchesRole;
      }

      return true;
    }).sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) {
        return b.isFeatured ? 1 : -1;
      }
      return a.sortOrder - b.sortOrder;
    });
  }, [initialProjects, activeFilter, searchQuery]);

  // Separate featured & other for "all" tab
  const featuredProjects = useMemo(
    () => filteredProjects.filter((p) => p.isFeatured),
    [filteredProjects]
  );
  const otherProjects = useMemo(
    () => filteredProjects.filter((p) => !p.isFeatured),
    [filteredProjects]
  );

  return (
    <section id="projects" className="py-8 md:py-12 w-full">
      {/* Developer Terminal Control Bar */}
      <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-3 bg-zinc-900/60">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-3 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              zsh — ~/portfolio/projects
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
            <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
              <CheckCircle2 className="w-3 h-3" />
              git:(main)
            </span>
            <span className="hidden sm:inline-block text-zinc-400">
              {filteredProjects.length} repos loaded
            </span>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Tampilan Grid"
                className={`p-1 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-zinc-800 text-emerald-400 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="Tampilan List"
                className={`p-1 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-zinc-800 text-emerald-400 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Command Line & Search / Filter Controls */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Terminal Prompt Text */}
            <div className="font-mono text-xs sm:text-sm text-zinc-300 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-zinc-400">ls -la --view={viewMode} --filter=</span>
              <span className="text-emerald-300 font-semibold underline decoration-emerald-500/40">
                {activeFilter}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="grep 'project / tech'..."
                className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400 hover:text-zinc-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800/60">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3 text-emerald-400" />
              Filter:
            </span>

            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeFilter === "all"
                  ? "bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-800"
              }`}
            >
              Semua ({initialProjects.length})
            </button>

            <button
              onClick={() => setActiveFilter("featured")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                activeFilter === "featured"
                  ? "bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-800"
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              Unggulan ({initialProjects.filter((p) => p.isFeatured).length})
            </button>

            {allTechnologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveFilter(tech)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeFilter === tech
                    ? "bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20"
                    : "bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800/80"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-12 text-center">
          <Terminal className="w-12 h-12 text-zinc-600 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-mono font-bold text-zinc-300 mb-1">
            grep: project tidak ditemukan
          </h3>
          <p className="text-xs font-mono text-zinc-500 mb-4">
            Tidak ada project dengan kata kunci &quot;{searchQuery}&quot; atau filter &quot;{activeFilter}&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveFilter("all");
            }}
            className="px-4 py-2 rounded-lg bg-zinc-800 text-emerald-400 hover:bg-zinc-700 text-xs font-mono border border-zinc-700 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      ) : viewMode === "list" ? (
        /* Compact Developer List Mode */
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-zinc-800 bg-zinc-900/70 text-zinc-400 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Slug / Nama Project</th>
                  <th className="py-3.5 px-4">Peran</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Teknologi</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-zinc-900/50 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-semibold text-zinc-100 flex items-center gap-2">
                      {project.isFeatured && (
                        <Star className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 shrink-0" />
                      )}
                      <Link
                        href={`/project/${project.slug}`}
                        className="hover:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        {project.title}
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">{project.role}</td>
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-emerald-300 border border-zinc-700">
                        {project.stats?.status || "Live"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400"
                            title="Repository"
                          >
                            <Code2 className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <Link
                          href={`/project/${project.slug}`}
                          className="text-[11px] px-2 py-1 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 hover:bg-emerald-900/40"
                        >
                          Detail
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeFilter === "all" && !searchQuery ? (
        /* Responsive Grid Mode with Featured Split */
        <div className="space-y-12">
          {/* Featured Section */}
          {featuredProjects.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-md bg-emerald-950/80 border border-emerald-700/40 text-emerald-400">
                    <Star className="w-4 h-4 fill-emerald-400" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold font-mono text-zinc-100 flex items-center gap-2">
                      Project Unggulan
                      <span className="text-xs font-normal text-emerald-400/80 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                        Featured Selection
                      </span>
                    </h2>
                    <p className="text-xs text-zinc-400 font-mono">
                      Karya terpilih dengan arsitektur terlengkap dan dampak tertinggi
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid 1-col on mobile, 2-col on tablet, 3-col on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} featuredOnly />
                ))}
              </div>
            </div>
          )}

          {/* Other Projects Section */}
          {otherProjects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                  <FolderGit2 className="w-4 h-4" />
                </span>
                <div>
                  <h2 className="text-xl font-bold font-mono text-zinc-100">
                    Eksplorasi & Project Lainnya
                  </h2>
                  <p className="text-xs text-zinc-400 font-mono">
                    Koleksi modul, perkakas developer, dan aplikasi web lainnya
                  </p>
                </div>
              </div>

              {/* Grid 1-col on mobile, 2-col on tablet, 3-col on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {otherProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Filtered/Searched Grid */
        <div>
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">
              Menampilkan {filteredProjects.length} project
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
