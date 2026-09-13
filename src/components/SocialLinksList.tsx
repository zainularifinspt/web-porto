"use client";

import React, { useState } from "react";
import { ExternalLink, Copy, Check, Share2, Sparkles } from "lucide-react";
import { SocialLink } from "@/types/contact";
import { MOCK_CONTACT } from "@/data/mockContact";

interface SocialLinksListProps {
  links?: SocialLink[];
  title?: string;
  subtitle?: string;
  className?: string;
  compact?: boolean;
}

export default function SocialLinksList({
  links = MOCK_CONTACT.socialLinks,
  title = "Jaringan & Sosial Media",
  subtitle = "// Terhubung di ekosistem komunitas developer dan platform profesional",
  className = "",
  compact = false,
}: SocialLinksListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Render SVG icons with matching platform logos
  const renderPlatformIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("github")) {
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    }
    if (p.includes("linkedin")) {
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
        </svg>
      );
    }
    if (p.includes("twitter") || p.includes("x")) {
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    }
    if (p.includes("discord")) {
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      );
    }
    return <Share2 className="w-5 h-5" />;
  };

  return (
    <section className={`space-y-4 ${className}`}>
      {/* Header */}
      {!compact && (
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {title}
              </h2>
              <p className="text-xs font-mono text-zinc-400">{subtitle}</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400">
            <span>total: {links.length} profiles</span>
          </span>
        </div>
      )}

      {/* Grid of Social Cards */}
      <div
        className={`grid gap-4 ${
          compact
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
        }`}
      >
        {links.map((link) => (
          <div
            key={link.id}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-md transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-500 group-hover:scale-105 transition-all">
                    {renderPlatformIcon(link.platform)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-mono font-bold text-sm text-zinc-900 dark:text-zinc-100">
                        {link.platform}
                      </h3>
                      {link.isPrimary && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Utama
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {link.handle}
                    </span>
                  </div>
                </div>

                {/* Copy handle button */}
                <button
                  onClick={() => handleCopy(link.id, link.url)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  title="Salin tautan profil"
                  aria-label={`Salin tautan ${link.platform}`}
                >
                  {copiedId === link.id ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                      Tersalin!
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                {link.description}
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400">
                {link.url.replace(/^https?:\/\//, "")}
              </span>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-zinc-950 font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <span>Kunjungi</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
