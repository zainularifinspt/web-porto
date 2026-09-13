"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Grid,
  Sparkles,
  Terminal,
  X
} from "lucide-react";
import { ProjectImage } from "@/types/project";
import ImageLightbox from "./ImageLightbox";

interface ProjectImageGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
}

export default function ProjectImageGallery({
  images,
  projectTitle,
}: ProjectImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [viewLayout, setViewLayout] = useState<"single" | "grid">("single");

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[selectedIndex];

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation for carousel & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape" && isZoomed) setIsZoomed(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, isZoomed]);

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-base sm:text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100">
            Galeri &amp; Tangkapan Layar Project
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700/60">
            {selectedIndex + 1} of {images.length}
          </span>

          {/* Toggle View Layout */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setViewLayout("single")}
              title="Tampilan Sorotan / Carousel"
              className={`px-2 py-1 rounded text-[11px] transition-colors ${
                viewLayout === "single"
                  ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm font-semibold"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              }`}
            >
              Sorotan
            </button>
            <button
              onClick={() => setViewLayout("grid")}
              title="Tampilan Grid Semua Gambar"
              className={`px-2 py-1 rounded text-[11px] transition-colors ${
                viewLayout === "grid"
                  ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm font-semibold"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              }`}
            >
              Semua ({images.length})
            </button>
          </div>
        </div>
      </div>

      {viewLayout === "single" ? (
        <>
          {/* Main Feature View */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 group shadow-lg">
            <Image
              src={currentImage.imageUrl}
              alt={currentImage.caption || `${projectTitle} screenshot`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />

            {/* Caption Overlay */}
            {currentImage.caption && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent p-4 sm:p-5 text-xs font-mono text-zinc-200 flex items-center justify-between">
                <div>
                  <span className="text-emerald-400 font-bold mr-2">//</span>
                  <span>{currentImage.caption}</span>
                </div>
                <span className="hidden sm:inline text-[10px] text-zinc-400">
                  Gunakan tombol panah [←] [→]
                </span>
              </div>
            )}

            {/* Navigation Arrows if > 1 images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  aria-label="Tangkapan layar sebelumnya"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-900 text-zinc-200 hover:text-white border border-zinc-700/60 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Tangkapan layar berikutnya"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-900 text-zinc-200 hover:text-white border border-zinc-700/60 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Zoom Fullscreen Button */}
            <button
              onClick={() => setIsZoomed(true)}
              title="Perbesar gambar (Lightbox)"
              aria-label="Perbesar gambar"
              className="absolute top-3 right-3 p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-700/60 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md shadow-md"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative aspect-video w-24 sm:w-32 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    idx === selectedIndex
                      ? "border-emerald-500 ring-2 ring-emerald-500/30 scale-105 shadow-md"
                      : "border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.imageUrl}
                    alt={img.caption || `Thumbnail ${idx + 1}`}
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-zinc-950/80 text-zinc-300 px-1 rounded">
                    #{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        /* Grid Overview of All Images */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className="group relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shadow-sm"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={img.imageUrl}
                  alt={img.caption || `${projectTitle} image ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-700 dark:text-zinc-300 truncate mr-2">
                  {img.caption || `Tangkapan layar #${idx + 1}`}
                </span>
                <button
                  onClick={() => {
                    setSelectedIndex(idx);
                    setIsZoomed(true);
                  }}
                  className="p-1 rounded text-emerald-600 dark:text-emerald-400 hover:bg-emerald-950/30 shrink-0"
                  title="Lihat Detail"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Swipeable Lightbox */}
      <ImageLightbox
        images={images}
        selectedIndex={selectedIndex}
        isOpen={isZoomed}
        onClose={() => setIsZoomed(false)}
        onSelectIndex={setSelectedIndex}
        projectTitle={projectTitle}
      />
    </div>
  );
}
