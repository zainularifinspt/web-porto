"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Code2, Star, Eye, Terminal, ArrowUpRight, Sparkles } from "lucide-react";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  featuredOnly?: boolean;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-xl overflow-hidden border transition-all duration-300",
        "bg-zinc-900/80 hover:bg-zinc-900 border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-950/30",
        project.isFeatured && "ring-1 ring-emerald-500/20"
      )}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-zinc-800 bg-zinc-950/60 text-xs font-mono text-zinc-400">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block"></span>
          <span className="ml-2 text-zinc-400 truncate max-w-[140px] sm:max-w-none">
            {project.slug}.tsx
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {project.isFeatured && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
              Unggulan
            </span>
          )}
          {project.stats?.status && (
            <span className="hidden sm:inline-flex text-[10px] text-zinc-400 bg-zinc-800/60 px-1.5 py-0.5 rounded">
              {project.stats.status}
            </span>
          )}
        </div>
      </div>

      {/* Thumbnail with Hover Overlay & Quick Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
        {!imageError ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950/40 text-zinc-400 p-4">
            <Terminal className="w-10 h-10 text-emerald-400 mb-2 opacity-80" />
            <span className="font-mono text-xs text-zinc-400 text-center font-semibold">
              {project.title}
            </span>
          </div>
        )}

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Quick Preview Badge on Hover */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-[11px] font-mono text-emerald-300 bg-zinc-950/90 backdrop-blur-sm border border-emerald-500/30 px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Hover preview aktif
          </span>
          <span className="text-[11px] font-mono text-zinc-300 bg-zinc-950/90 backdrop-blur-sm border border-zinc-700/80 px-2.5 py-1 rounded-md flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {project.stats?.views || "1.2k"} views
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        {/* Role & Date */}
        <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-2">
          <span className="text-emerald-400/90 font-medium">
            {project.role}
          </span>
          <span>
            {new Date(project.createdAt).toLocaleDateString("id-ID", {
              month: "short",
              year: "numeric"
            })}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors line-clamp-1 mb-2">
          <Link href={`/project/${project.slug}`} className="hover:underline flex items-center gap-1.5">
            {project.title}
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-sm text-zinc-400 line-clamp-2 mb-4 leading-relaxed flex-1">
          {project.summary}
        </p>

        {/* Technology Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 group-hover:border-zinc-600 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-zinc-800/40 text-zinc-400 border border-zinc-700/30">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2 mt-auto">
          <Link
            href={`/project/${project.slug}`}
            className="text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors py-1.5 px-2 rounded hover:bg-emerald-950/30"
          >
            Lihat Detail
          </Link>

          <div className="flex items-center gap-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Demo ${project.title}`}
                className="inline-flex items-center gap-1 text-xs font-mono text-zinc-300 hover:text-emerald-400 bg-zinc-800/70 hover:bg-zinc-800 px-2.5 py-1.5 rounded-md border border-zinc-700/60 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Demo</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Repository ${project.title}`}
                className="inline-flex items-center gap-1 text-xs font-mono text-zinc-300 hover:text-emerald-400 bg-zinc-800/70 hover:bg-zinc-800 px-2.5 py-1.5 rounded-md border border-zinc-700/60 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kode</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
