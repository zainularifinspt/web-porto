"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Save,
  RotateCcw,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  MapPin,
  Briefcase,
  Code2,
  Award,
  TrendingUp,
  Plus,
  Trash2,
  Camera,
  Terminal,
  Layers,
  Globe,
  Eye,
  Check,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}
import { AboutProfile } from "@/types/about";
import { MOCK_ABOUT } from "@/data/mockAbout";
import ProfileCard from "@/components/ProfileCard";
import ToastNotification, { ToastType } from "@/components/ToastNotification";

export default function AdminProfilePage() {
  const [profileData, setProfileData] = useState<AboutProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // Form Fields
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [avatarFallback, setAvatarFallback] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  // Stats
  const [yearsOfExperience, setYearsOfExperience] = useState<number | string>(4);
  const [completedProjects, setCompletedProjects] = useState<number | string>(28);
  const [codeCommits, setCodeCommits] = useState("3.4k+");
  const [clientSatisfaction, setClientSatisfaction] = useState("99.4%");

  // Bio Paragraphs
  const [bioParagraphs, setBioParagraphs] = useState<string[]>([]);

  // Validation & Feedback
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
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

  // Populate form with profile data
  const populateForm = (data: AboutProfile) => {
    setName(data.name || "");
    setHeadline(data.headline || "");
    setPhotoUrl(data.photoUrl || "");
    setAvatarFallback(data.avatarFallback || "ZA");
    setStatus(data.status || "Tersedia untuk Proyek Baru & Kolaborasi");
    setLocation(data.location || "Indonesia");
    setEmail(data.email || "");
    setGithubUrl(data.githubUrl || "");
    setLinkedinUrl(data.linkedinUrl || "");

    if (data.stats) {
      setYearsOfExperience(data.stats.yearsOfExperience ?? 4);
      setCompletedProjects(data.stats.completedProjects ?? 28);
      setCodeCommits(data.stats.codeCommits || "3.4k+");
      setClientSatisfaction(data.stats.clientSatisfaction || "99.4%");
    }

    setBioParagraphs(Array.isArray(data.bio) && data.bio.length > 0 ? [...data.bio] : [""]);
  };

  // Fetch initial profile data
  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((res) => {
        if (res && res.success && res.data) {
          setProfileData(res.data);
          populateForm(res.data);
        } else {
          setProfileData(MOCK_ABOUT);
          populateForm(MOCK_ABOUT);
        }
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
        setProfileData(MOCK_ABOUT);
        populateForm(MOCK_ABOUT);
      })
      .finally(() => {
        setIsLoading(false);
        setIsDirty(false);
      });
  }, []);

  // Track dirty changes
  const markDirty = () => {
    if (!isLoading) setIsDirty(true);
  };

  // Bio paragraph helpers
  const handleParagraphChange = (index: number, value: string) => {
    markDirty();
    setBioParagraphs((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleAddParagraph = () => {
    markDirty();
    setBioParagraphs((prev) => [...prev, ""]);
  };

  const handleRemoveParagraph = (index: number) => {
    markDirty();
    setBioParagraphs((prev) => {
      if (prev.length <= 1) return [""];
      return prev.filter((_, i) => i !== index);
    });
  };

  // Reset form to last loaded or mock
  const handleReset = () => {
    if (confirm("Kembalikan perubahan form ke data terakhir yang tersimpan?")) {
      if (profileData) {
        populateForm(profileData);
      } else {
        populateForm(MOCK_ABOUT);
      }
      setIsDirty(false);
      setErrors({});
      setToast({
        isOpen: true,
        type: "info",
        title: "Form Direset",
        message: "Perubahan belum tersimpan telah dibatalkan.",
      });
    }
  };

  // Validate form
  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!name.trim()) {
      errs.name = "Nama lengkap wajib diisi";
    }
    if (!headline.trim()) {
      errs.headline = "Headline / spesialisasi wajib diisi";
    }
    if (!email.trim()) {
      errs.email = "Email kontak wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Format email tidak valid";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle submit to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setToast({
        isOpen: true,
        type: "error",
        title: "Periksa Formulir",
        message: "Harap perbaiki bidang yang belum valid sebelum menyimpan.",
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      headline: headline.trim(),
      photoUrl: photoUrl.trim(),
      avatarFallback: avatarFallback.trim().toUpperCase() || name.slice(0, 2).toUpperCase(),
      status: status.trim(),
      location: location.trim(),
      email: email.trim(),
      githubUrl: githubUrl.trim(),
      linkedinUrl: linkedinUrl.trim(),
      stats: {
        yearsOfExperience: Number(yearsOfExperience) || 0,
        completedProjects: Number(completedProjects) || 0,
        codeCommits: String(codeCommits).trim() || "1k+",
        clientSatisfaction: String(clientSatisfaction).trim() || "100%",
      },
      bio: bioParagraphs.filter((p) => p.trim().length > 0),
    };

    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.success && json.data) {
        setProfileData(json.data);
        populateForm(json.data);
        setIsDirty(false);

        setToast({
          isOpen: true,
          type: "success",
          title: "Profil Berhasil Diperbarui!",
          message: "Data profil Anda telah tersimpan secara langsung ke database.",
        });
      } else {
        throw new Error(json.error || "Gagal menyimpan profil");
      }
    } catch (err: any) {
      console.error("Save profile error:", err);
      setToast({
        isOpen: true,
        type: "error",
        title: "Gagal Menyimpan",
        message: err.message || "Terjadi kesalahan saat menyimpan data profil.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Construct preview data
  const currentPreviewData: AboutProfile = {
    name: name || "M. Zainul Arifin",
    headline: headline || "Full-Stack Software Engineer & Web Architect",
    bio: bioParagraphs.filter((p) => p.trim().length > 0).length > 0
      ? bioParagraphs.filter((p) => p.trim().length > 0)
      : profileData?.bio || MOCK_ABOUT.bio,
    photoUrl: photoUrl || (profileData?.photoUrl ?? MOCK_ABOUT.photoUrl),
    avatarFallback: avatarFallback || "ZA",
    status: status || "Open for Work",
    location: location || "Indonesia",
    email: email || "zainul@developer.dev",
    githubUrl: githubUrl || "https://github.com",
    linkedinUrl: linkedinUrl || "https://linkedin.com",
    stats: {
      yearsOfExperience: Number(yearsOfExperience) || 4,
      completedProjects: Number(completedProjects) || 28,
      codeCommits: String(codeCommits) || "3.4k+",
      clientSatisfaction: String(clientSatisfaction) || "99.4%",
    },
    skills: profileData?.skills || MOCK_ABOUT.skills,
    experiences: profileData?.experiences || MOCK_ABOUT.experiences,
    education: profileData?.education || MOCK_ABOUT.education,
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
          Memuat data profil dari database...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Toast Notification */}
      <ToastNotification
        isOpen={toast.isOpen}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>~ / admin / profile-editor</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-zinc-500 dark:text-zinc-400">Neon PostgreSQL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
            Pengaturan Profil Pribadi
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Edit identitas, foto profil, deskripsi bio, statistik metrik, dan kontak yang tampil di halaman Tentang Saya (`/about`).
          </p>
        </div>

        {/* Quick Actions Header */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/about"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 transition-all shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Buka /about</span>
          </Link>

          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-xl border transition-all shadow-xs ${
              showPreview
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showPreview ? "Sembunyikan Preview" : "Tampilkan Preview"}</span>
          </button>
        </div>
      </div>

      {/* Live Preview Card Section */}
      {showPreview && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              PRATINJAU LANGSUNG (LIVE PREVIEW HASIL DI WEBSITE)
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              Otomatis terbarui saat form diketik
            </span>
          </div>
          <div className="p-1 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-transparent">
            <ProfileCard profile={currentPreviewData} showBio={false} showMetrics={true} />
          </div>
        </div>
      )}

      {/* Main Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Identitas & Foto */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2.5 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">
                1. Identitas & Foto Profil
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                Informasi utama yang tampil di kartu profil dan terminal header
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Lengkap */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: M. Zainul Arifin"
                className={`w-full px-4 py-2.5 rounded-xl border bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all ${
                  errors.name ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                }`}
              />
              {errors.name && <p className="text-xs text-rose-500 font-mono">{errors.name}</p>}
            </div>

            {/* Headline / Spesialisasi */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                Headline / Spesialisasi Jabatan <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => {
                  setHeadline(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: Full-Stack Software Engineer & Web Architect"
                className={`w-full px-4 py-2.5 rounded-xl border bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all ${
                  errors.headline ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                }`}
              />
              {errors.headline && <p className="text-xs text-rose-500 font-mono">{errors.headline}</p>}
            </div>

            {/* URL Foto Profil */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                  URL Foto Profil (Direct Image Link)
                </label>
                <span className="text-[11px] font-mono text-zinc-400">
                  Bisa menggunakan Unsplash, GitHub Avatar, Imgur, Cloudinary, dll
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                    markDirty();
                  }}
                  placeholder="https://images.unsplash.com/... atau link foto online Anda"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all"
                />
              </div>
            </div>

            {/* Status Ketersediaan */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                Status Ketersediaan (Badge)
              </label>
              <input
                type="text"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: Tersedia untuk Proyek Baru & Kolaborasi"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all"
              />
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                Jika berisi kata &quot;Tersedia&quot;, indikator akan berwarna hijau &quot;Open for Work&quot;.
              </p>
            </div>

            {/* Avatar Fallback */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                Inisial Avatar (Fallback jika foto kosong/gagal muat)
              </label>
              <input
                type="text"
                maxLength={4}
                value={avatarFallback}
                onChange={(e) => {
                  setAvatarFallback(e.target.value.toUpperCase());
                  markDirty();
                }}
                placeholder="Contoh: ZA"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 uppercase transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Kontak & Media Sosial */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2.5 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">
                2. Kontak & Media Sosial
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                Alamat email, domisili, serta tautan profil GitHub dan LinkedIn
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Publik */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                Email Publik <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    markDirty();
                  }}
                  placeholder="Contoh: mzainul.arifin@ulm.ac.id"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all ${
                    errors.email ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-rose-500 font-mono">{errors.email}</p>}
            </div>

            {/* Lokasi */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                Lokasi / Domisili
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    markDirty();
                  }}
                  placeholder="Contoh: Banjarmasin, Indonesia (WIB / UTC+7)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all"
                />
              </div>
            </div>

            {/* GitHub URL */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                URL Profil GitHub
              </label>
              <div className="relative">
                <GithubIcon className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => {
                    setGithubUrl(e.target.value);
                    markDirty();
                  }}
                  placeholder="https://github.com/username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all"
                />
              </div>
            </div>

            {/* LinkedIn URL */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                URL Profil LinkedIn
              </label>
              <div className="relative">
                <LinkedinIcon className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => {
                    setLinkedinUrl(e.target.value);
                    markDirty();
                  }}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Statistik Portofolio */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2.5 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">
                3. Statistik Portofolio (Counter Metrics)
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                4 kotak metrik statistik pencapaian di kartu profil
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Tahun Pengalaman */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                Tahun Pengalaman
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={yearsOfExperience}
                  onChange={(e) => {
                    setYearsOfExperience(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all"
                />
                <span className="absolute right-3.5 top-3 text-xs font-mono text-zinc-400">
                  Tahun+
                </span>
              </div>
            </div>

            {/* Project Selesai */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                Project Selesai
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="999"
                  value={completedProjects}
                  onChange={(e) => {
                    setCompletedProjects(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all"
                />
                <span className="absolute right-3.5 top-3 text-xs font-mono text-zinc-400">
                  Apps
                </span>
              </div>
            </div>

            {/* Kontribusi Commits */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                Kontribusi Commits
              </label>
              <input
                type="text"
                value={codeCommits}
                onChange={(e) => {
                  setCodeCommits(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: 3.4k+"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all"
              />
            </div>

            {/* Kepuasan Klien */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                Kepuasan Klien
              </label>
              <input
                type="text"
                value={clientSatisfaction}
                onChange={(e) => {
                  setClientSatisfaction(e.target.value);
                  markDirty();
                }}
                placeholder="Contoh: 99.4%"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Filosofi & Narasi Bio */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">
                  4. Filosofi & Pendekatan Engineering (Bio)
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  Cerita singkat tentang bagaimana Anda membangun aplikasi dan filosofi kerja Anda
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddParagraph}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Paragraf</span>
            </button>
          </div>

          <div className="space-y-4">
            {bioParagraphs.map((para, idx) => (
              <div key={idx} className="relative group flex gap-3 items-start">
                <div className="mt-2.5 w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center text-xs font-mono font-semibold shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <textarea
                    rows={3}
                    value={para}
                    onChange={(e) => handleParagraphChange(idx, e.target.value)}
                    placeholder={`Tulis paragraf ke-${idx + 1}...`}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 transition-all leading-relaxed"
                  />
                </div>
                {bioParagraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveParagraph(idx)}
                    title="Hapus paragraf ini"
                    className="mt-2 p-2 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="sticky bottom-4 z-30 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isDirty ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
              }`}
            />
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-300">
              {isDirty
                ? "Ada perubahan formulir yang belum disimpan!"
                : "Semua data profil sudah tersinkronisasi dengan database."}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-mono font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-mono font-bold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
