"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  fallbackHref?: string;
  className?: string;
  label?: string;
}

export default function BackButton({
  fallbackHref = "/#projects",
  className = "",
  label = "Kembali ke Halaman Sebelumnya"
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={
        className ||
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-mono text-xs font-semibold border border-zinc-200 dark:border-zinc-700 transition-colors shadow-xs"
      }
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
}
