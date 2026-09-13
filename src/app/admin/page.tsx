"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FolderGit2,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Star,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowRight,
  Terminal,
  MoreVertical,
} from "lucide-react";
import { Project } from "@/types/project";
import { MOCK_PROJECTS } from "@/data/mockProjects";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFeatured, setFilterFeatured] = useState<"all" | "featured" | "regular">("all");
  const [notification, setNotification] = useState<string | null>(null);

  // Filtered projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterFeatured === "featured") return project.isFeatured;
    if (filterFeatured === "regular") return !project.isFeatured;
    return true;
  });

  // Calculate statistics
  const totalProjects = projects.length;
  const featuredCount = projects.filter((p) => p.isFeatured).length;
  const totalStars = projects.reduce((acc, p) => acc + (p.stats?.stars || 0), 0);
  const uniqueTechCount = new Set(projects.flatMap((p) => p.technologies)).size;

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDeleteMock = (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus project "${title}"?`)) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showNotification(`Project "${title}" berhasil dihapus (simulasi mock)`);
    }
  };

  const handleToggleFeatured = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.isFeatured;
          showNotification(
            `Status unggulan "${p.title}" diubah menjadi: ${nextState ? "Aktif" : "Non-Aktif"}`
          );
          return { ...p, isFeatured: nextState };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              CRUD &amp; Portofolio Manager
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
            Kelola Daftar Project
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
            Atur galeri karya, ubah deskripsi, kelola label teknologi, dan tentukan urutan unggulan yang tampil di beranda.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <Link
            href="/admin/reorder"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-500/50 text-zinc-700 dark:text-zinc-200 font-mono font-semibold text-xs transition-all shadow-sm"
          >
            <ArrowUpDown className="w-4 h-4 text-emerald-500" />
            <span>Atur Unggulan &amp; Urutan</span>
          </Link>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-mono font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Project</span>
          </Link>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-mono text-emerald-700 dark:text-emerald-300 flex items-center justify-between gap-3 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            ✕
          </button>
        </div>
      )}

      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 shadow-sm space-y-1 font-mono">
          <div className="text-xs text-zinc-400">TOTAL PROJECT</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {totalProjects}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
            100% terindeks di sistem
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 shadow-sm space-y-1 font-mono">
          <div className="text-xs text-zinc-400">PROJECT UNGGULAN</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {featuredCount}
          </div>
          <div className="text-[11px] text-zinc-500">
            Tampil di highlight beranda
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 shadow-sm space-y-1 font-mono">
          <div className="text-xs text-zinc-400">ESTIMASI STARS</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">
            {totalStars}
          </div>
          <div className="text-[11px] text-zinc-500">
            Apresiasi komunitas repo
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 shadow-sm space-y-1 font-mono">
          <div className="text-xs text-zinc-400">STACK TEKNOLOGI</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {uniqueTechCount}
          </div>
          <div className="text-[11px] text-zinc-500">
            Library &amp; framework unik
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 shadow-sm backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari judul, teknologi, atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs bg-zinc-50 dark:bg-zinc-950 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto font-mono text-xs pb-1 sm:pb-0">
          <button
            onClick={() => setFilterFeatured("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
              filterFeatured === "all"
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            Semua ({projects.length})
          </button>
          <button
            onClick={() => setFilterFeatured("featured")}
            className={`px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
              filterFeatured === "featured"
                ? "bg-emerald-600 text-white font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            Unggulan ({featuredCount})
          </button>
          <button
            onClick={() => setFilterFeatured("regular")}
            className={`px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
              filterFeatured === "regular"
                ? "bg-zinc-800 text-white font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            Reguler ({totalProjects - featuredCount})
          </button>
        </div>
      </div>

      {/* Projects Table / Card List */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm overflow-hidden backdrop-blur-md">
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center space-y-3 font-mono">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              Tidak ada project yang cocok
            </div>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto font-sans">
              Coba gunakan kata kunci pencarian yang berbeda atau reset filter unggulan.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors group"
              >
                {/* Left: Thumbnail & Project Meta */}
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shrink-0">
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100 truncate">
                        {project.title}
                      </h3>
                      {project.isFeatured ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          ★ Unggulan
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800">
                          Reguler
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-zinc-400">
                        #{project.sortOrder}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1 font-sans">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 font-mono text-[10px] text-zinc-600 dark:text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="font-mono text-[10px] text-zinc-400">
                          +{project.technologies.length - 4} lainnya
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center font-mono text-xs">
                  {/* View Live Detail */}
                  <Link
                    href={`/project/${project.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Lihat Halaman Publik"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  {/* Toggle Featured */}
                  <button
                    onClick={() => handleToggleFeatured(project.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      project.isFeatured
                        ? "text-amber-500 hover:bg-amber-500/10"
                        : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                    title={project.isFeatured ? "Hapus dari Unggulan" : "Jadikan Unggulan"}
                  >
                    <Star className="w-4 h-4" />
                  </button>

                  {/* Edit Project */}
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all font-semibold"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Ubah</span>
                  </Link>

                  {/* Delete Project */}
                  <button
                    onClick={() => handleDeleteMock(project.id, project.title)}
                    className="p-2 rounded-lg text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title="Hapus Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
