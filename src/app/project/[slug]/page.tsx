import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Code2,
  Star,
  Calendar,
  UserCheck,
  Layers,
  Terminal,
  Sparkles,
  GitBranch,
  CheckCircle2,
  Compass
} from "lucide-react";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import Navbar from "@/components/Navbar";
import ProjectImageGallery from "@/components/ProjectImageGallery";
import ProjectStoryAndRole from "@/components/ProjectStoryAndRole";
import ProjectTechBadges from "@/components/ProjectTechBadges";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static routes for all projects
export async function generateStaticParams() {
  return MOCK_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = MOCK_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Tidak Ditemukan | Portofolio Dev Kece",
    };
  }

  return {
    title: `${project.title} — Detail Project | Portofolio Dev Kece`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = MOCK_PROJECTS.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = MOCK_PROJECTS[projectIndex];
  const prevProject = projectIndex > 0 ? MOCK_PROJECTS[projectIndex - 1] : null;
  const nextProject =
    projectIndex < MOCK_PROJECTS.length - 1 ? MOCK_PROJECTS[projectIndex + 1] : null;

  // Prepare images list including thumbnail
  const allImages = [
    {
      id: "img-thumb",
      projectId: project.id,
      imageUrl: project.thumbnailUrl,
      caption: `Pratinjau Utama: ${project.title}`,
      sortOrder: 0,
    },
    ...(project.images || []),
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-zinc-950 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Breadcrumb Navigation & Branch info */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
          >
            <ArrowLeft className="w-4 h-4" />
            cd .. / Galeri Project
          </Link>

          <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <GitBranch className="w-3.5 h-3.5 text-emerald-500" />
              main@{project.slug.slice(0, 7)}
            </span>
            <span className="hidden sm:inline-block">
              ~/portfolio/projects/{project.slug}.md
            </span>
          </div>
        </div>

        {/* Project Header Banner Card */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-sm dark:shadow-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.isFeatured && (
              <span className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/50 px-3 py-1 rounded-full shadow-sm">
                <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                Project Unggulan
              </span>
            )}
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700/50 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              {project.stats?.status || "Live in Production"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
            {project.summary}
          </p>

          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 text-xs font-mono">
            <div>
              <span className="text-zinc-500 dark:text-zinc-400 block mb-1 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Peran Utama
              </span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{project.role}</span>
            </div>
            <div>
              <span className="text-zinc-500 dark:text-zinc-400 block mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Tanggal Rilis
              </span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {new Date(project.createdAt).toLocaleDateString("id-ID", {
                  month: "long",
                  year: "numeric"
                })}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-zinc-500 dark:text-zinc-400 block mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Total Teknologi
              </span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {project.technologies.length} Stack Terintegrasi
              </span>
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-mono font-bold text-xs transition-all shadow-lg shadow-emerald-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                Buka Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-mono text-xs border border-zinc-200 dark:border-zinc-700 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                Lihat Repository Kode
              </a>
            )}
          </div>
        </div>

        {/* Interactive Screenshot Gallery */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6 sm:p-8 shadow-sm">
          <ProjectImageGallery
            images={allImages}
            projectTitle={project.title}
          />
        </div>

        {/* Story, Architecture, and Tech Stack Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Story & Technical Deep Dive via ProjectStoryAndRole */}
          <div className="lg:col-span-2">
            <ProjectStoryAndRole project={project} />
          </div>

          {/* Sidebar Tech Stack & Call-To-Action */}
          <div className="space-y-6">
            <ProjectTechBadges
              technologies={project.technologies}
              projectTitle={project.title}
            />

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-emerald-50/60 to-white dark:from-emerald-950/30 dark:to-zinc-900/60 p-6 shadow-sm">
              <h4 className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-200 mb-2">
                Ingin Mengembangkan Fitur Serupa?
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-mono">
                Saya selalu antusias mendiskusikan arsitektur sistem, optimasi performa, atau kolaborasi proyek baru.
              </p>
              <Link
                href="/#contact"
                className="inline-block w-full py-2.5 text-center rounded-lg bg-emerald-600 hover:bg-emerald-500 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white dark:text-emerald-400 font-mono text-xs font-semibold border border-transparent dark:border-zinc-700 transition-colors shadow-sm"
              >
                Hubungi Saya →
              </Link>
            </div>
          </div>
        </div>

        {/* Project Navigation Footer (Prev / Next) */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between gap-4 font-mono text-xs">
          {prevProject ? (
            <Link
              href={`/project/${prevProject.slug}`}
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                <span className="block text-[10px] text-zinc-400">Sebelumnya</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{prevProject.title}</span>
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/project/${nextProject.slug}`}
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-right"
            >
              <span>
                <span className="block text-[10px] text-zinc-400">Selanjutnya</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{nextProject.title}</span>
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>
    </div>
  );
}
