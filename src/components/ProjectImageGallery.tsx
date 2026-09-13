"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles } from "lucide-react";
import { ProjectImage } from "@/types/project";

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

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[selectedIndex];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Galeri &amp; Tangkapan Layar
        </h3>
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          [{selectedIndex + 1} / {images.length}]
        </span>
      </div>

      {/* Main Feature View */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 group shadow-lg">
        <Image
          src={currentImage.imageUrl}
          alt={currentImage.caption || `${projectTitle} screenshot`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {/* Caption Overlay */}
        {currentImage.caption && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent p-4 text-xs font-mono text-zinc-200">
            <span className="text-emerald-400 font-bold mr-2">//</span>
            {currentImage.caption}
          </div>
        )}

        {/* Navigation Arrows if > 1 images */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Tangkapan layar sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-900 text-zinc-200 hover:text-white border border-zinc-700/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Tangkapan layar berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-900 text-zinc-200 hover:text-white border border-zinc-700/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Zoom Fullscreen Button */}
        <button
          onClick={() => setIsZoomed(true)}
          title="Perbesar gambar"
          aria-label="Perbesar gambar"
          className="absolute top-3 right-3 p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-700/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-video w-24 sm:w-28 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                idx === selectedIndex
                  ? "border-emerald-500 ring-2 ring-emerald-500/20 scale-105"
                  : "border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img.imageUrl}
                alt={img.caption || `Thumbnail ${idx + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal Lightbox */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] aspect-video rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl">
            <Image
              src={currentImage.imageUrl}
              alt={currentImage.caption || projectTitle}
              fill
              sizes="100vw"
              className="object-contain bg-zinc-950"
            />
            {currentImage.caption && (
              <div className="absolute bottom-0 inset-x-0 p-4 bg-zinc-950/90 border-t border-zinc-800 font-mono text-xs text-zinc-200 text-center">
                {currentImage.caption}
              </div>
            )}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-mono hover:bg-zinc-800"
            >
              Tutup [ESC]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
