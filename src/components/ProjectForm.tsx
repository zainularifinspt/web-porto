"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Terminal,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Plus,
  Link as LinkIcon,
  Tag,
  Star,
  Layers,
} from "lucide-react";
import { Project } from "@/types/project";

interface ProjectFormProps {
  initialData?: Partial<Project>;
  isEdit?: boolean;
  onSuccess?: (savedProject: Project) => void;
}

export default function ProjectForm({
  initialData,
  isEdit = false,
  onSuccess,
}: ProjectFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isSlugCustom, setIsSlugCustom] = useState(Boolean(initialData?.slug));
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [story, setStory] = useState(initialData?.story || "");
  const [role, setRole] = useState(initialData?.role || "Full-Stack Developer");
  const [demoUrl, setDemoUrl] = useState(initialData?.demoUrl || "");
  const [repoUrl, setRepoUrl] = useState(initialData?.repoUrl || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(
    initialData?.thumbnailUrl ||
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
  );
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? false);
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sortOrder ?? 1);
  const [status, setStatus] = useState<"Live" | "Beta" | "Open Source" | "In Development">(
    initialData?.stats?.status || "Live"
  );
  const [stars, setStars] = useState<number>(initialData?.stats?.stars ?? 0);
  const [views, setViews] = useState<string>(initialData?.stats?.views || "1.2k");

  // Technology tags
  const [technologies, setTechnologies] = useState<string[]>(
    initialData?.technologies || ["Next.js", "TypeScript", "Tailwind CSS"]
  );
  const [newTechInput, setNewTechInput] = useState("");

  // States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Helper auto slugify
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isSlugCustom) {
      setSlug(generateSlug(val));
    }
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: "" }));
    }
  };

  const handleAddTech = () => {
    const trimmed = newTechInput.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      setTechnologies([...technologies, trimmed]);
      setNewTechInput("");
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setTechnologies(technologies.filter((t) => t !== techToRemove));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!title.trim()) errs.title = "Judul project wajib diisi";
    if (!slug.trim()) errs.slug = "Slug URL project wajib diisi";
    if (!summary.trim()) errs.summary = "Ringkasan project wajib diisi";
    if (!story.trim()) errs.story = "Cerita/latar belakang project wajib diisi";
    if (!thumbnailUrl.trim()) errs.thumbnailUrl = "URL thumbnail wajib diisi";
    if (technologies.length === 0) errs.technologies = "Tambahkan minimal 1 teknologi";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setNotification({
        type: "error",
        message: "Mohon lengkapi formulir dengan data yang valid.",
      });
      return;
    }

    setIsSubmitting(true);
    setNotification(null);

    // Simulate saving project data
    await new Promise((resolve) => setTimeout(resolve, 600));

    const savedProject: Project = {
      id: initialData?.id || `proj-${Date.now()}`,
      title,
      slug,
      summary,
      story,
      role,
      demoUrl: demoUrl.trim() || undefined,
      repoUrl: repoUrl.trim() || undefined,
      thumbnailUrl,
      isFeatured,
      sortOrder: Number(sortOrder),
      createdAt: initialData?.createdAt || new Date().toISOString(),
      technologies,
      stats: {
        status,
        stars: Number(stars),
        views,
      },
    };

    setIsSubmitting(false);
    setNotification({
      type: "success",
      message: isEdit
        ? `Project "${title}" berhasil diperbarui!`
        : `Project baru "${title}" berhasil dibuat!`,
    });

    if (onSuccess) {
      onSuccess(savedProject);
    }

    setTimeout(() => {
      router.push("/admin");
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header & Back Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-mono text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Project</span>
        </Link>

        <span className="font-mono text-xs text-zinc-400">
          mode: {isEdit ? "edit-project" : "create-project"}
        </span>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs font-mono flex items-center justify-between gap-3 shadow-sm animate-in fade-in ${
            notification.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
              : "bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-8 backdrop-blur-md shadow-sm space-y-6">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h2 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              {isEdit ? "Ubah Detail Project" : "Tambah Project Baru"}
            </h2>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              // Konfigurasi metadata, cerita arsitektur, dan tautan demo
            </p>
          </div>

          {/* Grid Inputs: Title & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label
                htmlFor="proj-title"
                className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Judul Project <span className="text-rose-500">*</span>
              </label>
              <input
                id="proj-title"
                type="text"
                placeholder="Contoh: DevPulse Server Monitor"
                value={title}
                onChange={handleTitleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl border font-sans text-sm bg-white dark:bg-zinc-950 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                  errors.title
                    ? "border-rose-500 text-rose-600"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500"
                }`}
              />
              {errors.title && (
                <p className="text-xs font-mono text-rose-500">{errors.title}</p>
              )}
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="proj-slug"
                  className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Slug URL <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsSlugCustom(!isSlugCustom)}
                  className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {isSlugCustom ? "Mode Otomatis" : "Edit Manual"}
                </button>
              </div>
              <input
                id="proj-slug"
                type="text"
                placeholder="devpulse-server-monitor"
                value={slug}
                disabled={!isSlugCustom}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs bg-zinc-50 dark:bg-zinc-950 focus:border-emerald-500 focus:outline-none disabled:opacity-75"
              />
              {errors.slug && (
                <p className="text-xs font-mono text-rose-500">{errors.slug}</p>
              )}
            </div>
          </div>

          {/* Role & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="proj-role"
                className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Peran Pengembang <span className="text-rose-500">*</span>
              </label>
              <input
                id="proj-role"
                type="text"
                placeholder="Lead Full-Stack Architect"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-sans text-sm bg-white dark:bg-zinc-950 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="proj-status"
                className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Status Project
              </label>
              <select
                id="proj-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs bg-white dark:bg-zinc-950 focus:border-emerald-500 focus:outline-none"
              >
                <option value="Live">Live / Produksi</option>
                <option value="Beta">Beta Testing</option>
                <option value="Open Source">Open Source</option>
                <option value="In Development">Dalam Pengembangan</option>
              </select>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-1.5">
            <label
              htmlFor="proj-summary"
              className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Ringkasan Singkat (Summary) <span className="text-rose-500">*</span>
            </label>
            <input
              id="proj-summary"
              type="text"
              placeholder="Deskripsi singkat yang tampil pada kartu galeri..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-sans text-sm bg-white dark:bg-zinc-950 focus:border-emerald-500 focus:outline-none"
            />
            {errors.summary && (
              <p className="text-xs font-mono text-rose-500">{errors.summary}</p>
            )}
          </div>

          {/* Story */}
          <div className="space-y-1.5">
            <label
              htmlFor="proj-story"
              className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Latar Belakang &amp; Cerita Engineering (Story) <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="proj-story"
              rows={5}
              placeholder="Jelaskan masalah yang diselesaikan, arsitektur yang dipilih, serta tantangan teknis yang berhasil diatasi..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-sans text-sm bg-white dark:bg-zinc-950 focus:border-emerald-500 focus:outline-none leading-relaxed"
            />
            {errors.story && (
              <p className="text-xs font-mono text-rose-500">{errors.story}</p>
            )}
          </div>

          {/* Technologies Tag Input */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
              Teknologi / Stack yang Dipakai <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ketik nama teknologi (misal: Docker) lalu tekan Tambah..."
                value={newTechInput}
                onChange={(e) => setNewTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                className="flex-1 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs bg-white dark:bg-zinc-950 focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-500 hover:text-white dark:hover:text-zinc-950 font-mono text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah</span>
              </button>
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono text-xs"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="p-0.5 hover:text-rose-500"
                    title={`Hapus ${tech}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            {errors.technologies && (
              <p className="text-xs font-mono text-rose-500">{errors.technologies}</p>
            )}
          </div>

          {/* URLs: Demo & Repo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="proj-demo"
                className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Tautan Demo (URL)
              </label>
              <input
                id="proj-demo"
                type="url"
                placeholder="https://demo.project.dev"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs bg-white dark:bg-zinc-950 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="proj-repo"
                className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Tautan Repositori / Kode (URL)
              </label>
              <input
                id="proj-repo"
                type="url"
                placeholder="https://github.com/developer/project"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs bg-white dark:bg-zinc-950 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Thumbnail URL & Live Preview */}
          <div className="space-y-2">
            <label
              htmlFor="proj-thumb"
              className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
            >
              URL Gambar Sampul (Thumbnail) <span className="text-rose-500">*</span>
            </label>
            <input
              id="proj-thumb"
              type="url"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs bg-white dark:bg-zinc-950 focus:border-emerald-500 focus:outline-none"
            />

            {/* Thumbnail Preview */}
            {thumbnailUrl && (
              <div className="relative w-full max-w-sm h-40 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 mt-2">
                <Image
                  src={thumbnailUrl}
                  alt="Pratinjau Sampul"
                  fill
                  className="object-cover"
                  sizes="400px"
                />
                <span className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 text-white font-mono text-[10px] backdrop-blur-sm">
                  Pratinjau Sampul
                </span>
              </div>
            )}
          </div>

          {/* Settings: Featured, Order, Stars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            {/* Featured toggle */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
              <input
                id="proj-featured"
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="proj-featured" className="cursor-pointer">
                <div className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
                  Project Unggulan
                </div>
                <div className="text-[10px] text-zinc-500">
                  Sorot di beranda utama
                </div>
              </label>
            </div>

            {/* Sort Order */}
            <div className="space-y-1">
              <label
                htmlFor="proj-order"
                className="block text-xs font-mono text-zinc-500 dark:text-zinc-400"
              >
                Urutan Tampil (Sort Order)
              </label>
              <input
                id="proj-order"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs bg-white dark:bg-zinc-950"
              />
            </div>

            {/* Stars */}
            <div className="space-y-1">
              <label
                htmlFor="proj-stars"
                className="block text-xs font-mono text-zinc-500 dark:text-zinc-400"
              >
                GitHub Stars (Simulasi)
              </label>
              <input
                id="proj-stars"
                type="number"
                value={stars}
                onChange={(e) => setStars(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs bg-white dark:bg-zinc-950"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin"
            className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-mono text-xs transition-colors"
          >
            Batal
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-mono font-bold text-xs transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEdit ? "Simpan Perubahan" : "Buat Project"}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
