"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Star,
  CheckCircle2,
  Save,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowLeft,
  Loader2,
  GripVertical,
  ExternalLink,
} from "lucide-react";
import { Project } from "@/types/project";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import ToastNotification, { ToastType } from "@/components/ToastNotification";

interface ProjectOrderManagerProps {
  initialProjects?: Project[];
  onSave?: (reorderedProjects: Project[]) => void;
}

export default function ProjectOrderManager({
  initialProjects = MOCK_PROJECTS,
  onSave,
}: ProjectOrderManagerProps) {
  // Sort initially by featured first, then sortOrder
  const getInitialSorted = () =>
    [...initialProjects].sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) {
        return b.isFeatured ? 1 : -1;
      }
      return a.sortOrder - b.sortOrder;
    });

  const [projects, setProjects] = useState<Project[]>(getInitialSorted);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{
    isOpen: boolean;
    type: ToastType;
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  // Move item up in the list
  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const newProjects = [...projects];
    const [moved] = newProjects.splice(index, 1);
    newProjects.splice(targetIndex, 0, moved);

    // Re-assign sortOrder numbers sequentially
    const updated = newProjects.map((p, i) => ({
      ...p,
      sortOrder: i + 1,
    }));

    setProjects(updated);
  };

  // Toggle featured status
  const toggleFeatured = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return { ...p, isFeatured: !p.isFeatured };
        }
        return p;
      })
    );
  };

  // Reset to original mock order
  const handleReset = () => {
    setProjects(getInitialSorted());
    setToast({
      isOpen: true,
      type: "info",
      title: "Urutan Direset",
      message: "Susunan urutan project berhasil dikembalikan ke format awal.",
    });
  };

  // Save new ordering
  const handleSave = async () => {
    setIsSaving(true);

    // Simulate saving updated ordering
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSaving(false);
    setToast({
      isOpen: true,
      type: "success",
      title: "Perubahan Urutan Disimpan",
      message: "Susunan urutan dan prioritas project unggulan berhasil diperbarui!",
    });

    if (onSave) {
      onSave(projects);
    }
  };

  const featuredCount = projects.filter((p) => p.isFeatured).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <ToastNotification
        isOpen={toast.isOpen}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Header and Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-mono text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Kelola Project</span>
        </Link>

        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Unggulan Aktif: {featuredCount} dari {projects.length} project</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-8 backdrop-blur-md shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              Atur Unggulan &amp; Urutan Tampil
            </h1>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
              // Geser urutan ke atas/bawah dan tandai project bintang untuk disorot di galeri utama
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs shrink-0">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-bold transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Urutan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Reorderable Items List */}
        <div className="space-y-3">
          {projects.map((project, index) => {
            const isFirst = index === 0;
            const isLast = index === projects.length - 1;

            return (
              <div
                key={project.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  project.isFeatured
                    ? "border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/10 shadow-sm"
                    : "border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/50"
                }`}
              >
                {/* Left: Position Number, Thumbnail, Meta */}
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Position Pill */}
                  <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-mono font-bold text-xs text-zinc-700 dark:text-zinc-300 shrink-0">
                    #{index + 1}
                  </div>

                  {/* Thumbnail */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shrink-0">
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100 truncate">
                        {project.title}
                      </h3>
                      {project.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                          ★ Unggulan
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-zinc-400 truncate">
                      /{project.slug} · {project.role}
                    </div>
                  </div>
                </div>

                {/* Right: Controls (Toggle Featured, Move Up, Move Down) */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0 font-mono text-xs">
                  {/* Toggle Featured Button */}
                  <button
                    onClick={() => toggleFeatured(project.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs ${
                      project.isFeatured
                        ? "border-amber-400/60 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-semibold"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                    title={project.isFeatured ? "Klik untuk hapus unggulan" : "Klik untuk jadikan unggulan"}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        project.isFeatured ? "fill-amber-400 text-amber-400" : ""
                      }`}
                    />
                    <span>{project.isFeatured ? "Unggulan" : "Reguler"}</span>
                  </button>

                  {/* Move Up Button */}
                  <button
                    onClick={() => moveItem(index, "up")}
                    disabled={isFirst}
                    className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors"
                    title="Pindahkan satu tingkat ke atas"
                    aria-label="Pindahkan ke atas"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  {/* Move Down Button */}
                  <button
                    onClick={() => moveItem(index, "down")}
                    disabled={isLast}
                    className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors"
                    title="Pindahkan satu tingkat ke bawah"
                    aria-label="Pindahkan ke bawah"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
