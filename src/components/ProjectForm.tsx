"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
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
  Info,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { Project } from "@/types/project";
import ToastNotification, { ToastType } from "@/components/ToastNotification";

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

  // Form Fields
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

  // Validation & Touched States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Toast Notification State
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

  // Track dirty changes
  useEffect(() => {
    setIsDirty(true);
  }, [
    title,
    slug,
    summary,
    story,
    role,
    demoUrl,
    repoUrl,
    thumbnailUrl,
    isFeatured,
    sortOrder,
    status,
    stars,
    technologies,
  ]);

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
    if (touched.title) {
      validateField("title", val);
    }
  };

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateField = (field: string, value: any): string => {
    let error = "";
    switch (field) {
      case "title":
        if (!value || !value.trim()) {
          error = "Judul project wajib diisi.";
        } else if (value.trim().length < 3) {
          error = "Judul minimal 3 karakter.";
        } else if (value.trim().length > 100) {
          error = "Judul maksimal 100 karakter.";
        }
        break;
      case "slug":
        if (!value || !value.trim()) {
          error = "Slug URL project wajib diisi.";
        } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.trim())) {
          error = "Format slug tidak valid (hanya huruf kecil, angka, dan tanda minus '-').";
        }
        break;
      case "summary":
        if (!value || !value.trim()) {
          error = "Ringkasan project wajib diisi.";
        } else if (value.trim().length < 10) {
          error = "Ringkasan minimal 10 karakter.";
        } else if (value.trim().length > 250) {
          error = "Ringkasan maksimal 250 karakter.";
        }
        break;
      case "story":
        if (!value || !value.trim()) {
          error = "Latar belakang & cerita arsitektur wajib diisi.";
        } else if (value.trim().length < 30) {
          error = "Cerita engineering minimal 30 karakter agar informatif.";
        }
        break;
      case "role":
        if (!value || !value.trim()) {
          error = "Peran pengembang wajib diisi.";
        }
        break;
      case "thumbnailUrl":
        if (!value || !value.trim()) {
          error = "URL gambar sampul wajib diisi.";
        } else if (
          !value.startsWith("http://") &&
          !value.startsWith("https://") &&
          !value.startsWith("/")
        ) {
          error = "URL sampul harus diawali dengan https:// atau path / (misal: /images/...).";
        }
        break;
      case "demoUrl":
        if (
          value &&
          value.trim() &&
          !value.startsWith("http://") &&
          !value.startsWith("https://")
        ) {
          error = "URL demo harus diawali dengan http:// atau https://";
        }
        break;
      case "repoUrl":
        if (
          value &&
          value.trim() &&
          !value.startsWith("http://") &&
          !value.startsWith("https://")
        ) {
          error = "URL repositori harus diawali dengan http:// atau https://";
        }
        break;
      case "technologies":
        if (!Array.isArray(value) || value.length === 0) {
          error = "Tambahkan minimal 1 teknologi untuk label stack.";
        }
        break;
      case "sortOrder":
        if (isNaN(Number(value)) || Number(value) < 1) {
          error = "Urutan tampil harus berupa angka bulat positif (≥ 1).";
        }
        break;
      case "stars":
        if (isNaN(Number(value)) || Number(value) < 0) {
          error = "Jumlah GitHub stars tidak boleh negatif.";
        }
        break;
    }

    setErrors((prev) => {
      const updated = { ...prev };
      if (error) {
        updated[field] = error;
      } else {
        delete updated[field];
      }
      return updated;
    });

    return error;
  };

  const handleAddTech = () => {
    const trimmed = newTechInput.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      const updated = [...technologies, trimmed];
      setTechnologies(updated);
      setNewTechInput("");
      validateField("technologies", updated);
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    const updated = technologies.filter((t) => t !== techToRemove);
    setTechnologies(updated);
    validateField("technologies", updated);
  };

  const validateAll = (): boolean => {
    const errs: Record<string, string> = {};
    const eTitle = validateField("title", title);
    if (eTitle) errs.title = eTitle;

    const eSlug = validateField("slug", slug);
    if (eSlug) errs.slug = eSlug;

    const eSummary = validateField("summary", summary);
    if (eSummary) errs.summary = eSummary;

    const eStory = validateField("story", story);
    if (eStory) errs.story = eStory;

    const eRole = validateField("role", role);
    if (eRole) errs.role = eRole;

    const eThumb = validateField("thumbnailUrl", thumbnailUrl);
    if (eThumb) errs.thumbnailUrl = eThumb;

    const eDemo = validateField("demoUrl", demoUrl);
    if (eDemo) errs.demoUrl = eDemo;

    const eRepo = validateField("repoUrl", repoUrl);
    if (eRepo) errs.repoUrl = eRepo;

    const eTech = validateField("technologies", technologies);
    if (eTech) errs.technologies = eTech;

    const eSort = validateField("sortOrder", sortOrder);
    if (eSort) errs.sortOrder = eSort;

    const eStars = validateField("stars", stars);
    if (eStars) errs.stars = eStars;

    // Mark all as touched
    setTouched({
      title: true,
      slug: true,
      summary: true,
      story: true,
      role: true,
      thumbnailUrl: true,
      demoUrl: true,
      repoUrl: true,
      technologies: true,
      sortOrder: true,
      stars: true,
    });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateAll();

    if (!isValid) {
      setToast({
        isOpen: true,
        type: "error",
        title: "Validasi Formulir Gagal",
        message:
          "Mohon periksa kolom bertanda merah di bawah dan perbaiki isian data sebelum menyimpan.",
      });
      // Scroll to error summary
      const errBanner = document.getElementById("form-error-banner");
      if (errBanner) {
        errBanner.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    const projectPayload = {
      title: title.trim(),
      slug: slug.trim(),
      summary: summary.trim(),
      story: story.trim(),
      role: role.trim(),
      demoUrl: demoUrl.trim() || undefined,
      repoUrl: repoUrl.trim() || undefined,
      thumbnailUrl: thumbnailUrl.trim(),
      isFeatured,
      sortOrder: Number(sortOrder),
      technologies,
      stats: {
        status,
        stars: Number(stars),
        views,
      },
    };

    try {
      const endpoint =
        isEdit && (initialData?.slug || initialData?.id)
          ? `/api/projects/${initialData.slug || initialData.id}`
          : "/api/projects";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectPayload),
      });

      const resData = await res.json();

      if (!res.ok || !resData.success) {
        if (resData.validationErrors) {
          setErrors(resData.validationErrors);
        }
        setIsSubmitting(false);
        setToast({
          isOpen: true,
          type: "error",
          title: "Gagal Menyimpan",
          message: resData.error || "Gagal menyimpan data project ke database.",
        });
        return;
      }

      const savedProject: Project = resData.data || {
        ...projectPayload,
        id: initialData?.id || `proj-${Date.now()}`,
        createdAt: initialData?.createdAt || new Date().toISOString(),
      };

      setIsSubmitting(false);

      setToast({
        isOpen: true,
        type: "success",
        title: isEdit ? "Project Berhasil Diperbarui" : "Project Berhasil Ditambahkan",
        message: `Data untuk "${title}" telah disimpan ke katalog portofolio. Mengalihkan ke dashboard...`,
      });

      if (onSuccess) {
        onSuccess(savedProject);
      }

      setTimeout(() => {
        router.push("/admin");
      }, 1200);
    } catch {
      setIsSubmitting(false);
      setToast({
        isOpen: true,
        type: "error",
        title: "Koneksi Terputus",
        message: "Gagal terhubung ke API server. Periksa jaringan Anda.",
      });
    }
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification Container */}
      <ToastNotification
        isOpen={toast.isOpen}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Header & Back Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-mono text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Project</span>
        </Link>

        <div className="flex items-center gap-2">
          {isDirty && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Perubahan belum disimpan
            </span>
          )}
          <span className="font-mono text-xs text-zinc-400">
            mode: {isEdit ? "edit-project" : "create-project"}
          </span>
        </div>
      </div>

      {/* Form-level Error Alert Banner */}
      {errorCount > 0 && (
        <div
          id="form-error-banner"
          className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 font-mono text-xs space-y-3 shadow-sm animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Terdapat {errorCount} kesalahan pengisian formulir:</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 border border-rose-500/30">
              HTTP 422 Unprocessable Entity
            </span>
          </div>

          <ul className="list-disc list-inside space-y-1 text-[11px] text-rose-600 dark:text-rose-300/90 pl-1 font-sans">
            {Object.entries(errors).map(([key, msg]) => (
              <li key={key}>
                <span className="font-mono font-semibold">{key}</span>: {msg}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-8 backdrop-blur-md shadow-sm space-y-6">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {isEdit ? "Ubah Detail Project" : "Tambah Project Baru"}
              </h2>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
                // Lengkapi metadata, teknologi, dan tautan demo portofolio
              </p>
            </div>
            <div className="hidden sm:block">
              <span className="px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 font-mono text-[10px] text-zinc-500">
                * Kolom wajib diisi
              </span>
            </div>
          </div>

          {/* Grid Inputs: Title & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="proj-title"
                  className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Judul Project <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] font-mono text-zinc-400">
                  {title.length}/100
                </span>
              </div>
              <input
                id="proj-title"
                type="text"
                placeholder="Contoh: DevPulse Server Monitor"
                value={title}
                onChange={handleTitleChange}
                onBlur={() => {
                  markTouched("title");
                  validateField("title", title);
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border font-sans text-sm bg-white dark:bg-zinc-950 transition-colors focus:outline-none focus:ring-2 ${
                  errors.title && touched.title
                    ? "border-rose-500 text-rose-600 dark:text-rose-400 ring-rose-500/20"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 focus:ring-emerald-500/20"
                }`}
              />
              {errors.title && touched.title && (
                <p className="text-xs font-mono text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.title}</span>
                </p>
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
                  {isSlugCustom ? "Gunakan Auto-Slug" : "Edit Manual"}
                </button>
              </div>
              <input
                id="proj-slug"
                type="text"
                placeholder="devpulse-server-monitor"
                value={slug}
                disabled={!isSlugCustom}
                onChange={(e) => {
                  const val = generateSlug(e.target.value);
                  setSlug(val);
                  if (touched.slug) validateField("slug", val);
                }}
                onBlur={() => {
                  markTouched("slug");
                  validateField("slug", slug);
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border font-mono text-xs bg-zinc-50 dark:bg-zinc-950 focus:outline-none disabled:opacity-75 ${
                  errors.slug && touched.slug
                    ? "border-rose-500 text-rose-600 dark:text-rose-400 ring-rose-500/20"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500"
                }`}
              />
              {errors.slug && touched.slug && (
                <p className="text-xs font-mono text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.slug}</span>
                </p>
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
                onChange={(e) => {
                  setRole(e.target.value);
                  if (touched.role) validateField("role", e.target.value);
                }}
                onBlur={() => {
                  markTouched("role");
                  validateField("role", role);
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border font-sans text-sm bg-white dark:bg-zinc-950 focus:outline-none ${
                  errors.role && touched.role
                    ? "border-rose-500 text-rose-600 dark:text-rose-400"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500"
                }`}
              />
              {errors.role && touched.role && (
                <p className="text-xs font-mono text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.role}</span>
                </p>
              )}
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="proj-summary"
                className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Ringkasan Singkat (Summary) <span className="text-rose-500">*</span>
              </label>
              <span
                className={`text-[10px] font-mono ${
                  summary.length > 250
                    ? "text-rose-500 font-bold"
                    : summary.length > 220
                    ? "text-amber-500"
                    : "text-zinc-400"
                }`}
              >
                {summary.length}/250
              </span>
            </div>
            <input
              id="proj-summary"
              type="text"
              placeholder="Deskripsi singkat yang tampil pada kartu galeri beranda..."
              value={summary}
              onChange={(e) => {
                setSummary(e.target.value);
                if (touched.summary) validateField("summary", e.target.value);
              }}
              onBlur={() => {
                markTouched("summary");
                validateField("summary", summary);
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border font-sans text-sm bg-white dark:bg-zinc-950 focus:outline-none ${
                errors.summary && touched.summary
                  ? "border-rose-500 text-rose-600 dark:text-rose-400"
                  : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500"
              }`}
            />
            {errors.summary && touched.summary && (
              <p className="text-xs font-mono text-rose-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.summary}</span>
              </p>
            )}
          </div>

          {/* Story */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="proj-story"
                className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Latar Belakang &amp; Cerita Engineering (Story) <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] font-mono text-zinc-400">
                {story.length} karakter (min. 30)
              </span>
            </div>
            <textarea
              id="proj-story"
              rows={5}
              placeholder="Jelaskan masalah yang diselesaikan, arsitektur teknis yang dipilih, dan tantangan yang dipecahkan..."
              value={story}
              onChange={(e) => {
                setStory(e.target.value);
                if (touched.story) validateField("story", e.target.value);
              }}
              onBlur={() => {
                markTouched("story");
                validateField("story", story);
              }}
              className={`w-full p-3.5 rounded-xl border font-sans text-sm bg-white dark:bg-zinc-950 focus:outline-none leading-relaxed ${
                errors.story && touched.story
                  ? "border-rose-500 text-rose-600 dark:text-rose-400"
                  : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500"
              }`}
            />
            {errors.story && touched.story && (
              <p className="text-xs font-mono text-rose-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.story}</span>
              </p>
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
                placeholder="Ketik nama teknologi (misal: Docker, Redis) lalu tekan Tambah..."
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
                    className="p-0.5 hover:text-rose-500 transition-colors"
                    title={`Hapus ${tech}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            {errors.technologies && touched.technologies && (
              <p className="text-xs font-mono text-rose-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.technologies}</span>
              </p>
            )}
          </div>

          {/* URLs: Demo & Repo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="proj-demo"
                className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Tautan Demo Live (URL)
              </label>
              <input
                id="proj-demo"
                type="url"
                placeholder="https://demo.project.dev"
                value={demoUrl}
                onChange={(e) => {
                  setDemoUrl(e.target.value);
                  if (touched.demoUrl) validateField("demoUrl", e.target.value);
                }}
                onBlur={() => {
                  markTouched("demoUrl");
                  validateField("demoUrl", demoUrl);
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border font-mono text-xs bg-white dark:bg-zinc-950 focus:outline-none ${
                  errors.demoUrl && touched.demoUrl
                    ? "border-rose-500 text-rose-600 dark:text-rose-400"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500"
                }`}
              />
              {errors.demoUrl && touched.demoUrl && (
                <p className="text-xs font-mono text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.demoUrl}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="proj-repo"
                className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Tautan Repositori / GitHub (URL)
              </label>
              <input
                id="proj-repo"
                type="url"
                placeholder="https://github.com/developer/project"
                value={repoUrl}
                onChange={(e) => {
                  setRepoUrl(e.target.value);
                  if (touched.repoUrl) validateField("repoUrl", e.target.value);
                }}
                onBlur={() => {
                  markTouched("repoUrl");
                  validateField("repoUrl", repoUrl);
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border font-mono text-xs bg-white dark:bg-zinc-950 focus:outline-none ${
                  errors.repoUrl && touched.repoUrl
                    ? "border-rose-500 text-rose-600 dark:text-rose-400"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500"
                }`}
              />
              {errors.repoUrl && touched.repoUrl && (
                <p className="text-xs font-mono text-rose-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.repoUrl}</span>
                </p>
              )}
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
              type="text"
              placeholder="https://images.unsplash.com/... atau /images/cover.png"
              value={thumbnailUrl}
              onChange={(e) => {
                setThumbnailUrl(e.target.value);
                if (touched.thumbnailUrl) validateField("thumbnailUrl", e.target.value);
              }}
              onBlur={() => {
                markTouched("thumbnailUrl");
                validateField("thumbnailUrl", thumbnailUrl);
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border font-mono text-xs bg-white dark:bg-zinc-950 focus:outline-none ${
                errors.thumbnailUrl && touched.thumbnailUrl
                  ? "border-rose-500 text-rose-600 dark:text-rose-400"
                  : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500"
              }`}
            />
            {errors.thumbnailUrl && touched.thumbnailUrl && (
              <p className="text-xs font-mono text-rose-500 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.thumbnailUrl}</span>
              </p>
            )}

            {/* Thumbnail Preview */}
            {thumbnailUrl && (
              <div className="relative w-full max-w-sm h-44 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 mt-2">
                <Image
                  src={thumbnailUrl}
                  alt="Pratinjau Sampul"
                  fill
                  className="object-cover"
                  sizes="400px"
                  onError={() => {
                    setErrors((prev) => ({
                      ...prev,
                      thumbnailUrl: "URL gambar tidak dapat dimuat atau tidak valid.",
                    }));
                  }}
                />
                <span className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/70 text-white font-mono text-[10px] backdrop-blur-sm flex items-center gap-1">
                  <ImageIcon className="w-3 h-3 text-emerald-400" />
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
                <div className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                  <Star
                    className={`w-3.5 h-3.5 ${
                      isFeatured ? "text-amber-400 fill-amber-400" : "text-zinc-400"
                    }`}
                  />
                  Project Unggulan
                </div>
                <div className="text-[10px] text-zinc-500">
                  Sorot di beranda portofolio
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
                min="1"
                value={sortOrder}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSortOrder(val);
                  validateField("sortOrder", val);
                }}
                className={`w-full px-3 py-2 rounded-xl border font-mono text-xs bg-white dark:bg-zinc-950 ${
                  errors.sortOrder
                    ? "border-rose-500 text-rose-600"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500"
                }`}
              />
              {errors.sortOrder && (
                <p className="text-[10px] font-mono text-rose-500">{errors.sortOrder}</p>
              )}
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
                min="0"
                value={stars}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setStars(val);
                  validateField("stars", val);
                }}
                className={`w-full px-3 py-2 rounded-xl border font-mono text-xs bg-white dark:bg-zinc-950 ${
                  errors.stars
                    ? "border-rose-500 text-rose-600"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500"
                }`}
              />
              {errors.stars && (
                <p className="text-[10px] font-mono text-rose-500">{errors.stars}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/admin"
            className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-mono text-xs transition-colors"
          >
            Batal
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-mono font-bold text-xs transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan ke Database...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEdit ? "Simpan Perubahan" : "Simpan Project Baru"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
