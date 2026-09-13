"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ExternalLink, Code2, Star, Calendar, Layers, Terminal, ArrowRight } from "lucide-react";
import { Project } from "@/types/project";

interface QuickPreviewModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickPreviewModal({
  project,
  isOpen,
  onClose,
}: QuickPreviewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Dialog Container */}
      <div
        className="relative w-full max-w-3xl rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden ring-1 ring-emerald-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950/90 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="ml-2 text-zinc-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              quick-preview: {project.slug}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup pratinjau"
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body with Scroll */}
        <div className="max-h-[80vh] overflow-y-auto p-6 space-y-6">
          {/* Thumbnail preview */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-inner">
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
            <div className="absolute top-3 right-3 flex items-center gap-2">
              {project.isFeatured && (
                <span className="flex items-center gap-1 text-xs font-mono font-medium text-emerald-300 bg-zinc-950/90 border border-emerald-500/50 px-2.5 py-1 rounded-full shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                  Unggulan
                </span>
              )}
              <span className="text-xs font-mono text-zinc-300 bg-zinc-950/90 px-2.5 py-1 rounded-full border border-zinc-700">
                {project.stats?.status || "Live"}
              </span>
            </div>
          </div>

          {/* Title & Info */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
              <span className="text-emerald-400 font-semibold">{project.role}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(project.createdAt).toLocaleDateString("id-ID", {
                  month: "long",
                  year: "numeric"
                })}
              </span>
            </div>

            <h2 className="text-2xl font-bold font-mono text-zinc-100 mb-3">
              {project.title}
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h4 className="text-xs font-mono uppercase text-zinc-400 font-semibold mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Teknologi
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-950 text-emerald-300 border border-zinc-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <Link
              href={`/project/${project.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Halaman Detail Lengkap <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono font-bold text-xs transition-colors shadow-md shadow-emerald-500/20"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs border border-zinc-700 transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
