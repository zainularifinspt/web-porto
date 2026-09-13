"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, Terminal } from "lucide-react";
import { ProjectImage } from "@/types/project";

interface ImageLightboxProps {
  images: ProjectImage[];
  selectedIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  projectTitle: string;
}

export default function ImageLightbox({
  images,
  selectedIndex,
  isOpen,
  onClose,
  onSelectIndex,
  projectTitle,
}: ImageLightboxProps) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState(false);

  const handlePrev = useCallback(() => {
    setIsSliding(true);
    onSelectIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    setTimeout(() => setIsSliding(false), 200);
  }, [images.length, onSelectIndex, selectedIndex]);

  const handleNext = useCallback(() => {
    setIsSliding(true);
    onSelectIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    setTimeout(() => setIsSliding(false), 200);
  }, [images.length, onSelectIndex, selectedIndex]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev
      handlePrev();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[selectedIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-zinc-950/95 backdrop-blur-xl animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      {/* Lightbox Header Bar */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-zinc-800/80 bg-zinc-950/80 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-2 font-mono text-xs text-zinc-300">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{projectTitle}</span>
          <span className="text-zinc-500">//</span>
          <span className="text-emerald-400">
            preview_{selectedIndex + 1}.png [{selectedIndex + 1}/{images.length}]
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            aria-label="Tutup lightbox (ESC)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 font-mono text-xs transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">ESC</span>
          </button>
        </div>
      </div>

      {/* Main Image Stage with Swipe Area */}
      <div
        className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Gambar sebelumnya"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-900 text-zinc-200 hover:text-white border border-zinc-700/80 shadow-2xl transition-all active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Gambar berikutnya"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-900 text-zinc-200 hover:text-white border border-zinc-700/80 shadow-2xl transition-all active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Central Display Image */}
        <div
          className={`relative max-w-5xl w-full h-[65vh] sm:h-[75vh] transition-transform duration-200 ease-out ${
            isSliding ? "scale-[0.98] opacity-80" : "scale-100 opacity-100"
          }`}
        >
          <Image
            src={currentImage.imageUrl}
            alt={currentImage.caption || projectTitle}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </div>

      {/* Lightbox Footer with Caption & Thumbnails Strip */}
      <div
        className="border-t border-zinc-800/80 bg-zinc-950/90 p-4 space-y-3 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {currentImage.caption && (
          <div className="text-center font-mono text-xs text-zinc-300 max-w-2xl mx-auto">
            <span className="text-emerald-400 font-bold mr-2">//</span>
            {currentImage.caption}
          </div>
        )}

        {/* Bottom Thumbnails */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2.5 overflow-x-auto py-1">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => onSelectIndex(idx)}
                className={`relative aspect-video w-16 sm:w-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  idx === selectedIndex
                    ? "border-emerald-500 scale-105 shadow-md shadow-emerald-500/20"
                    : "border-zinc-800 opacity-40 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.imageUrl}
                  alt={`Thumb ${idx + 1}`}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
