"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Terminal,
  Sparkles,
  RefreshCw,
  Mail,
  User,
  MessageSquare,
  FileText,
} from "lucide-react";
import { ContactMessagePayload } from "@/types/contact";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactMessageForm() {
  const [formData, setFormData] = useState<ContactMessagePayload>({
    name: "",
    email: "",
    subject: "",
    category: "project",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState<string>("");

  const categories = [
    { id: "project", label: "Proyek Baru / Web App", icon: "🚀" },
    { id: "consultation", label: "Konsultasi Arsitektur", icon: "💡" },
    { id: "hire", label: "Tawaran Tim / Kontrak", icon: "💼" },
    { id: "general", label: "Diskusi Santai / Tanya", icon: "💬" },
  ] as const;

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = "Nama lengkap wajib diisi";
    } else if (formData.name.trim().length < 2) {
      errs.name = "Nama minimal 2 karakter";
    }

    if (!formData.email.trim()) {
      errs.email = "Alamat surel / email wajib diisi";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errs.email = "Format alamat email tidak valid";
      }
    }

    if (!formData.subject.trim()) {
      errs.subject = "Subjek pesan wajib diisi";
    }

    if (!formData.message.trim()) {
      errs.message = "Pesan detail wajib diisi";
    } else if (formData.message.trim().length < 15) {
      errs.message = "Pesan minimal 15 karakter agar konteks jelas";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStep("Validasi skema payload...");

    // Simulated network submit with realistic step indicators
    await new Promise((resolve) => setTimeout(resolve, 350));
    setSubmitStep("Mengirim paket via HTTPS POST /api/contact...");

    await new Promise((resolve) => setTimeout(resolve, 450));
    setSubmitStep("Memverifikasi handshake penerima...");

    await new Promise((resolve) => setTimeout(resolve, 300));

    // Generate random ticket ID
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    const id = `MSG-${Date.now().toString().slice(-4)}-${randomHex}`;
    setTicketId(id);

    setIsSubmitting(false);
    setIsSuccess(true);
    setSubmitStep("");
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "project",
      message: "",
    });
    setErrors({});
    setIsSuccess(false);
    setTicketId("");
  };

  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-10 shadow-sm backdrop-blur-md relative overflow-hidden">
      {/* Terminal Window Top Bar */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 pl-2">
            contact-dispatcher.ts — form-submission
          </span>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          <Terminal className="w-3 h-3" />
          <span>endpoint: ready</span>
        </span>
      </div>

      {isSuccess ? (
        /* Success State */
        <div className="py-8 text-center space-y-6 max-w-lg mx-auto animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              Pesan Berhasil Terkirim!
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
              Terima kasih telah menghubungi, <span className="font-semibold text-zinc-900 dark:text-zinc-100">{formData.name}</span>. Saya telah menerima pesan Anda dan akan merespon kembali via <span className="font-mono text-emerald-600 dark:text-emerald-400">{formData.email}</span> dalam kurun waktu 24 jam.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-left font-mono text-xs space-y-1.5">
            <div className="flex justify-between text-zinc-400 text-[11px]">
              <span>TIKET PENGIRIMAN:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{ticketId}</span>
            </div>
            <div className="text-zinc-700 dark:text-zinc-300 truncate">
              Subjek: {formData.subject}
            </div>
            <div className="text-zinc-500 text-[11px]">
              Kategori: {categories.find((c) => c.id === formData.category)?.label}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-zinc-950 text-zinc-800 dark:text-zinc-200 font-mono font-bold text-xs transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Kirim Pesan Lainnya</span>
          </button>
        </div>
      ) : (
        /* Contact Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              Kirim Pesan Langsung
            </h2>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              // Isi formulir di bawah ini untuk memulai percakapan proyek
            </p>
          </div>

          {/* Category Badges Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
              Kategori Keperluan:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={`p-3 rounded-xl border text-left font-mono text-xs transition-all flex flex-col justify-between gap-1.5 ${
                    formData.category === cat.id
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-sm"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className="font-semibold">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid Inputs: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-name"
                className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Contoh: Alex Pratama"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border font-sans text-sm bg-white dark:bg-zinc-950 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                    errors.name
                      ? "border-rose-500 text-rose-600 dark:text-rose-400"
                      : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-xs font-mono text-rose-500 flex items-center gap-1 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-email"
                className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Alamat Surel / Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="alex@perusahaan.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border font-sans text-sm bg-white dark:bg-zinc-950 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                    errors.email
                      ? "border-rose-500 text-rose-600 dark:text-rose-400"
                      : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-mono text-rose-500 flex items-center gap-1 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Subject Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-subject"
              className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
            >
              Subjek Diskusi <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <FileText className="w-4 h-4" />
              </div>
              <input
                id="contact-subject"
                type="text"
                placeholder="Contoh: Rancang Arsitektur E-Commerce Next.js"
                value={formData.subject}
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                  if (errors.subject) setErrors({ ...errors, subject: undefined });
                }}
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl border font-sans text-sm bg-white dark:bg-zinc-950 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                  errors.subject
                    ? "border-rose-500 text-rose-600 dark:text-rose-400"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500"
                }`}
              />
            </div>
            {errors.subject && (
              <p className="text-xs font-mono text-rose-500 flex items-center gap-1 pt-0.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.subject}</span>
              </p>
            )}
          </div>

          {/* Message Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="contact-message"
                className="block text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300"
              >
                Pesan / Deskripsi Proyek <span className="text-rose-500">*</span>
              </label>
              <span className="font-mono text-[11px] text-zinc-400">
                {formData.message.length} karakter
              </span>
            </div>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Ceritakan gambaran kebutuhan proyek Anda, timeline yang ditargetkan, atau pertanyaan teknis..."
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: undefined });
              }}
              className={`w-full p-3.5 rounded-xl border font-sans text-sm bg-white dark:bg-zinc-950 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-y leading-relaxed ${
                errors.message
                  ? "border-rose-500 text-rose-600 dark:text-rose-400"
                  : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500"
              }`}
            />
            {errors.message && (
              <p className="text-xs font-mono text-rose-500 flex items-center gap-1 pt-0.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* Submit Step Indicator or Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{submitStep}</span>
                </span>
              ) : (
                <span>Waktu estimasi respon: &lt; 24 jam kerja</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-mono font-bold text-xs transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengirimkan Pesan...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan Sekarang</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
