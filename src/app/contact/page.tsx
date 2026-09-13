import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Terminal,
  Mail,
  Send,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowLeft,
  ExternalLink,
  MessageSquare,
  Sparkles,
  GitBranch,
  Globe,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SocialLinksList from "@/components/SocialLinksList";
import { MOCK_CONTACT } from "@/data/mockContact";

export const metadata: Metadata = {
  title: "Hubungi Saya — Kontak & Kolaborasi | Portofolio Dev Kece",
  description:
    "Hubungi M. Zainul Arifin untuk peluang kolaborasi pengembangan web, konsultasi arsitektur sistem Next.js & Go, atau penawaran proyek rekayasa perangkat lunak.",
};

export default function ContactPage() {
  const contact = MOCK_CONTACT;

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
              main@contact
            </span>
            <span className="hidden md:inline-block">
              ~/portfolio/pages/contact.md
            </span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-10 shadow-sm backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Status: {contact.availability}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-mono text-zinc-900 dark:text-zinc-100">
              Mari Berbicara &amp; <span className="text-emerald-600 dark:text-emerald-400">Berkolaborasi</span>
            </h1>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
              Punya ide produk menarik, ingin mendiskusikan arsitektur sistem web skala besar, atau mencari full-stack software engineer untuk memperkuat tim Anda? Saya selalu menyambut percakapan baru dengan senang hati.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-zinc-400">Waktu Respon</div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">{contact.responseTime}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-zinc-400">Zona Waktu</div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">{contact.timezone}</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-zinc-400">Lokasi Basis</div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">{contact.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Contact Channels Grid */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100">
                Saluran Komunikasi Utama
              </h2>
              <p className="text-xs font-mono text-zinc-400">
                // Pilih metode tercepat dan paling nyaman bagi Anda
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contact.channels.map((channel) => (
              <div
                key={channel.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-sm hover:shadow-md group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                      {channel.id === "email" && <Mail className="w-5 h-5" />}
                      {channel.id === "telegram" && <Send className="w-5 h-5" />}
                      {channel.id === "consultation" && <Calendar className="w-5 h-5" />}
                    </div>
                    {channel.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {channel.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                      {channel.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                      {channel.description}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 font-mono text-xs text-zinc-800 dark:text-zinc-200 select-all truncate">
                    {channel.value}
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800/50">
                  <a
                    href={channel.actionUrl}
                    target={channel.actionUrl.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-zinc-950 text-zinc-800 dark:text-zinc-200 font-mono font-bold text-xs transition-all"
                  >
                    <span>{channel.actionLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Media & Professional Network Links */}
        <SocialLinksList links={contact.socialLinks} />

        {/* Developer Terminal Snippet & Security Info */}
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-mono text-zinc-900 dark:text-zinc-100">
                Developer API &amp; Terminal Quick Ping
              </h2>
              <span className="text-xs font-mono text-zinc-400">
                // Hubungi atau tes pesan langsung via HTTP cURL client
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-zinc-950 p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-zinc-500 text-[11px]">
                <span>bash — curl request</span>
                <span className="text-emerald-400">endpoint: POST /api/contact</span>
              </div>
              <pre className="text-emerald-400 leading-relaxed">
{`curl -X POST https://portfolio.dev/api/contact \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Nama Anda",
    "email": "nama@domain.com",
    "subject": "Diskusi Proyek Web",
    "message": "Halo Zainul, kami ingin berdiskusi mengenai proyek..."
  }'`}
              </pre>
            </div>

            {/* PGP Security Details */}
            {contact.pgpFingerprint && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200">PGP Key ID: </span>
                    <span>{contact.pgpKeyId}</span>
                  </div>
                </div>
                <div className="text-[10px] text-zinc-400 break-all select-all">
                  Fingerprint: {contact.pgpFingerprint}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer Collaboration Banner */}
        <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-100 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Pekerjaan Kustom &amp; Kontrak</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-mono">
              Siap Memulai Proyek Bersama?
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              Kirimkan brief singkat atau deskripsi ide Anda. Saya akan meninjau dan merespon kembali dengan estimasi solusi teknis dalam 24 jam.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`mailto:${contact.email}`}
              className="px-6 py-3 rounded-xl bg-white text-zinc-950 hover:bg-emerald-50 font-mono font-bold text-xs transition-all shadow-lg flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Kirim Email Langsung →</span>
            </a>
          </div>
        </section>
      </main>

      {/* Terminal-Inspired Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 py-8 text-center text-xs font-mono text-zinc-500 dark:text-zinc-400 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
            <span>~/portfolio (main) — Dibuat dengan dedikasi &amp; kopi</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Powered by Next.js &amp; Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
